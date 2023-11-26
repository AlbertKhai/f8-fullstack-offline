import React from "react";
import DarkMode from "./DarkMode";

const Header = () => {
   return (
      <div className="header">
         <h1 className="header-heading">Chào mừng bạn đến với chò trơi đoán số</h1>
         <DarkMode />
      </div>
   );
};

export default Header;
