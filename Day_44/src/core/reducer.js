import { handleLogin, handleLogout } from "../utils/authen";

export const initialState = {
   isLogged: false,
   isLoading: false,
   toasts: [],
};

export const reducer = (state, action) => {
   switch (action.type) {
      case "authen/login": {
         return handleLogin(state, action);
      }
      case "authen/logout": {
         return handleLogout(state, action);
      }
      case "toast/add": {
         action.payload.id = Date.now();
         action.payload.type += "-toast";
         return { ...state, toasts: [...state.toasts, action.payload] };
      }
      case "toast/remove": {
         return { ...state, toasts: state.toasts.filter((item) => item.id !== action.payload) };
      }

      case "loading/true": {
         return { ...state, isLoading: true };
      }
      case "loading/false": {
         return { ...state, isLoading: false };
      }

      default:
         return state;
   }
};
