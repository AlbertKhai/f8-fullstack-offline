import React from "react";
import ToastItem from "./ToastItem";

const ToastList = ({ toasts, onToast }) => {
   return (
      <div className="wrap__toast">
         {toasts?.map((toast) => {
            return <ToastItem key={toast.id} toast={toast} onToast={onToast} />;
         })}
      </div>
   );
};

export default ToastList;
