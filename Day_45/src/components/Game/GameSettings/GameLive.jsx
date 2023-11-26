import { useSelector } from "react-redux";

const GameLive = () => {
   const liveInit = useSelector(({ live }) => live.liveInit);
   const live = useSelector(({ live }) => live.live);

   return <strong className="game-live">💘 {+liveInit - +live}</strong>;
};

export default GameLive;
