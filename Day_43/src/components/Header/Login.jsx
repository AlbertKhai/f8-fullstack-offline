import { useEffect, useState } from "react";
import { useDispatch } from "../../core/hook";
import { validateEmail } from "../../utils/validateEmail";
import client from "../../helper/client";

const Login = () => {
   const [value, setValue] = useState("");
   const dispatch = useDispatch();

   const handleInputTodo = (e) => {
      setValue(e.target.value);
   };

   const handleLogin = async (e) => {
      e.preventDefault();

      const resultValidate = validateEmail(value);
      if (resultValidate) {
         dispatch({
            type: "toast/add",
            payload: resultValidate,
         });
         e.target.children[0].focus();
         return;
      }

      dispatch({ type: "loading/true" });
      try {
         const { res, data } = await client.get(`/api-key?email=${value}`);

         if (!res.ok) {
            throw new Error(data.message);
         }

         localStorage.setItem("apiKey", data.data.apiKey);
         dispatch({ type: "authen/login" });
         setValue("");
      } catch (error) {
         dispatch({
            type: "toast/add",
            payload: { mess: error.message, type: "warning" },
         });
         e.target.children[0].focus();
         dispatch({ type: "loading/false" });
      }
   };

   useEffect(() => {
      return async () => {
         try {
            const { res, data } = await client.get("/users/profile");

            if (!res.ok) {
               throw new Error(data.message);
            }

            let name = data.data.emailId.name.trim().split(" ").slice(-2).join(" ");

            localStorage.setItem("name", name);
            dispatch({
               type: "toast/add",
               payload: {
                  mess: `Hello ${name + " "}👋😄`,
                  type: "success",
               },
            });
         } catch (error) {
            dispatch({ type: "authen/logout" });
         }
      };
   }, []);

   return (
      <form onSubmit={handleLogin} action="" method="post" className="form__login">
         <input
            onInput={handleInputTodo}
            value={value}
            className="input__login"
            type="text"
            placeholder="📧 Nhập email F8 của bạn ở đây nhé"
            autoFocus
         />
         <button className="btn__login">
            <span className="text">Đăng nhập</span>
         </button>
      </form>
   );
};

export default Login;
