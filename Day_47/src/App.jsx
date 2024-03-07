import Loading from "./components/Loading";
import Toasts from "./components/Toasts/Toasts";
import TrelloInner from "./layouts/TrelloInner";

const App = () => {
  return (
    <div className="trello">
      <TrelloInner />
      <Loading />
      <Toasts />
    </div>
  );
};

export default App;
