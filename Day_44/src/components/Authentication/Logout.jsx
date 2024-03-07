import { useAuth0 } from "@auth0/auth0-react";

const Logout = () => {
   const { logout } = useAuth0();
   return (
      <div className="wrap__btn-logout">
         <button className="btn-logout" onClick={() => logout()}>
            <span className="text">Đăng xuất</span>
         </button>
      </div>
   );
};

export default Logout;
