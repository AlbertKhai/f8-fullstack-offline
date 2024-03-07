import React from "react";
import GameSettings from "./GameSettings/GameSettings";
import GamePlay from "./GamePlay";
import Score from "./Score/Score";

const Game = () => {
   return (
      <main className="game-inner">
         <GameSettings />
         <GamePlay />
         <Score />
      </main>
   );
};

export default Game;
