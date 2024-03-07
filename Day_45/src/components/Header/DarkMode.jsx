import { useDispatch, useSelector } from "react-redux";

const DarkMode = () => {
   const dispatch = useDispatch();
   const darkMode = useSelector(({ ui }) => ui.darkMode);

   const handleDarkMode = () => {
      dispatch({ type: darkMode ? "darkMode/off" : "darkMode/on" });
   };

   return (
      <div className="wrap__btn-dark-mode">
         <button onClick={handleDarkMode} className="btn__dark-mode" title="Change UI Dark Mode">
            <span className="text">
               {darkMode ? <i className="fa-solid fa-sun-bright"></i> : <i className="fa-solid fa-moon-stars"></i>}
            </span>
         </button>
      </div>
   );
};

export default DarkMode;
