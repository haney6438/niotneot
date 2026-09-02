import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ITEMS } from "../data/Items";
import "../App.css";

const ROOMS_DATA = [
  {
    id: "mg",
    title: "민규의 방",
    characterImg: "/character-img/kmg.png",
    handImg: "/character-img/kmghand.png",
  },
  {
    id: "jh",
    title: "정한의 방",
    characterImg: "/character-img/yjh.png",
    handImg: "/character-img/yjhhand.png",
  },
];

const CATEGORY_MAP = {
  상의: "top",
  하의: "bottom",
  신발: "shoes",
  악세사리: "acc",
};

// 양말 아이템 판별 함수
// ID나 이름에 sock/양말이 들어가면 양말 처리
const checkIsSocks = (item) => {
  if (!item) return false;

  return (
    item.category === "socks" ||
    item.id.toLowerCase().includes("sock") ||
    (item.name && item.name.includes("양말"))
  );
};

const CAPE_TOP_IDS = [
  "mg_top_206",
  "jh_top_202",
  "jh_top_204",
  "jh_top_205",
];

function Main() {
  const navigate = useNavigate();
  const location = useLocation();

  const requestedRoomId = location.state?.room;
  const initialIdx = ROOMS_DATA.findIndex(
    (r) => r.id === requestedRoomId,
  );

  const [currentRoomIdx, setCurrentRoomIdx] = useState(
    initialIdx !== -1 ? initialIdx : 0,
  );

  const currentRoom = ROOMS_DATA[currentRoomIdx];

  const [activeTab, setActiveTab] = useState("상의");

  const [originalRoomId, setOriginalRoomId] = useState(null);
  const [isStealMode, setIsStealMode] = useState(false);

  // 훔쳐오기 모드에서 손전등 위치
  const [mousePosition, setMousePosition] = useState({
    x: 50,
    y: 50,
  });

  const [stolenItems, setStolenItems] = useState({
    mg: [],
    jh: [],
  });

  const [toastMessage, setToastMessage] = useState(null);

  // socks 슬롯 포함된 착용 상태
  const [wornItems, setWornItems] = useState({
    mg: {
      top: null,
      outer: null,
      bottom: null,
      socks: null,
      shoes: null,
      acc: [],
    },
    jh: {
      top: null,
      outer: null,
      bottom: null,
      socks: null,
      shoes: null,
      acc: [],
    },
  });

  // 훔쳐오기 모드에서 마우스 위치 추적
  const handleMouseMove = (e) => {
    if (!isStealMode) return;

    setMousePosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handlePrevRoom = () => {
    if (toastMessage || isStealMode) return;

    setIsStealMode(false);
    setOriginalRoomId(null);

    setCurrentRoomIdx((prev) =>
      prev > 0 ? prev - 1 : ROOMS_DATA.length - 1,
    );
  };

  const handleNextRoom = () => {
    if (toastMessage || isStealMode) return;

    setIsStealMode(false);
    setOriginalRoomId(null);

    setCurrentRoomIdx((prev) =>
      prev < ROOMS_DATA.length - 1 ? prev + 1 : 0,
    );
  };

  const handleStealToggle = () => {
    if (toastMessage) return;

    if (isStealMode) {
      const originalIdx = ROOMS_DATA.findIndex(
        (r) => r.id === originalRoomId,
      );

      setCurrentRoomIdx(originalIdx !== -1 ? originalIdx : 0);
      setIsStealMode(false);
      setOriginalRoomId(null);
    } else {
      setOriginalRoomId(currentRoom.id);
      setIsStealMode(true);

      // 다른 방으로 이동
      setCurrentRoomIdx((prev) => (prev === 0 ? 1 : 0));

      // 훔쳐오기 시작할 때 손전등 위치를 화면 중앙으로 초기화
      setMousePosition({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      });
    }
  };

  const handleItemClick = (item) => {
    if (toastMessage) return;

    // [1] 훔쳐오기 모드
    if (isStealMode && originalRoomId) {
      const itemNum = parseInt(item.id.split("_").pop(), 10);
      const isStealable = itemNum >= 100;

      if (isStealable) {
        setStolenItems((prev) => {
          const currentList = prev[originalRoomId];

          const exists = currentList.some(
            (i) => i.id === item.id,
          );

          if (!exists) {
            return {
              ...prev,
              [originalRoomId]: [item, ...currentList],
            };
          }

          return prev;
        });

        setToastMessage(
          `✨ ${item.name}을(를)\n내 옷장으로 훔쳐오기 성공!`,
        );
      } else {
        setToastMessage(
          `❌ 이 옷은 훔쳐올 수 없습니다!\n원래 방으로 돌아갑니다.`,
        );
      }

      setTimeout(() => {
        const originalIdx = ROOMS_DATA.findIndex(
          (r) => r.id === originalRoomId,
        );

        setCurrentRoomIdx(originalIdx);
        setIsStealMode(false);
        setOriginalRoomId(null);
        setToastMessage(null);
      }, 3000);

      return;
    }

    // [2] 일반 착용 모드
    const roomId = currentRoom.id;
    const isSocks = checkIsSocks(item);

    // 1. 양말인 경우
    // 악세사리 탭에서 골라도 무조건 socks 슬롯에 착용
    if (isSocks) {
      setWornItems((prev) => ({
        ...prev,
        [roomId]: {
          ...prev[roomId],
          socks:
            prev[roomId].socks?.id === item.id
              ? null
              : item,
        },
      }));

      return;
    }

    // 2. 케이프류인 경우
    if (CAPE_TOP_IDS.includes(item.id)) {
      setWornItems((prev) => ({
        ...prev,
        [roomId]: {
          ...prev[roomId],
          outer:
            prev[roomId].outer?.id === item.id
              ? null
              : item,
        },
      }));

      return;
    }

    // 3. 일반 악세사리인 경우
    // 양말 제외: 배열 토글
    if (item.category === "acc") {
      setWornItems((prev) => {
        const currentAcc = prev[roomId].acc;

        const isWorn = currentAcc.some(
          (i) => i.id === item.id,
        );

        return {
          ...prev,
          [roomId]: {
            ...prev[roomId],
            acc: isWorn
              ? currentAcc.filter(
                  (i) => i.id !== item.id,
                )
              : [...currentAcc, item],
          },
        };
      });

      return;
    }

    // 4. 상의 / 하의 / 신발
    setWornItems((prev) => ({
      ...prev,
      [roomId]: {
        ...prev[roomId],
        [item.category]:
          prev[roomId][item.category]?.id === item.id
            ? null
            : item,
      },
    }));
  };

  const currentCategoryKey = CATEGORY_MAP[activeTab];

  // 옷장 노출 조건
  // 양말은 악세사리 탭에 포함
  const isItemInCurrentTab = (item) => {
    const isSocks = checkIsSocks(item);

    if (activeTab === "악세사리") {
      return item.category === "acc" || isSocks;
    }

    if (activeTab === "신발") {
      return item.category === "shoes" && !isSocks;
    }

    return item.category === currentCategoryKey;
  };

  const myStolenCategoryItems = isStealMode
    ? []
    : stolenItems[currentRoom.id].filter(
        isItemInCurrentTab,
      );

  const baseCategoryItems = ITEMS.filter(
    (item) =>
      item.id.startsWith(currentRoom.id) &&
      isItemInCurrentTab(item),
  );

  const filteredItems = [
    ...myStolenCategoryItems,
    ...baseCategoryItems,
  ];

  const handleGoDate = () => {
    navigate("/result", {
      state: { wornItems },
    });
  };

  return (
    <div
      className={`app-background ${
        isStealMode ? "steal-mode" : ""
      }`}
      onMouseMove={handleMouseMove}
    >
      <div className="retro-window-container">
        <div className="window-title-bar">
          <div className="title-left">
            <span className="window-icon">🌴</span>

            <span className="window-title">
              {currentRoom.title} - Retro Explorer
            </span>
          </div>

          <div className="window-controls">
            <button className="win-ctrl-btn">
              _
            </button>

            <button className="win-ctrl-btn">
              □
            </button>

            <button
              className="win-ctrl-btn close"
              onClick={() => navigate("/")}
            >
              ✕
            </button>
          </div>
        </div>

        <div className="browser-menu-bar">
          <div className="menu-items">
            <span>File</span>
            <span>Edit</span>
            <span>View</span>
            <span>Help</span>
          </div>

          <div className="browser-actions">
            <button
              className="nav-btn reset-btn"
              onClick={() => navigate("/")}
            >
              뒤로
            </button>

            <div className="room-nav">
              {!isStealMode && (
                <button
                  className="arrow-btn"
                  onClick={handlePrevRoom}
                >
                  ◀
                </button>
              )}

              <span className="room-title">
                {isStealMode
                  ? `${currentRoom.title} (훔쳐오는 중)`
                  : currentRoom.title}
              </span>

              {!isStealMode && (
                <button
                  className="arrow-btn"
                  onClick={handleNextRoom}
                >
                  ▶
                </button>
              )}
            </div>

            <button
              className="nav-btn home-btn"
              onClick={handleStealToggle}
            >
              {isStealMode ? "돌아가기" : "훔쳐오기"}
            </button>
          </div>
        </div>

        {/* 착용 영역 */}
        <main className="dressing-room-content">
          <section className="left-character-zone">
            <div className="character-display">
              {/* 바디 */}
              <img
                src={currentRoom.characterImg}
                alt="Body"
                className="layer-img"
                style={{ zIndex: 10 }}
              />

              {/* 1. 양말 */}
              {wornItems[currentRoom.id].socks && (
                <img
                  src={
                    wornItems[currentRoom.id].socks.image
                  }
                  alt="Socks"
                  className="layer-img"
                  style={{ zIndex: 15 }}
                />
              )}

              {/* 2. 신발 */}
              {wornItems[currentRoom.id].shoes && (
                <img
                  src={
                    wornItems[currentRoom.id].shoes.image
                  }
                  alt="Shoes"
                  className="layer-img"
                  style={{ zIndex: 25 }}
                />
              )}

              {/* 3. 하의 */}
              {wornItems[currentRoom.id].bottom && (
                <img
                  src={
                    wornItems[currentRoom.id].bottom.image
                  }
                  alt="Bottom"
                  className="layer-img"
                  style={{ zIndex: 30 }}
                />
              )}

              {/* 4. 상의 */}
              {wornItems[currentRoom.id].top && (
                <img
                  src={
                    wornItems[currentRoom.id].top.image
                  }
                  alt="Top"
                  className="layer-img"
                  style={{ zIndex: 35 }}
                />
              )}

              {/* 5. 손 */}
              {currentRoom.handImg && (
                <img
                  src={currentRoom.handImg}
                  alt="Hand"
                  className="layer-img"
                  style={{ zIndex: 40 }}
                  onError={(e) =>
                    (e.target.style.display = "none")
                  }
                />
              )}

              {/* 6. 외투 / 망토 */}
              {wornItems[currentRoom.id].outer && (
                <img
                  src={
                    wornItems[currentRoom.id].outer.image
                  }
                  alt="Outer"
                  className="layer-img"
                  style={{ zIndex: 45 }}
                />
              )}

              {/* 7. 일반 악세사리 */}
              {wornItems[currentRoom.id].acc.map(
                (item, idx) => (
                  <img
                    key={item.id}
                    src={item.image}
                    alt="Acc"
                    className="layer-img"
                    style={{
                      zIndex: 50 + idx,
                    }}
                  />
                ),
              )}
            </div>
          </section>

          {/* 옷장 목록 */}
          <section className="right-closet-zone">
            <div className="category-tabs">
              {[
                "상의",
                "하의",
                "신발",
                "악세사리",
              ].map((tab) => (
                <button
                  key={tab}
                  className={`cat-tab ${
                    activeTab === tab
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setActiveTab(tab)
                  }
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="item-scroll-list">
              {filteredItems.map((item) => {
                const isSocks = checkIsSocks(item);

                const isSelected = isSocks
                  ? wornItems[currentRoom.id].socks?.id ===
                    item.id
                  : item.category === "acc"
                    ? wornItems[
                        currentRoom.id
                      ].acc.some(
                        (i) => i.id === item.id,
                      )
                    : CAPE_TOP_IDS.includes(
                          item.id,
                        )
                      ? wornItems[
                          currentRoom.id
                        ].outer?.id === item.id
                      : wornItems[
                          currentRoom.id
                        ][item.category]?.id ===
                        item.id;

                const isStolenItem =
                  !item.id.startsWith(
                    currentRoom.id,
                  );

                return (
                  <div
                    key={item.id}
                    className={`item-row-card ${
                      isStolenItem
                        ? "stolen"
                        : ""
                    } ${
                      isSelected
                        ? "selected"
                        : ""
                    }`}
                    onClick={() =>
                      handleItemClick(item)
                    }
                  >
                    <div className="item-thumb">
                      <img
                        src={
                          item.thumbnail ||
                          item.image
                        }
                        alt={item.name}
                        onError={(e) => {
                          e.target.style.opacity =
                            "0.2";
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </main>

        <footer className="app-footer-action">
          <button
            className="date-go-btn"
            onClick={handleGoDate}
          >
            데이트 가기
          </button>
        </footer>

        {/* 훔쳐오기 모드 오버레이 */}
        {isStealMode && (
          <>
            <div
              className="steal-overlay"
              style={{
                "--mouse-x": `${mousePosition.x}px`,
                "--mouse-y": `${mousePosition.y}px`,
              }}
            />

            <div className="steal-guide-text">
              🥷 훔쳐올 물건을 선택하세요 ✨
            </div>
          </>
        )}

        {/* 훔쳐오기 결과 토스트 */}
        {toastMessage && (
          <div className="steal-toast-popup">
            <div className="steal-toast-text">
              {toastMessage}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Main;