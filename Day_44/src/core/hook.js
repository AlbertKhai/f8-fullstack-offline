//Custom Hook
import { ProviderContext } from "./Provider";
import { useContext } from "react";

//Hook đọc state từ Global
export const useSelector = (callback) => {
   const { state } = useContext(ProviderContext);
   return callback(state);
};

//Hook đọc dispatch từ Global
export const useDispatch = () => {
   const { dispatch } = useContext(ProviderContext);
   return dispatch;
};
