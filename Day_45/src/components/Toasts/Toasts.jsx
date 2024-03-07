import { useSelector } from "react-redux";
import Toast from "./Toast";

const Toasts = () => {
   const toastList = useSelector(({ toast }) => toast.toasts);
   return (
      <div className="wrap__toast">
         {toastList.map((toast) => {
            return <Toast key={toast.id} toast={toast} />;
         })}
      </div>
   );
};

export default Toasts;
