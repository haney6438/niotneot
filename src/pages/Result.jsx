import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import BottomSheet from "../components/BottomSheet.jsx";
import { getResult, resolveItemImage, getItemByCategory } from "../data/MatchItems.js";

import jhBubble from "../assets/img/jh-bubble.png";
import mgBubble from "../assets/img/mg-bubble.png";
import reBtn from "../assets/img/re-btn.png";

import "../css/Result.css";

const CHARACTER_BASE = {
  mg: "/character-img/kmg-final.png",
  jh: "/character-img/yjh.png",
};

const EMPTY_ROOM = [];

function SparkleBackground() {
  const sparkles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 2}s`,
  }));

  return (
    <div className="sparkle-bg">
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="sparkle"
          style={{ top: s.top, left: s.left, animationDelay: s.delay }}
        >
          ✶
        </span>
      ))}
    </div>
  );
}

function FinalCharacter({ roomId, room }) {
  const characterImg = CHARACTER_BASE[roomId];

  // 카테고리별 z-index 우선순위 (Main.jsx의 CATEGORY_ORDER와 동일한 기준)
  const CATEGORY_LAYER_CLASS = {
    shoes: "final-layer-shoes",
    bottom: "final-layer-bottom",
    top: "final-layer-top",
    acc: "final-layer-item",
  };

  const CATEGORY_ORDER = { shoes: 10, bottom: 20, top: 30, acc: 50 };

  // 착용 순서(카테고리 우선순위)대로 정렬
  const sortedRoom = [...room].sort(
    (a, b) => (CATEGORY_ORDER[a.category] || 30) - (CATEGORY_ORDER[b.category] || 30)
  );

  return (
    <div className={`final-character-display final-character-display--${roomId}`}>
      <img src={characterImg} alt={`${roomId} final pose`} className="final-layer-img final-layer-body" />

      {sortedRoom.map((item, index) => (
        <img
          key={item.id}
          src={resolveItemImage(roomId, item.image)}
          alt={item.category}
          className={`final-layer-img ${CATEGORY_LAYER_CLASS[item.category] || "final-layer-item"}`}
          style={{ zIndex: (CATEGORY_ORDER[item.category] || 30) + index }}
        />
      ))}
    </div>
  );
}

function Result() {
  const navigate = useNavigate();
  const location = useLocation();
  const wornItems = location.state?.wornItems ?? { mg: EMPTY_ROOM, jh: EMPTY_ROOM };

  const [result, setResult] = useState(null);

  useEffect(() => {
    setResult(getResult(wornItems));
  }, []);

  const isSetMatched = result?.type && result.type !== "bubble";
  const bubble = !isSetMatched ? result?.content : null;

  // 세트 매칭됐을 때 컨페티 발사
  useEffect(() => {
    if (!isSetMatched) return;

    const duration = 2000;
    const end = Date.now() + duration;

    const colors = ["#ffd4e5", "#bde0fe", "#ffffff", "#fff3b0"];

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        colors,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        colors,
        origin: { x: 1 },
      });

      if (Date.now() < end) {
        setTimeout(() => requestAnimationFrame(frame), 60);
      }
    };

    frame();
  }, [isSetMatched]);

  return (
    <div
      className="result-container"
      style={
        isSetMatched && result.bgImage
          ? { "--bg-image": `url(${result.bgImage})` }
          : undefined
      }
    >
      <SparkleBackground />
      <div className="result-content">
        <div className="result-info-section">
          {isSetMatched && (
            <>
              <p>🩵 {result.title}</p>
              <p>💛 {result.info}</p>
            </>
          )}
        </div>
        <div className="result-img-section">
          {bubble && (
            <div className={`speech-bubble speech-bubble--${bubble.speaker}`}>
              <img
                src={bubble.speaker === "jh" ? jhBubble : mgBubble}
                alt="speech bubble"
                className="speech-bubble__img"
              />
              <span className="speech-bubble__text">{bubble.text}</span>
            </div>
          )}

          <div className="final-characters-row">
            <FinalCharacter roomId="mg" room={wornItems.mg} />
            <FinalCharacter roomId="jh" room={wornItems.jh} />
          </div>
        </div>
      </div>
      <div
        className={`result-btn-section ${isSetMatched ? "result-btn-section--with-sheet" : "result-btn-section--no-sheet"
          }`}
      >
        <button
          onClick={() => navigate("/")}
          className="result-re-btn"
          style={{ backgroundImage: `url(${reBtn})` }}
        />
      </div>
      {isSetMatched && <BottomSheet content={result.content} />}
    </div>
  );
}

export default Result;