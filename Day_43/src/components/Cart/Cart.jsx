import { useDispatch, useSelector } from "../../core/hook";
import toVND from "../../utils/toCurrency";
import CartItem from "./CartItem";
import client from "../../helper/client";

const Cart = () => {
   const hide = useSelector((state) => state.isShowCart);
   const cart = useSelector((state) => state.cart);
   const dispatch = useDispatch();

   const totalAmount = cart.reduce((prev, product) => (prev += +product.quantity * +product.price), 0);

   const handleHideCart = () => {
      dispatch({ type: "cart/hide" });
   };

   const handlePay = async () => {
      dispatch({ type: "loading/true" });
      try {
         let apiKey = localStorage.getItem("apiKey");

         if (!apiKey) {
            throw new Error("Api-key not null");
         }

         const body = cart.map((product) => ({ productId: product.id, quantity: product.quantity }));

         const { res, data } = await client.post("/orders", body);

         if (!res.ok) {
            if (data.code === 401) {
               dispatch({
                  type: "authen/logout",
                  payload: { mess: "Unauthorize" },
               });
               return;
            }

            throw new Error(data.message);
         }

         dispatch({ type: "cart/pay" });
      } catch (error) {
         dispatch({
            type: "toast/add",
            payload: { mess: error.message, type: "danger" },
         });
      }
      dispatch({ type: "loading/false" });
   };

   return (
      <div className={`cart ${hide}`}>
         <div className="cart-inner">
            <header className="cart-header">
               <div className="cart-title">Tên sản phẩm</div>
               <div className="cart-title quantity">Số lượng</div>
               <div className="cart-title">Giá tiền</div>
               <div className="cart-title">Thành tiền</div>
               <div className="cart-title inventory">Sản phẩm có sẵn</div>
            </header>
            <ul className="cart-list">
               {cart.map((product) => {
                  product.quantity = +product.quantity;
                  product.price = +product.price;
                  product.inventory = +product.inventory;
                  return <CartItem key={product.id} product={product} />;
               })}
            </ul>
            <footer className="cart-footer">
               <div className="cart-title">Tổng tiền</div>
               <div className="cart__total-amount">{toVND(totalAmount)}</div>
               <div className="cart-wrap__btn-pay">
                  <button onClick={handlePay} className="cart-btn__pay">
                     <span className="text">Thanh toán</span>
                  </button>
               </div>
            </footer>
         </div>
         <div onClick={handleHideCart} className="cart__overlay"></div>
      </div>
   );
};

export default Cart;
