import { useEffect } from "react";
import { useSelector, useDispatch } from "../../core/hook";
import client from "../../helper/client";
import ProductItem from "./ProductItem";

const Products = () => {
   const isLogin = useSelector((state) => state.isLogin);
   const dispatch = useDispatch();
   const products = useSelector((state) => state.products);

   useEffect(() => {
      if (isLogin) {
         (async () => {
            try {
               const { res, data } = await client.get(`/products?limit=8`);
               if (!res.ok) {
                  throw new Error(data.message);
               }

               data.data.listProduct;
               dispatch({ type: "products/get", payload: data.data.listProduct });
            } catch (error) {
               dispatch({ type: "authen/logout" });
               return;
            }
            dispatch({ type: "loading/false" });
         })();
      }
   }, [isLogin]);

   return (
      <main className="main">
         {isLogin ? (
            <ul className="product-list">
               {products.map((product) => (
                  <ProductItem key={product._id} product={product} />
               ))}
            </ul>
         ) : (
            ""
         )}
      </main>
   );
};

export default Products;
