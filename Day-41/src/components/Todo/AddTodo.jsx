import React, { Component } from "react";
import { client } from "../../helper/client";

export class AddTodo extends Component {
   constructor(props) {
      super(props);
      this.state = {
         todo: "",
         isLogin: props.isLogin,
      };
   }

   handleSubmit = (e) => {
      e.preventDefault();
      const id = Date.now();
      const body = {
         todo: this.state.todo,
      };

      if (this.state.isLogin) {
         if (body.todo.length > 255) {
            this.props.onToast({ mess: "Todo chỉ chứa tối đa 255 kí tự", type: "warning", id });
            this.setState({
               todo: body.todo.slice(0, 255),
            });
            e.target.children[0].focus();
            return;
         } else if (body.todo.length < 2) {
            this.props.onToast({ mess: "Todo phải chứa ít nhất 2 kí tự", type: "warning", id });
            e.target.children[0].focus();
            return;
         }
         this.handleAddTodo(id, body, e);
      } else {
         if (body.todo.length > 255) {
            this.props.onToast({ mess: "Chỉ chứa email tối đa 255 kí tự", type: "warning", id });
            this.setState({
               todo: body.todo.slice(0, 255),
            });
            e.target.children[0].focus();
            return;
         } else if (body.todo.length < 3) {
            this.props.onToast({ mess: "Email phải chứa ít nhất 3 kí tự", type: "warning", id });
            e.target.children[0].focus();
            return;
         }
         this.handleLogin(id, body, e);
      }
      e.target.children[0].focus();
   };

   handleLogin = async (id, body) => {
      this.props.onLoading(true);
      try {
         const { res, data } = await client.get(`/api-key?email=${body.todo}`);

         if (!res.ok) {
            throw new Error(data.message);
         }

         this.setState({
            isLogin: true,
         });

         localStorage.setItem("userEmail", body.todo);
         localStorage.setItem("apiKey", data.data.apiKey);
         localStorage.setItem("name", body.todo.match(/^[^@]+/));
         this.props.onLogin();

         this.setState({
            todo: "",
         });
         this.props.onToast({ mess: `Xin chào ${body.todo.match(/^[^@]+/)} 👋😄`, type: "success", id });
      } catch (error) {
         this.props.onToast({ mess: error.message, type: "danger", id });
      }
      this.props.onLoading();
   };

   handleAddTodo = async (id, body) => {
      if (body.todo.length < 2) {
         this.props.onToast({ mess: "Todo cần có trên 2 kí tự", type: "warning", id });
         return;
      }
      this.props.onLoading(true);
      try {
         const { res, data } = await client.post(`/todos`, body);

         if (!res.ok) {
            throw new Error(data.message);
         }

         this.props.onAddTodo(data.data);

         this.setState({
            todo: "",
         });
         this.props.onToast({ mess: "Thêm todo thành công", type: "success", id });
      } catch (error) {
         console.error(error.message);
         this.props.onLogout({ mess: "Thêm todo thất bại", type: "danger", id });
      }
      this.props.onLoading();
   };

   handleInputTodo = (e) => {
      this.setState({
         todo: e.target.value,
      });
   };

   componentDidUpdate(prevProps) {
      if (this.props.isLogin !== prevProps.isLogin) {
         this.setState({
            isLogin: this.props.isLogin,
         });
      }
   }

   render() {
      const { isLogin } = this.state;
      return (
         <>
            <h1 className="todo-heading">
               {isLogin ? `Hi ${localStorage.getItem("name")}, bạn thật tuyệt 🥰` : "Chào mừng bạn đến với Todo 😀"}
            </h1>
            <form onSubmit={(e) => this.handleSubmit(e)} action="" method="post" className="form__add-todo">
               <input
                  onInput={(e) => this.handleInputTodo(e)}
                  className="add-todo"
                  type="text"
                  placeholder={isLogin ? "📌Thêm todo mới ha" : "Nhập email F8 của bạn nhé"}
                  value={this.state.todo}
               />
               <button className="btn__add-todo">
                  <span className="text">{isLogin ? "Thêm mới" : "Đăng nhập"}</span>
               </button>
            </form>
         </>
      );
   }
}

export default AddTodo;
