import { useAuth0 } from "@auth0/auth0-react";
import { useRef } from "react";

import { useDispatch } from "../core/hook";
import { handleSendEmail } from "../helper/handleSendMail";

const FormSupport = () => {
   const dispatch = useDispatch();
   const { user } = useAuth0();
   const mailEl = useRef();
   const messEl = useRef();

   const handleSubmit = (e) => {
      e.preventDefault();

      const value = {
         fromEmail: user.email,
         fromName: user.name,
         toEmail: mailEl.current.value,
         message: messEl.current.value,
      };

      handleSendEmail(value, dispatch, mailEl, messEl);
   };

   return (
      <form onSubmit={handleSubmit} action="post" className="form-support">
         <label className="label__support-email">
            <input ref={mailEl} type="email" className="support__email" placeholder=" " defaultValue={user.email} />
            <span className="placeholder__support-email">Email nhận</span>
         </label>
         <label className="label__support-message">
            <textarea ref={messEl} className="support__message" rows="10" placeholder=" "></textarea>
            <span className="placeholder__support-message">Tin nhắn</span>
         </label>
         <button className="support__btn-submit">
            <span className="text">Yêu cầu hỗ trợ!</span>
         </button>
      </form>
   );
};

export default FormSupport;
