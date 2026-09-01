import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";

import "../css/Start.css";

import title from "../assets/img/title.png";
import sub from "../assets/img/sub-title.png";
import startImg from "../assets/img/start-btn.png";

function Start() {
  const navigate = useNavigate();
  const [dragging, setDragging] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hoverRoom, setHoverRoom] = useState(null); // hoverPath -> hoverRoom
  const startRef = useRef(null);

  const handlePointerDown = (e) => {
    e.target.setPointerCapture(e.pointerId);
    setDragging(true);
    setPos({ x: e.clientX, y: e.clientY });
  };

  const handlePointerMove = (e) => {
    if (!dragging) return;
    setPos({ x: e.clientX, y: e.clientY });

    const target = document.elementFromPoint(e.clientX, e.clientY);
    const dropZone = target?.closest("[data-dropzone]");
    setHoverRoom(dropZone ? dropZone.dataset.room : null); // path -> room
  };

  const handlePointerUp = (e) => {
    const target = document.elementFromPoint(e.clientX, e.clientY);
    const dropZone = target?.closest("[data-dropzone]");

    if (dropZone) {
      navigate(dropZone.dataset.path, {
        state: { room: dropZone.dataset.room }, // room 정보 같이 전달
      });
    }
    setDragging(false);
    setHoverRoom(null);
  };

  return (
    <div className="start-container">
      <div className="start-title-section">
        <img className="start-title" src={title} alt="title" />
        <img className="start-sub-title" src={sub} alt="sub" />
      </div>

      <div className="start-choice-section">
        <img
          ref={startRef}
          src={startImg}
          alt="start"
          className={`drag-start ${dragging ? "drag-following" : ""}`}
          style={dragging ? { left: pos.x, top: pos.y } : undefined}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          draggable={false}
        />

        {dragging && (
          <>
            <p
              className={`dropzone ${hoverRoom === "mg" ? "hover" : ""}`}
              data-dropzone
              data-path="/main"
              data-room="mg"
            >
              🐶
            </p>
            <p
              className={`dropzone ${hoverRoom === "jh" ? "hover" : ""}`}
              data-dropzone
              data-path="/main"
              data-room="jh"
            >
              🐰
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default Start;