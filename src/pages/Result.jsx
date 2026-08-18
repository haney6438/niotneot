import { useNavigate } from "react-router-dom";

function Result() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>결과 화면</h1>
      <button onClick={() => navigate("/main")}>메인으로</button>
      <button onClick={() => navigate("/")}>처음으로</button>
    </div>
  );
}

export default Result;