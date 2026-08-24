import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import BottomSheet from "../components/BottomSheet.jsx";
import { SET } from "../data/ItemSet.js";
import "../css/Result.css";

function Result() {
  const navigate = useNavigate();

  // 테스트용
  const testSet = SET.find((set) => set.id === "set_5");

  return (
    <div className="container">
      <div className="content">
        <div className="info-section">
          <p>🩵 {testSet?.title}</p>
          <p>💛 {testSet?.info}</p>
        </div>
        <div className="img-section">
          <h1>결과 화면</h1>
        </div>
      </div>
      <div className="btn-section">
        <button onClick={() => navigate("/")}>처음으로</button>
      </div>
      <BottomSheet content={testSet?.content} />
    </div>
  );
}

export default Result;