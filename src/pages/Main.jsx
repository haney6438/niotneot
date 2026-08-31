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

  const [wornItems, setWornItems] = useState({
    top: null,
    outer: null,
    bottom: null,
    shoes: null,
    acc: null,
  });

  const handlePrevRoom = () => {
    setCurrentRoomIdx((prev) => (prev > 0 ? prev - 1 : ROOMS_DATA.length - 1));
    setWornItems({
      top: null,
      outer: null,
      bottom: null,
      shoes: null,
      acc: null,
    });
  };

  const handleNextRoom = () => {
    setCurrentRoomIdx((prev) => (prev < ROOMS_DATA.length - 1 ? prev + 1 : 0));
    setWornItems({
      top: null,
      outer: null,
      bottom: null,
      shoes: null,
      acc: null,
    });
  };

  const handleItemClick = (item) => {
    if (CAPE_TOP_IDS.includes(item.id)) {
      setWornItems((prev) => ({
        ...prev,
        outer: prev.outer?.id === item.id ? null : item,
      }));
      return;
    }

    setWornItems((prev) => ({
      ...prev,
      [item.category]: prev[item.category]?.id === item.id ? null : item,
    }));
  };

  const currentCategoryKey = CATEGORY_MAP[activeTab];
  const filteredItems = ITEMS.filter(
    (item) =>
      item.id.startsWith(currentRoom.id) &&
      item.category === currentCategoryKey,
  );

  const handleGoDate = () => {
    navigate("/result", {
      state: {
        character: currentRoom,
        wornItems: wornItems,
      },
    });
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
              <span className="room-title">{currentRoom.title}</span>
              <button className="arrow-btn" onClick={handleNextRoom}>
                ▶
              </button>
            </div>
            <button className="nav-btn home-btn">훔쳐오기</button>
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

              {wornItems.shoes && (
                <img
                  src={wornItems.shoes.image}
                  alt="Shoes"
                  className="layer-img layer-shoes"
                />
              )}

              {wornItems.bottom && (
                <img
                  src={wornItems.bottom.image}
                  alt="Bottom"
                  className="layer-img layer-bottom"
                />
              )}

              {wornItems.top && (
                <img
                  src={wornItems.top.image}
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

              {wornItems.outer && (
                <img
                  src={wornItems.outer.image}
                  alt="Outer"
                  className="layer-img layer-top-outer"
                />
              )}

              {wornItems.acc && (
                <img
                  src={wornItems.acc.image}
                  alt="Acc"
                  className="layer-img layer-item"
                />
              )}
            </div>
          </section>

          {/*옷장*/}
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
                  ? wornItems.outer?.id === item.id
                  : wornItems[item.category]?.id === item.id;

                return (
                  <div
                    key={item.id}
                    className={`item-row-card ${isSelected ? "selected" : ""}`}
                    onClick={() => handleItemClick(item)}>
                    <div className="item-thumb">
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                        onError={(e) => {
                          e.target.style.opacity = "0.2";
                        }}
                      />
                    </div>
                    <div className="item-text">
                      <span className="item-name">{item.name}</span>
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
      </div>
    </div>
  );
}

export default Main;
