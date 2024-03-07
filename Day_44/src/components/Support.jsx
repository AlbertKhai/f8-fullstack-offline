import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { useDispatch, useSelector } from "../core/hook";
import Logout from "./Authentication/Logout";
import FormSupport from "./FormSupport";

const Support = () => {
   const isLogged = useSelector((state) => state.isLogged);
   const disPatch = useDispatch();
   const { user, isAuthenticated, isLoading, error, logout } = useAuth0();

   useEffect(() => {
      if (error && isAuthenticated) {
         disPatch({ type: "authen/logout", payload: { mess: `Đã có lỗi xảy ra: ${error}` } });
         logout();
         return;
      }
      disPatch({ type: "authen/login", payload: { isLogged: isAuthenticated, isLoading } });
   }, [isAuthenticated, isLoading, error]);

   return (
      <main className="main">
         {isLogged && (
            <div className="wrap__form-support">
               <figure className="avatar">
                  {user?.picture && <img className="avatar-img" src={user.picture} alt={user?.name} />}
               </figure>
               <h1 className="user-name">{`Xin chào ${user?.name}`}</h1>
               <p className="user-email">{`Email: ${user.email}`}</p>
               <FormSupport />
               <Logout />
            </div>
         )}
      </main>
   );
};

export default Support;
