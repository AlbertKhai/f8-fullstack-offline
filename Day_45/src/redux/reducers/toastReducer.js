export const initialState = {
   toasts: [],
};

export const toastReducer = (state = initialState, action) => {
   switch (action.type) {
      case "toast/add": {
         action.payload.id = Date.now();
         action.payload.type += "-toast";
         return { ...state, toasts: [...state.toasts, action.payload] };
      }
      case "toast/remove": {
         return { ...state, toasts: state.toasts.filter((item) => item.id !== action.payload) };
      }

      default:
         return state;
   }
};
