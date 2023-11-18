import { setApiKey, handleLogout } from "../utils/authen";

export const initialState = {
   isLogin: setApiKey(),
   isLoading: false,
   isShowCart: "hide",
   products: [],
   toasts: [],
   cart: JSON.parse(localStorage.getItem("cart")) ?? [],
};

export const reducer = (state, action) => {
   switch (action.type) {
      case "authen/login": {
         return { ...state, isLogin: setApiKey() };
      }
      case "authen/logout": {
         return { ...state, isLogin: false, cart: [], isShowCart: "hide", toasts: handleLogout(state, action), isLoading: false };
      }
      case "products/get": {
         return { ...state, products: action.payload };
      }
      case "cart/add": {
         let hasProduct;
         const cart = state.cart.map((product) => {
            if (product.id === action.payload.id) {
               hasProduct = true;
               product.quantity += 1;
            }
            return product;
         });

         if (!hasProduct) {
            action.payload.quantity = 1;
            cart.push(action.payload);
         }

         localStorage.setItem("cart", JSON.stringify(cart));

         return { ...state, cart };
      }
      case "cart/remove": {
         const cart = state.cart.filter((product) => product.id !== action.payload.id);

         localStorage.setItem("cart", JSON.stringify(cart));

         return {
            ...state,
            cart,
            toasts: [
               ...state.toasts,
               {
                  mess: `Đã bỏ sản phẩm ${action.payload.name} ra khỏi giỏ hàng`,
                  type: "success-toast",
                  id: Date.now(),
               },
            ],
         };
      }
      case "cart/pay": {
         localStorage.setItem("cart", JSON.stringify([]));
         return {
            ...state,
            cart: [],
            isShowCart: "hide",
            toasts: [...state.toasts, { mess: "Bạn đã thanh toán thành công", type: "success-toast", id: Date.now() }],
         };
      }
      case "cart/show": {
         return { ...state, isShowCart: "" };
      }
      case "cart/hide": {
         return { ...state, isShowCart: "hide" };
      }
      case "toast/add": {
         action.payload.id = Date.now();
         action.payload.type += "-toast";
         return { ...state, toasts: [...state.toasts, action.payload] };
      }
      case "toast/remove": {
         return { ...state, toasts: state.toasts.filter((item) => item.id !== action.payload) };
      }

      case "loading/true": {
         return { ...state, isLoading: true };
      }
      case "loading/false": {
         return { ...state, isLoading: false };
      }

      default:
         return state;
   }
};
