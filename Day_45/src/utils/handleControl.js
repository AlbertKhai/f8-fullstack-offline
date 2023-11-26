export const handleControl = (e, inputGamePlay, level, handlePlay, handlePlayAgain) => {
   const answer = +inputGamePlay.current?.value;
   if (e.key === "Enter") {
      e.preventDefault();
   }
   let isFocus = false;
   const isNumber = /^\d+$/.test(e.key);
   switch (e.key) {
      case "Enter":
         if (isNaN(answer)) {
            handlePlayAgain();
            break;
         }
         answer && handlePlay();
         isFocus = true;
         break;
      case e.key:
         if (isNaN(answer)) {
            break;
         }
         if (isNumber) {
            const value = Math.max(Math.min(e.key, level), 0);
            inputGamePlay.current.value = value || "";
            isFocus = true;
            break;
         }
         break;
      case "ArrowUp":
         console.log("hi");
         inputGamePlay.current.value = Math.min(answer + 1, level);
         isFocus = true;
         break;
      case "ArrowDown":
         inputGamePlay.current.value = Math.max(answer - 1, 1);
         isFocus = true;
         break;
      default:
         break;
   }
   if (isFocus) {
      setTimeout(() => {
         inputGamePlay.current.focus();
      }, 0);
   }
};
