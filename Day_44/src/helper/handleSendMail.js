import emailjs from "@emailjs/browser";

import { validateEmail, validateContent } from "../utils/validate";

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export const handleSendEmail = async (value, dispatch, mailEl, messEl) => {
   if (validateEmail(value.toEmail, dispatch)) {
      mailEl.current.focus();
      return;
   }
   if (validateContent(value.message, dispatch)) {
      messEl.current.focus();
      return;
   }

   try {
      dispatch({ type: "loading/true" });
      await emailjs.send(serviceId, templateId, value, publicKey);
      dispatch({ type: "loading/false" });
      messEl.current.value = "";
      dispatch({ type: "toast/add", payload: { mess: `Bạn đã gửi yêu cầu thành công`, type: "success" } });
   } catch (error) {
      dispatch({ type: "toast/add", payload: { mess: `Có lỗi xảy ra khi gửi yêu cầu: ${error.text}`, type: "danger" } });
   }
   messEl.current.focus();
};
