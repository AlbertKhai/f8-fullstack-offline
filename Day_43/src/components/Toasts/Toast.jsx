import { useEffect, useState } from "react";
import { useDispatch } from "../../core/hook";

let timeoutId;
const Toast = (props) => {
   const [hide, setHide] = useState(true);
   const { mess, type, id, confirm } = props.toast;
   const dispatch = useDispatch();

   const handleToast = (e) => {
      e?.stopPropagation();
      clearTimeout(timeoutId);
      setHide(true);
      setTimeout(() => {
         dispatch({ type: "toast/remove", payload: id });
      }, 500);
   };

   useEffect(() => {
      setTimeout(function () {
         setHide(false);
      }, 100);

      const time = confirm ? 6000 : 3000;

      timeoutId = setTimeout(() => {
         setHide(true);
         setTimeout(() => {
            dispatch({ type: "toast/remove", payload: id });
         }, 500);
      }, time);
   }, []);

   const handleConfirm = () => {
      typeof confirm === "function" && confirm();
      handleToast();
   };

   return (
      <div onClick={handleConfirm} className={`toast ${type} ${hide ? "hide" : ""}`}>
         <h3>{mess}</h3>
         <button onClick={handleToast} className="close">
            <i className="fa-solid fa-xmark"></i>
         </button>
      </div>
   );
};

export default Toast;
