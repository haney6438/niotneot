import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  악세: "acc",
};

const CAPE_TOP_IDS = ["mg_top_205", "mg_top_206", "jh_top_208"];

function Main() {
  const navigate = useNavigate();

  const [currentRoomIdx, setCurrentRoomIdx] = useState(0);
  const currentRoom = ROOMS_DATA[currentRoomIdx];

  const [activeTab, setActiveTab] = useState("상의");

  // 훔쳐오기 모드 상태
  const [originalRoomId, setOriginalRoomId] = useState(null);
  const [isStealMode, setIsStealMode] = useState(false);

  // 훔쳐온 아이템 보관함 (캐릭터별 배열)
  const [stolenItems, setStolenItems] = useState({
    mg: [],
    jh: [],
  });

  // 중앙 3초 토스트 메시지 상태
  const [toastMessage, setToastMessage] = useState(null);

  const [wornItems, setWornItems] = useState({
    mg: { top: null, outer: null, bottom: null, shoes: null, acc: null },
    jh: { top: null, outer: null, bottom: null, shoes: null, acc: null },
  });

  const handlePrevRoom = () => {
    if (toastMessage) return;
    setIsStealMode(false);
    setOriginalRoomId(null);
    setCurrentRoomIdx((prev) => (prev > 0 ? prev - 1 : ROOMS_DATA.length - 1));
  };

  const handleNextRoom = () => {
    if (toastMessage) return;
    setIsStealMode(false);
    setOriginalRoomId(null);
    setCurrentRoomIdx((prev) => (prev < ROOMS_DATA.length - 1 ? prev + 1 : 0));
  };

  // 훔쳐오기 시작 -> 상대방 방으로 이동
  const handleStartSteal = () => {
    if (toastMessage) return;
    setOriginalRoomId(currentRoom.id);
    setIsStealMode(true);
    setCurrentRoomIdx((prev) => (prev === 0 ? 1 : 0));
  };

  const handleItemClick = (item) => {
    if (toastMessage) return;

    // [1] 훔쳐오기 모드일 때: 인벤토리 목록에만 추가
    if (isStealMode && originalRoomId) {
      const itemNum = parseInt(item.id.split("_").pop(), 10);
      const isStealable = itemNum >= 100; // 100번대 이상만 가능

      if (isStealable) {
        setStolenItems((prev) => {
          const currentList = prev[originalRoomId];
          const exists = currentList.some((i) => i.id === item.id);
          if (!exists) {
            return {
              ...prev,
              [originalRoomId]: [item, ...currentList],
            };
          }
          return prev;
        });

        setToastMessage(`✨ ${item.name}을(를)\n내 옷장으로 훔쳐오기 성공!`);
      } else {
        setToastMessage(
          `❌ 이 옷은 훔쳐올 수 없습니다!\n원래 방으로 돌아갑니다.`,
        );
      }

      // 3초 뒤 원래 방으로 복귀
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

    // [2] 일반 모드일 때: 터치 시 착용/해제
    const roomId = currentRoom.id;

    if (CAPE_TOP_IDS.includes(item.id)) {
      setWornItems((prev) => ({
        ...prev,
        [roomId]: {
          ...prev[roomId],
          outer: prev[roomId].outer?.id === item.id ? null : item,
        },
      }));
      return;
    }

    setWornItems((prev) => ({
      ...prev,
      [roomId]: {
        ...prev[roomId],
        [item.category]:
          prev[roomId][item.category]?.id === item.id ? null : item,
      },
    }));
  };

  const currentCategoryKey = CATEGORY_MAP[activeTab];

  // 훔쳐온 아이템 중 현재 탭 카테고리에 맞는 항목
  const myStolenCategoryItems = isStealMode
    ? []
    : stolenItems[currentRoom.id].filter(
        (item) => item.category === currentCategoryKey,
      );

  // 기본 옷장 아이템 목록
  const baseCategoryItems = ITEMS.filter(
    (item) =>
      item.id.startsWith(currentRoom.id) &&
      item.category === currentCategoryKey,
  );

  // 최종 노출 목록: 훔쳐온 옷(맨 위) + 기본 옷
  const filteredItems = [...myStolenCategoryItems, ...baseCategoryItems];

  const handleGoDate = () => {
    navigate("/result", { state: { wornItems } });
  };

  return (
    <div className="app-background">
      <div className="retro-window-container">
        <div className="window-title-bar">
          <div className="title-left">
            <span className="window-icon">🌴</span>
            <span className="window-title">
              {currentRoom.title} - Retro Explorer
            </span>
          </div>
          <div className="window-controls">
            <button className="win-ctrl-btn">_</button>
            <button className="win-ctrl-btn">□</button>
            <button
              className="win-ctrl-btn close"
              onClick={() => navigate("/")}>
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
            <button className="nav-btn reset-btn" onClick={() => navigate("/")}>
              뒤로
            </button>
            <div className="room-nav">
              <button className="arrow-btn" onClick={handlePrevRoom}>
                ◀
              </button>
              <span className="room-title">
                {isStealMode
                  ? ` ${currentRoom.title} (훔쳐오는 중)`
                  : currentRoom.title}
              </span>
              <button className="arrow-btn" onClick={handleNextRoom}>
                ▶
              </button>
            </div>
            <button className="nav-btn home-btn" onClick={handleStartSteal}>
              훔쳐오기
            </button>
          </div>
        </div>

        {/* 착용 영역 */}
        <main className="dressing-room-content">
          <section className="left-character-zone">
            <div className="character-display">
              <img
                src={currentRoom.characterImg}
                alt="Body"
                className="layer-img layer-body"
              />

              {wornItems[currentRoom.id].shoes && (
                <img
                  src={wornItems[currentRoom.id].shoes.image}
                  alt="Shoes"
                  className="layer-img layer-shoes"
                />
              )}

              {wornItems[currentRoom.id].bottom && (
                <img
                  src={wornItems[currentRoom.id].bottom.image}
                  alt="Bottom"
                  className="layer-img layer-bottom"
                />
              )}

              {wornItems[currentRoom.id].top && (
                <img
                  src={wornItems[currentRoom.id].top.image}
                  alt="Top"
                  className="layer-img layer-top"
                />
              )}

              {currentRoom.handImg && (
                <img
                  src={currentRoom.handImg}
                  alt="Hand"
                  className="layer-img layer-hand"
                  onError={(e) => (e.target.style.display = "none")}
                />
              )}

              {wornItems[currentRoom.id].outer && (
                <img
                  src={wornItems[currentRoom.id].outer.image}
                  alt="Outer"
                  className="layer-img layer-top-outer"
                />
              )}

              {wornItems[currentRoom.id].acc && (
                <img
                  src={wornItems[currentRoom.id].acc.image}
                  alt="Acc"
                  className="layer-img layer-item"
                />
              )}
            </div>
          </section>

          <section className="right-closet-zone">
            <div className="category-tabs">
              {["상의", "하의", "신발", "악세사리"].map((tab) => (
                <button
                  key={tab}
                  className={`cat-tab ${activeTab === tab ? "active" : ""}`}
                  onClick={() => setActiveTab(tab)}>
                  {tab}
                </button>
              ))}
            </div>

            <div className="item-scroll-list">
              {filteredItems.map((item) => {
                const isSelected = CAPE_TOP_IDS.includes(item.id)
                  ? wornItems[currentRoom.id].outer?.id === item.id
                  : wornItems[currentRoom.id][item.category]?.id === item.id;

                const isStolenItem = !item.id.startsWith(currentRoom.id);

                return (
                  <div
                    key={item.id}
                    className={`item-row-card ${isStolenItem ? "stolen" : ""} ${isSelected ? "selected" : ""}`}
                    onClick={() => handleItemClick(item)}>
                    <div className="item-thumb">
                      <img
                        src={item.image}
                        alt={item.name}
                        onError={(e) => {
                          e.target.style.opacity = "0.2";
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
          <button className="date-go-btn" onClick={handleGoDate}>
            데이트 가기
          </button>
        </footer>

        {/* 중앙 3초 알림 토스트 박스 */}
        {toastMessage && (
          <div className="steal-toast-popup">
            <div className="steal-toast-text">{toastMessage}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Main;
