import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Particles from "react-tsparticles";
import { loadStarsPreset } from "tsparticles-preset-stars";
import BottomSheet from "../components/BottomSheet.jsx";
import { getResult, resolveItemImage } from "../data/MatchItems.js";

import jhBubble from "../assets/img/jh-bubble.png";
import mgBubble from "../assets/img/mg-bubble.png";
import reBtn from "../assets/img/re-btn.png";

import "../css/Result.css";

const CHARACTER_BASE = {
  mg: "/character-img/kmg-final.png",
  jh: "/character-img/yjh.png",
};

const EMPTY_ROOM = { top: null, outer: null, bottom: null, shoes: null, acc: null };

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

  return (
    <div className={`final-character-display final-character-display--${roomId}`}>
      <img
        src={characterImg}
        alt={`${roomId} final pose`}
        className="final-layer-img final-layer-body"
      />

      {room.shoes && (
        <img
          src={resolveItemImage(roomId, room.shoes.image)}
          alt="shoes"
          className="final-layer-img final-layer-shoes"
        />
      )}
      {room.bottom && (
        <img
          src={resolveItemImage(roomId, room.bottom.image)}
          alt="bottom"
          className="final-layer-img final-layer-bottom"
        />
      )}
      {room.top && (
        <img
          src={resolveItemImage(roomId, room.top.image)}
          alt="top"
          className="final-layer-img final-layer-top"
        />
      )}
      {room.outer && (
        <img
          src={resolveItemImage(roomId, room.outer.image)}
          alt="outer"
          className="final-layer-img final-layer-top-outer"
        />
      )}
      {room.acc && (
        <img
          src={resolveItemImage(roomId, room.acc.image)}
          alt="acc"
          className="final-layer-img final-layer-item"
        />
      )}
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

  return (
    <div className="result-container">
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
        className={`result-btn-section ${
          isSetMatched ? "result-btn-section--with-sheet" : "result-btn-section--no-sheet"
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