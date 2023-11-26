import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";

const GameLevel = memo(function GameLevel({ value }) {
   const liveInit = useSelector(({ live }) => live.liveInit);
   const dispatch = useDispatch();

   const handleChangeLv = () => {
      dispatch({ type: "level/update", payload: value });

      const newLiveInit = Math.ceil(Math.log2(value));
      if (newLiveInit !== +liveInit) {
         dispatch({ type: "live/init", payload: newLiveInit });
      }
   };

   return (
      <button onClick={handleChangeLv} data-value={value} className="game-level">
         {value}
      </button>
   );
});

export default GameLevel;
