import React from "react";
import { useDispatch, useSelector } from "react-redux";
import GameLevel from "./GameLevel";
import GameLive from "./GameLive";

const checkIns = [100, 512, 1024, 1536, 2048];

const GameSettings = () => {
   const liveInit = useSelector(({ live }) => live.liveInit);
   const level = useSelector(({ lv }) => lv.level);
   const dispatch = useDispatch();

   const handleChangeLv = (e) => {
      const value = e.target.value;
      dispatch({ type: "level/update", payload: value });

      const newLiveInit = Math.ceil(Math.log2(value));
      if (newLiveInit !== +liveInit) {
         dispatch({ type: "live/init", payload: newLiveInit });
      }
   };

   return (
      <div className="game-settings">
         <h2 className="game-title">
            Bạn cần tìm một con số từ <b>1</b> đến <b>{level}</b>
         </h2>
         <GameLive />
         <input onChange={handleChangeLv} value={level} type="range" className="game-input__level" min={5} max={2048} />
         <div className="game-wrap__level">
            {checkIns.map((value, i) => (
               <GameLevel key={i} value={value} dispatch={dispatch} />
            ))}
         </div>
      </div>
   );
};

export default GameSettings;
