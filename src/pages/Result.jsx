import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import BottomSheet from "../components/BottomSheet.jsx";
// import "../css/Result.css";

function Result() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="content">
        <h1>결과 화면</h1>
      </div>
      <div className="btn-section">
        <button onClick={() => navigate("/")}>처음으로</button>
      </div>
      <BottomSheet />
    </div>
  );
}

export default Result;