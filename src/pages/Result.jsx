import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import BottomSheet from "../components/BottomSheet.jsx";
import { SET, RANDOM_BUBBLES } from "../data/ItemSet.js";

import jhBubble from "../assets/img/jh-bubble.png";
import mgBubble from "../assets/img/mg-bubble.png";
import reBtn from "../assets/img/re-btn.png";

import "../css/Result.css";

function Result() {
  const navigate = useNavigate();
  const [bubble, setBubble] = useState(null);

  // 테스트용
  const testSet = SET.find((set) => set.id === "set_5");

  useEffect(() => {
    const random =
      RANDOM_BUBBLES[Math.floor(Math.random() * RANDOM_BUBBLES.length)];
    setBubble(random);
  }, []);

  return (
    <div className="result-container">
      <div className="result-content">
        <div className="result-info-section">
          <p>🩵 {testSet?.title}</p>
          <p>💛 {testSet?.info}</p>
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
          <h1>결과 화면</h1>
        </div>
      </div>
      <div className="result-btn-section">
        <button
          onClick={() => navigate("/")}
          className="result-re-btn"
          style={{ backgroundImage: `url(${reBtn})` }}>
        </button>
      </div>
      <BottomSheet content={testSet?.content} />
    </div>
  );
}

export default Result;