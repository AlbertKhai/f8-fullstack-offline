export const handleLogin = (state, action) => {
   return { ...state, ...action.payload };
};

export const handleLogout = (state, action) => {
   const toasts = [...state.toasts];
   const id = Date.now();
   if (action.payload) {
      action.payload.id = id + 1;
      action.payload.type = "danger-toast";
      toasts.push(action.payload);
   }
   toasts.push({
      mess: "Bạn vui lòng đăng nhập lại nhé",
      type: "warning-toast",
      id,
   });

   return { ...state, isLogged: false, isLoading: false, toasts };
};
