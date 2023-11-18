import toVND from "../../utils/toCurrency";
import { useDispatch, useSelector } from "../../core/hook";

const CartItem = (props) => {
   const { id, name, quantity, price, inventory } = props.product;
   const cart = useSelector((state) => state.cart);
   const dispatch = useDispatch();

   const removeCart = () => {
      if (cart.length === 1) {
         dispatch({ type: "cart/hide" });
      }
      setTimeout(() => {
         dispatch({ type: "cart/remove", payload: { id, name } });
      }, 500);
   };

   const handleRemoveCart = () => {
      dispatch({
         type: "toast/add",
         payload: {
            mess: `Bấm vào đây nếu bạn chắc chắn bỏ sản phẩm\n ${name} khỏi giỏ hàng`,
            type: "warning",
            confirm: removeCart,
         },
      });
   };

   return (
      <li className="cart-item">
         <div className="cart-name">{name}</div>
         <div className="cart-quantity">{quantity}</div>
         <div className="cart-price">{toVND(price)}</div>
         <div className="cart-price__total">{toVND(quantity * price)}</div>
         <div className="cart-inventory">{inventory - quantity}</div>
         <div className="cart-wrap__btn-del">
            <button onClick={handleRemoveCart} className="cart-btn__del">
               <i className="fa-solid fa-xmark"></i>
            </button>
         </div>
      </li>
   );
};

export default CartItem;
