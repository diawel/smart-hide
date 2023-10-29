import ColumnWithTitle from "../../components/chunk/ColumnWithTitle";
import Click from "../../components/bit/Click";
import SquareButton from "../../components/bit/SquareButton";
import { useNavigate } from "react-router-dom";
import GlobalWrapper from "../../components/chunk/GlobalWrapper";

const Lobby: React.FC = () => {
  const navigate = useNavigate();
  return (
    <GlobalWrapper>
      <ColumnWithTitle title="未来大げっさー">
        <Click
          onClick={() => {
            navigate(`/play/${crypto.randomUUID()}`);
          }}
        >
          <SquareButton text="ゲームをつくる" />
        </Click>
        <Click
          onClick={() => {
            navigate("/join");
          }}
        >
          <SquareButton text="ゲームに参加する" />
        </Click>
      </ColumnWithTitle>
    </GlobalWrapper>
  );
};

export default Lobby;
