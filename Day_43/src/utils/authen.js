import client from "../helper/client";

export const setApiKey = () => {
   let apiKey = localStorage.getItem("apiKey");
   if (!apiKey) {
      return false;
   }

   client.setApIKey(apiKey);
   return true;
};

export const handleLogout = (state, action) => {
   localStorage.removeItem("apiKey");
   localStorage.removeItem("name");
   localStorage.removeItem("cart");
   const toasts = [...state.toasts];
   const id = Date.now();
   if (action.payload) {
      action.payload.id = id + 1;
      action.payload.type = "danger-toast";
      toasts.push(action.payload);
   }
   toasts.push({ mess: "Bạn vui lòng đăng nhập lại nhé", type: "danger-toast", id });

   return toasts;
};
