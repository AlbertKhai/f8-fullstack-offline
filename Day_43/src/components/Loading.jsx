import { useSelector } from "../core/hook";

const Loading = () => {
   const isLoading = useSelector((state) => state.isLoading);
   return (
      <div className={`wrap__load ${isLoading ? "" : "hide"}`}>
         <div id="load">
            <div>G</div>
            <div>N</div>
            <div>I</div>
            <div>D</div>
            <div>A</div>
            <div>O</div>
            <div>L</div>
         </div>
         <div id="load__overlay"></div>
      </div>
   );
};

export default Loading;
