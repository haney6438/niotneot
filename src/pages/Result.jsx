import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import BottomSheet from "../components/BottomSheet.jsx";
import { getResult } from "../data/MatchItems.js";

import jhBubble from "../assets/img/jh-bubble.png";
import mgBubble from "../assets/img/mg-bubble.png";
import reBtn from "../assets/img/re-btn.png";

import "../css/Result.css";

const EMPTY_ROOM = { top: null, outer: null, bottom: null, shoes: null, acc: null };

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
          <h1>결과 화면</h1>
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