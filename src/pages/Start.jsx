import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import "../css/Start.css";

function Start() {
  const navigate = useNavigate();
  const [dragging, setDragging] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hoverPath, setHoverPath] = useState(null);
  const startRef = useRef(null);

  const handlePointerDown = (e) => {
    e.target.setPointerCapture(e.pointerId); // 이 요소로 포인터 이벤트 고정
    setDragging(true);
    setPos({ x: e.clientX, y: e.clientY });
  };

  const handlePointerMove = (e) => {
    if (!dragging) return;
    setPos({ x: e.clientX, y: e.clientY });

    const target = document.elementFromPoint(e.clientX, e.clientY);
    const dropZone = target?.closest("[data-dropzone]");
    setHoverPath(dropZone ? dropZone.dataset.path : null);
  };

  const handlePointerUp = (e) => {
    const target = document.elementFromPoint(e.clientX, e.clientY);
    const dropZone = target?.closest("[data-dropzone]");

    if (dropZone) {
      navigate(dropZone.dataset.path);
    }
    setDragging(false);
    setHoverPath(null);
  };

  return (
    <div className="container">
      <div className="title-section">
        <h1>니옷내옷</h1>
        <p>Unspoken Rule</p>
      </div>

      <div className="choice-section">
        <p
          ref={startRef}
          className={`drag-start ${dragging ? "drag-following" : ""}`}
          style={dragging ? { left: pos.x, top: pos.y } : undefined}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          start
        </p>

        {dragging && (
          <>
            <p
              className={`dropzone ${hoverPath === "/main" ? "hover" : ""}`}
              data-dropzone
              data-path="/main"
            >
              🐶
            </p>
            <p
              className={`dropzone ${hoverPath === "/result" ? "hover" : ""}`}
              data-dropzone
              data-path="/result"
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