import { useNavigate } from "react-router-dom";

function Main() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>메인 화면</h1>
      <button onClick={() => navigate("/result")}>결과 보기</button>
      <button onClick={() => navigate("/")}>처음으로</button>
    </div>
  );
}

export default Main;