import React from "react";
import Header from "./components/Header/Header";
import Products from "./components/Products/Products";
import Cart from "./components/Cart/Cart";
import Loading from "./components/Loading";
import Toasts from "./components/Toasts/Toasts";

const App = () => {
   return (
      <div className="shop">
         <div className="shop-inner">
            <Header />
            <Products />
            <Cart />
         </div>
         <Loading />
         <Toasts />
      </div>
   );
};

export default App;
