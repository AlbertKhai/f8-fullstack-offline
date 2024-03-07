import Login from "./Authentication/Login";
import { useSelector } from "../core/hook";

const Header = () => {
   const isLogged = useSelector((state) => state.isLogged);
   const isLoading = useSelector((state) => state.isLoading);

   return (
      !isLoading &&
      !isLogged && (
         <header className="header">
            <h1 className="header-heading">Cảm ơn bạn đã sử dụng dịch vụ của F8</h1>
            <h2 className="header-title">Nếu có bất kỳ câu hỏi hay trợ giúp nào, hãy đăng nhập và đặt câu hỏi tại đây!</h2>
            <Login />
         </header>
      )
   );
};

export default Header;
