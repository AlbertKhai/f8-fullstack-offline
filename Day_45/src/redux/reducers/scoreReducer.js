export const initialState = {
   score: JSON.parse(localStorage.getItem("score")) ?? [],
};

export const scoreReducer = (state = initialState, action) => {
   switch (action.type) {
      case "score/add": {
         action.payload.id = Date.now();
         localStorage.setItem("score", JSON.stringify([...state.score, action.payload]));
         return { ...state, score: [...state.score, action.payload] };
      }
      case "score/remove": {
         const score = state.score.filter((item) => item.id !== action.payload);
         localStorage.setItem("score", JSON.stringify([...state.score, score]));
         return { ...state, score };
      }

      default:
         return state;
   }
};
