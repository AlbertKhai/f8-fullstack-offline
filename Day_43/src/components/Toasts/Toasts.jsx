import { useSelector } from "../../core/hook";
import Toast from "./Toast";

const Toasts = () => {
   const toastList = useSelector((state) => state.toasts);
   return (
      <div className="wrap__toast">
         {toastList.map((toast) => {
            return <Toast key={toast.id} toast={toast} />;
         })}
      </div>
   );
};

export default Toasts;
