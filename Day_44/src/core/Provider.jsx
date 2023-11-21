/* eslint-disable react/prop-types */
import { createContext, useReducer } from "react";
import { reducer, initialState } from "./reducer";

export const ProviderContext = createContext();

const Provider = ({ children }) => {
   const [state, dispatch] = useReducer(reducer, initialState);
   return (
      <ProviderContext.Provider
         value={{
            state,
            dispatch,
         }}
      >
         {children}
      </ProviderContext.Provider>
   );
};

export default Provider;
//Bọc các component muốn nhận Global State
