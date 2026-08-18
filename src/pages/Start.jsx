import { useNavigate } from "react-router-dom";

function Start() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>시작 화면</h1>
      <button onClick={() => navigate("/main")}>시작하기</button>
    </div>
  );
}

export default Start;