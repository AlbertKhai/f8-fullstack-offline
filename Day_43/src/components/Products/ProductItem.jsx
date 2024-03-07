import { useState } from "react";
import toVND from "../../utils/toCurrency";
import { useDispatch } from "../../core/hook";

const ProductItem = (props) => {
   const { _id: id, name, price, image, quantity: inventory } = props.product;
   const [isImageLoaded, setImageLoaded] = useState(false);
   const dispatch = useDispatch();

   const handleAddCart = () => {
      dispatch({
         type: "toast/add",
         payload: { mess: `Bạn đã thêm sản phẩm ${name}\n thành công vào giỏ hàng`, type: "success" },
      });
      dispatch({ type: "cart/add", payload: { id, name, price: +price, inventory: +inventory } });
   };

   const handleImageLoad = () => {
      setImageLoaded(true);
   };

   return (
      <li className="product-item">
         <figure className={`product-thumb ${isImageLoaded ? "no-animation" : ""}`}>
            <img src={image} alt={name} className="product-img" onLoad={handleImageLoad} />
         </figure>
         <div className="product-content">
            <p className="product-name">{name}</p>
            <div className="product-action">
               <span className="product-price">{toVND(price)}</span>
               <button onClick={handleAddCart} className="product-btn__add">
                  <span className="text">Thêm vào giỏ</span>
               </button>
            </div>
         </div>
      </li>
   );
};

export default ProductItem;
