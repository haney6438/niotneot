import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../css/Start.css";

function Start() {
  const navigate = useNavigate();
  const [dragging, setDragging] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  // 마우스 이벤트든 터치 이벤트든 좌표만 뽑아내는 헬퍼
  const getPoint = (e) => {
    if (e.touches && e.touches.length > 0) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    if (e.changedTouches && e.changedTouches.length > 0) {
      return { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
    }
    return { x: e.clientX, y: e.clientY };
  };

  const handleStart = (e) => {
    const point = getPoint(e);
    setDragging(true);
    setPos(point);
  };

  useEffect(() => {
    if (!dragging) return;

    const handleMove = (e) => {
      e.preventDefault(); // 모바일에서 화면 스크롤되는 거 방지
      setPos(getPoint(e));
    };

    const handleEnd = (e) => {
      const point = getPoint(e);
      const target = document.elementFromPoint(point.x, point.y);
      const dropZone = target?.closest("[data-dropzone]");

      if (dropZone) {
        const path = dropZone.dataset.path;
        navigate(path);
      }
      setDragging(false);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleEnd);
    window.addEventListener("touchmove", handleMove, { passive: false });
    window.addEventListener("touchend", handleEnd);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [dragging, navigate]);

  return (
    <div className="container">
      <div className="title-section">
        <h1>니옷내옷</h1>
        <p>Unspoken Rule</p>
      </div>

      <div className="choice-section">
        {!dragging && (
          <p
            className="draggable"
            onMouseDown={handleStart}
            onTouchStart={handleStart}
          >
            start
          </p>
        )}

        {dragging && (
          <>
            <button data-dropzone data-path="/main">옵션 A</button>
            <button data-dropzone data-path="/main">옵션 B</button>
          </>
        )}
      </div>

      {dragging && (
        <div className="drag-emoji" style={{ left: pos.x, top: pos.y }}>
          🩲
        </div>
      )}
    </div>
  );
}

export default Start;