const initialState = {
   darkMode: localStorage.getItem("darkMode") ?? "dark-mode",
};

export const darkModeReducer = (state = initialState, action) => {
   switch (action.type) {
      case "darkMode/on": {
         localStorage.setItem("darkMode", "dark-mode");
         return { ...state, darkMode: "dark-mode" };
      }
      case "darkMode/off": {
         localStorage.setItem("darkMode", false);
         return { ...state, darkMode: false };
      }
      default: {
         return state;
      }
   }
};
