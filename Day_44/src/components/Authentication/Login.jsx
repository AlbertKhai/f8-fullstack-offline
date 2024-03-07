import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
   const { loginWithPopup } = useAuth0();

   return (
      <div className="wrap__btn-login">
         <button className="btn-login" onClick={() => loginWithPopup()}>
            <span className="text">Đăng nhập</span>
         </button>
      </div>
   );
};

export default Login;
