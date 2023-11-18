import Login from "./Login";
import { useDispatch, useSelector } from "../../core/hook";

const Header = () => {
   const isLogin = useSelector((state) => state.isLogin);
   const cart = useSelector((state) => state.cart);
   const dispatch = useDispatch();

   const handleShowCart = () => {
      if (!cart.length) {
         dispatch({
            type: "toast/add",
            payload: { mess: "Bạn chưa có sản phẩm nào trong giỏ hàng 🤔", type: "warning" },
         });
         return;
      }
      dispatch({ type: "cart/show" });
   };

   return (
      <header className="header">
         <h1 className="header__heading">
            {isLogin ? `Hi ${localStorage.getItem("name")}, mua sắm dui dẻ 🤑` : "Chào mừng bạn đến với Shop 😀"}
         </h1>
         <div className={`header-wrap__action ${isLogin ? "logged" : ""}`}>
            {isLogin ? (
               <div className="header-wrap__btn-cart">
                  <button onClick={handleShowCart} className="header-btn__show-cart">
                     <span className="text">🛒</span>
                  </button>
               </div>
            ) : (
               <Login />
            )}
         </div>
      </header>
   );
};

export default Header;
