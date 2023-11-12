import AddTodo from "./Todo/AddTodo";
import TodoList from "./Todo/TodoList";
import React, { Component } from "react";
import { client } from "../helper/client";

export default class Todo extends Component {
   constructor(props) {
      super(props);
      this.state = {
         listTodo: [],
         isLogin: props.isLogin,
      };
   }

   getTodoList = async () => {
      try {
         this.props.onLoading(true);
         const { res, data } = await client.get("/todos");

         if (!res.ok) {
            throw new Error(data.message);
         }

         const { listTodo } = data.data;

         this.setState({
            listTodo,
         });
      } catch (error) {
         console.error("Lỗi: ", error.message);
         this.props.onLogout({ mess: "Lấy todo list thất bại", type: "danger", id: Date.now() });
      }
      this.props.onLoading();
   };

   handleAddTodo = (newTodo) => {
      this.setState({
         listTodo: [newTodo, ...this.state.listTodo],
      });
   };

   handleDeleteTodo = (id) => {
      this.setState({
         listTodo: this.state.listTodo.filter((item) => item._id !== id),
      });
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
            <AddTodo
               onLoading={this.props.onLoading}
               onAddTodo={this.handleAddTodo}
               onToast={this.props.onToast}
               onLogin={this.props.onLogin}
               onLogout={this.props.onLogout}
               isLogin={this.state.isLogin}
            />
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
