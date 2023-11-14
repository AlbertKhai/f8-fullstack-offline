import { useState } from "react";
import { client } from "../../../helper/client";

const emailRegex =
   /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

const validateEmail = async (e, id, value, onToast) => {
   let mess;
   console.log(emailRegex.test(value));
   switch (true) {
      case value.length > 255:
         mess = "Chỉ chứa email tối đa 255 kí tự";
         setValue(value.slice(0, 255));
         break;
      case value.length < 3:
         mess = "Email phải chứa ít nhất 3 kí tự";
         break;
      case !emailRegex.test(value):
         mess = "Địa chỉ email không hợp lệ";
         break;

      default:
         e.target.children[0].focus();
         return new Promise((resolve) => resolve(false));
   }

   onToast({ mess: `${mess}\n Bạn vui lòng nhập lại nhé`, type: "warning", id });
   e.target.children[0].focus();
   return new Promise((resolve) => resolve(true));
};

const Login = ({ onToast, onLoading, onLogin }) => {
   const [value, setValue] = useState("");

   const handleLogin = async (e) => {
      e.preventDefault();
      const id = Date.now();

      const resultValidate = await validateEmail(e, id, value, onToast);
      if (resultValidate) return;

      onLoading(true);
      try {
         const { res, data } = await client.get(`/api-key?email=${value}`);

         if (!res.ok) {
            throw new Error(data.message);
         }

         localStorage.setItem("userEmail", value);
         localStorage.setItem("apiKey", data.data.apiKey);
         localStorage.setItem("name", value.match(/^[^@]+/));
         onLogin();

         setValue("");
         onToast({ mess: `Xin chào ${value.match(/^[^@]+/)} 👋😄`, type: "success", id });
      } catch (error) {
         onToast({ mess: error.message, type: "warning", id });
         e.target.children[0].focus();
      }
      onLoading();
   };

   const handleInputTodo = (e) => {
      setValue(e.target.value);
   };

   return (
      <form onSubmit={handleLogin} action="" method="post" className="form__login">
         <input
            onInput={handleInputTodo}
            className="login-todo"
            type="text"
            placeholder="📧 Nhập email F8 của bạn ở đây nhé"
            value={value}
            autoFocus
         />
         <button className="btn__login-todo">
            <span className="text">Đăng nhập</span>
         </button>
      </form>
   );
};

export default Login;
