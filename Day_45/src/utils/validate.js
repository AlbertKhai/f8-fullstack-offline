export const validateInput = (level, inputGamePlay) => {
   let answer = +inputGamePlay.current.value;
   switch (true) {
      case answer % 1 !== 0:
         inputGamePlay.current.value = Math.floor(answer);
         break;
      case answer < 0:
         inputGamePlay.current.value = "";
         break;
      case answer < 1:
         inputGamePlay.current.value = "";
         break;
      case answer > level:
         inputGamePlay.current.value = level;
         break;

      default:
         break;
   }
};
