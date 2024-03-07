import React, { Component } from "react";
import { client } from "../../helper/client";
import TodoList from "./TodoList";
import Header from "./Header/Header";

export default class Todo extends Component {
   constructor(props) {
      super(props);
      this.state = {
         listTodo: [],
         isLogin: props.isLogin,
         noResults: false,
         searching: false,
      };
   }

   getTodoList = async (query, isSearch) => {
      try {
         this.props.onLoading(true);
         const { res, data } = await client.get(`/todos${query ? `?q=${query}` : ""}`);

         if (!res.ok) {
            throw new Error(data.message);
         }

         const { listTodo } = data.data;
         const state = { listTodo, noResults: false, searching: false };

         if (!listTodo.length) {
            state.noResults = true;
            if (isSearch) {
               state.searching = true;
            }
         }

         this.setState(state);
      } catch (error) {
         console.error("Lỗi: ", error.message);
         this.props.onLogout({ mess: "Lấy todo list không thành công", type: "danger", id: Date.now() });
      }
      this.props.onLoading();
   };

   handleSearch = (query) => {
      this.getTodoList(query, true);
   };

   handleAddTodo = (newTodo) => {
      const state = {
         listTodo: [newTodo, ...this.state.listTodo],
      };

      if (!this.state.listTodo.length) {
         state.noResults = false;
      }

      this.setState(state);
   };

   handleDeleteTodo = (id) => {
      const state = {
         listTodo: this.state.listTodo.filter((item) => item._id !== id),
      };

      if (!state.listTodo.length) {
         state.noResults = true;
      }

      this.setState(state);
   };

   componentDidUpdate(prevProps) {
      if (this.props.isLogin !== prevProps.isLogin) {
         if (!this.props.isLogin) {
            this.setState({
               listTodo: [],
               isLogin: false,
            });
         }

         if (this.props.isLogin) {
            this.setState({
               isLogin: true,
            });
            this.getTodoList();
         }
      }
   }

   componentDidMount() {
      if (this.state.isLogin) {
         this.getTodoList();
      }
   }

   render() {
      return (
         <div className="todo-inner">
            <Header
               onLoading={this.props.onLoading}
               onToast={this.props.onToast}
               onLogin={this.props.onLogin}
               onLogout={this.props.onLogout}
               onAddTodo={this.handleAddTodo}
               onSearch={this.handleSearch}
               isLogin={this.state.isLogin}
            />
            <div className={`no-results ${this.state.noResults ? "" : "hide"}`}>
               {this.state.searching ? "Không có kết quả 🥴" : "Chưa có todo nào nè 😎"}
            </div>
            <TodoList
               onLoading={this.props.onLoading}
               onDeleteTodo={this.handleDeleteTodo}
               onToast={this.props.onToast}
               listTodo={this.state.listTodo}
               onLogout={this.props.onLogout}
            />
         </div>
      );
   }
}
