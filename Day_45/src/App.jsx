import clsx from "clsx";
import { useSelector } from "react-redux";
import Header from "./components/Header/Header";
import Toasts from "./components/Toasts/Toasts";
import Game from "./components/Game/Game";

const App = () => {
   const darkMode = useSelector(({ ui }) => ui.darkMode);
   return (
      <div className={clsx(darkMode, "game")}>
         <Header />
         <Game />
         <Toasts />
      </div>
   );
};

export default App;
