import React from "react";
import "../App.css";

function Main() {
  return (
    <div className="app-background">
      <div className="retro-window-container">
        <div className="window-title-bar">
          <div className="title-left">
            <span className="window-icon">🌴</span>
            <span className="window-title">민규의 방 - Retro Explorer</span>
          </div>
          <div className="window-controls">
            <button className="win-ctrl-btn">_</button>
            <button className="win-ctrl-btn">□</button>
            <button className="win-ctrl-btn close">✕</button>
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
            <button className="nav-btn reset-btn">뒤로</button>
            <div className="room-nav">
              <button className="arrow-btn">◀</button>
              <span className="room-title">민규의 방</span>
              <button className="arrow-btn">▶</button>
            </div>
            <button className="nav-btn home-btn">훔쳐오기</button>
          </div>
        </div>

        <main className="dressing-room-content">
          <section className="left-character-zone">
            <div className="character-display">
              <div className="character-placeholder">캐릭터 서있음</div>
            </div>
          </section>

          <section className="right-closet-zone">
            <div className="category-tabs">
              <button className="cat-tab active">상의</button>
              <button className="cat-tab">하의</button>
              <button className="cat-tab">아이템</button>
              <button className="cat-tab">헤어</button>
            </div>

            <div className="item-scroll-list">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <div key={num} className="item-row-card">
                  <div className="item-thumb">옷사진</div>
                  <div className="item-text">
                    <span className="item-name">옷 이름</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>

        <footer className="app-footer-action">
          <button className="date-go-btn">데이트 가기</button>
        </footer>
      </div>
    </div>
  );
}

export default Main;
