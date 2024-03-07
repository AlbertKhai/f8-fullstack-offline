import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { validateInput } from "../../utils/validate";
import { handleAnswer } from "../../utils/handleAnswer";
import { handleControl } from "../../utils/handleControl";

const randomNum = (max, min = 1) => Math.floor(Math.random() * (max - min + 1)) + min;

const GamePlay = () => {
   const liveInit = useSelector(({ live }) => live.liveInit);
   const live = useSelector(({ live }) => live.live);
   const level = +useSelector(({ lv }) => lv.level);
   const dispatch = useDispatch();
   const inputGamePlay = useRef();

   const [state, setState] = useState({
      result: randomNum(level),
      done: false,
   });

   const { result, done } = state;

   const handlePlay = (e) => {
      e?.preventDefault();
      const resultAnswer = handleAnswer(live, liveInit, inputGamePlay, dispatch, result);
      resultAnswer && setState({ result: randomNum(level), done: true });
   };

   const handlePlayAgain = () => {
      dispatch({ type: "live/update", payload: 0 });
      setState({ result: randomNum(level), done: false });
   };

   const handleInput = () => {
      validateInput(level, inputGamePlay);
   };

   const handleInputKeyDown = (e) => {
      e.stopPropagation();
   };

   useEffect(() => {
      handlePlayAgain();
      inputGamePlay.current.value = "";
      const handleKeyDown = (e) => {
         handleControl(e, inputGamePlay, level, handlePlay, handlePlayAgain);
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
         window.removeEventListener("keydown", handleKeyDown);
      };
   }, [level]);

   useEffect(() => {
      if (!done) {
         inputGamePlay.current.focus();
      }
   }, [done]);

   return (
      <div className="game-play">
         {done ? (
            <button onClick={handlePlayAgain} className="btn__play-again">
               <span className="text">Chơi lại</span>
            </button>
         ) : (
            <form onSubmit={handlePlay} action="post" className="game-play__form">
               <label className="game-label__play">
                  <span>Hãy thử nhập một số</span>
                  <input
                     onInput={handleInput}
                     onKeyDown={handleInputKeyDown}
                     ref={inputGamePlay}
                     min={1}
                     max={level}
                     className="game-input__play"
                     type="number"
                  />
               </label>
            </form>
         )}
      </div>
   );
};

export default GamePlay;
