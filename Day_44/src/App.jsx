import Support from "./components/Support";
import Header from "./components/Header";
import Loading from "./components/Loading";
import Toasts from "./components/Toasts/Toasts";

const App = () => {
   return (
      <div className="support">
         <Header />
         <Support />
         <Loading />
         <Toasts />
      </div>
   );
};

export default App;
