let answerBefore;
let score = { points: [] };

export const handleAnswer = (live, liveInit, inputGamePlay, dispatch, result) => {
   const answer = +inputGamePlay.current.value;
   let mess;

   // Trả lời đúng
   if (answer === result) {
      mess = "Bạn đã trả lời chính xác, diệu kì thế 😀";
      dispatch({
         type: "toast/add",
         payload: { mess, type: "success" },
      });
      dispatch({
         type: "score/add",
         payload: { maxLive: +liveInit, result, points: [...score.points, answer] },
      });
      setTimeout(function () {
         score = { points: [] };
         answerBefore = null;
      }, 0);
      return true;
   }

   // Trả lời sai
   if (!answer) {
      mess = `Bạn chưa nhập đáp án`;
      dispatch({
         type: "toast/add",
         payload: { mess, type: "warning" },
      });
      return;
   }

   mess = answer < result ? "Bạn tăng thêm chút nữa 🤔" : "Bạn giảm đi xíu nữa 🤔";

   if (answerBefore === answer) {
      mess = `Bạn đã nhập số này trước đó rồi\n ${mess} 🤔`;
      dispatch({
         type: "toast/add",
         payload: { mess, type: "warning" },
      });
      return;
   }

   answerBefore = answer;

   // Nếu xong ván cuối
   const isEnd = live === liveInit - 1;
   if (isEnd) {
      mess = `Rất tiếc đáp án là ${result}\n Chúc bạn may mắn lần sau nhé 😉`;
      dispatch({
         type: "score/add",
         payload: { maxLive: +liveInit, result, points: [...score.points, answer] },
      });
      setTimeout(function () {
         score = { points: [] };
         answerBefore = null;
      }, 0);
   }

   dispatch({
      type: "toast/add",
      payload: { mess, type: "warning" },
   });

   dispatch({
      type: "live/update",
      payload: live + 1,
   });
   score.points.push(answer);

   if (isEnd) return true;
};
