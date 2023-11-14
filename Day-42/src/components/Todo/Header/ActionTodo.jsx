import { useState, useEffect } from "react";
import { client } from "../../../helper/client";

let inputElHeader, timer;

const ActionTodo = ({ onSearch, onToast, onLoading, onLogout, onAddTodo }) => {
   const [state, setState] = useState({
      value: "",
      isSearch: false,
   });

   const handleAutoFocus = ({ target }) => {
      if (!inputElHeader) {
         inputElHeader = target;
      }
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      if (state.isSearch) {
         handleSearch();
         return;
      }

      handleAddTodo();
   };

   const handleInputTodo = ({ target }) => {
      setState({ ...state, value: target.value });
   };

   const handleSearch = async () => {
      onSearch(state.value);
      inputElHeader?.focus();
   };

   const handleAddTodo = async (toggle = false) => {
      const id = Date.now();
      const { value } = state;

      if (toggle && !value.length) {
         setState({ ...state, isSearch: false });
         inputElHeader?.focus();
         return;
      }

      if (value.length > 255) {
         onToast({
            mess: "Todo chỉ chứa tối đa 255 kí tự",
            type: "warning",
            id,
         });
         setState({ ...state, value: value.slice(0, 255) });
         setState({ value: state.value, isSearch: false });
         inputElHeader?.focus();
         return;
      } else if (value.length < 2) {
         onToast({
            mess: "Todo phải chứa ít nhất 2 kí tự",
            type: "warning",
            id,
         });
         setState({ value: state.value, isSearch: false });
         inputElHeader?.focus();
         return;
      }

      onLoading(true);
      try {
         const body = {
            todo: value,
         };

         const { res, data } = await client.post(`/todos`, body);

         if (!res.ok) {
            throw new Error(data.message);
         }

         onAddTodo(data.data);

         if (state.isSearch) {
            onSearch();
         }

         setState({ value: "", isSearch: false });

         onToast({
            mess: "Thêm todo thành công",
            type: "success",
            id,
         });
      } catch (error) {
         console.error(error.message);
         onLogout({
            mess: "Thêm todo không thành công",
            type: "danger",
            id,
         });
      }
      onLoading();
      inputElHeader?.focus();
   };

   const handleAction = (e, isSearch = false) => {
      e.preventDefault();
      if (isSearch) {
         if (!state.isSearch) {
            setState({ ...state, isSearch: true });
         }
         handleSearch();
         return;
      }

      handleAddTodo(true);
   };

   useEffect(() => {
      if (state.isSearch) {
         if (timer) clearTimeout(timer);
         timer = setTimeout(() => {
            handleSearch();
         }, 500);
      }

      return () => {
         if (timer) clearTimeout(timer);
      };
   }, [state.value]);

   return (
      <form onSubmit={handleSubmit} action="" method="post" className="form__action-todo-header">
         <input
            onInput={handleInputTodo}
            onFocus={handleAutoFocus}
            className="input__todo-header"
            type="text"
            placeholder={state.isSearch ? "🔎 Tìm kiếm todo nào" : "📌Thêm todo mới ha"}
            value={state.value}
            autoFocus
         />
         <div className={`wrap__btn-header ${state.isSearch ? "searching" : ""}`}>
            <button
               type="button"
               onClick={(e) => handleAction(e, true)}
               className={`btn__search-todo ${state.isSearch ? "" : "mini"}`}
               title={state.isSearch ? "" : "Tìm kiếm Todo"}
            >
               <span className="text">{state.isSearch ? "Tìm kiếm" : "🔎"}</span>
            </button>
            <button
               type="button"
               onClick={handleAction}
               className={`btn__add-todo ${state.isSearch ? "mini" : ""}`}
               title={state.isSearch ? "Thêm mới Todo" : ""}
            >
               <span className="text">{state.isSearch ? "📌" : "Thêm mới"}</span>
            </button>
         </div>
      </form>
   );
};

export default ActionTodo;
