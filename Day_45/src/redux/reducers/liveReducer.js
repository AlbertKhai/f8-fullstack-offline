const initialState = {
   liveInit: localStorage.getItem("live") ?? 7,
   live: 0,
};

export const liveReducer = (state = initialState, action) => {
   switch (action.type) {
      case "live/update": {
         return { ...state, live: action.payload };
      }
      case "live/init": {
         localStorage.setItem("live", action.payload);
         return { ...state, liveInit: action.payload };
      }
      default: {
         return state;
      }
   }
};
