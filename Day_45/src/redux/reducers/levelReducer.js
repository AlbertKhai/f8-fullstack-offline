const initialState = {
   level: localStorage.getItem("level") ?? 100,
};

export const levelReducer = (state = initialState, action) => {
   switch (action.type) {
      case "level/update": {
         localStorage.setItem("level", action.payload);
         return { ...state, level: action.payload };
      }
      default: {
         return state;
      }
   }
};
