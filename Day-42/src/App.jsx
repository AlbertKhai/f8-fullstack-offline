import Loading from "./components/Loading";
import Toasts from "./components/Toast/Toasts";
import Todo from "./components/Todo/Todo";
import { client } from "./helper/client";

import React, { Component } from "react";

export default class App extends Component {
   constructor(props) {
      super(props);
      this.state = {
         isLoading: false,
         isLogin: this.setApiKey(),
         toast: {},
      };
   }

   setApiKey = () => {
      let apiKey = localStorage.getItem("apiKey");
      if (!apiKey) {
         return false;
      }

      client.setApIKey(apiKey);
      return true;
   };

   handleLogin = () => {
      this.setState({
         isLogin: this.setApiKey(),
      });
   };

   handleLogout = (toast) => {
      localStorage.removeItem("apiKey");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("name");

      if (toast) {
         this.setState({
            isLogin: false,
            toast,
         });
      }

      setTimeout(() => {
         this.setState({
            isLogin: false,
            toast: { mess: "Bạn vui lòng đăng nhập lại", type: "danger", id: Date.now() },
         });
      }, 100);
   };

   handleLoading = (isLoading = false) => {
      this.setState({
         isLoading,
      });
   };

   handleToast = (toast) => {
      this.setState({
         toast,
      });
   };

   render() {
      return (
         <div className="todo">
            <Todo
               isLogin={this.state.isLogin}
               onLogin={this.handleLogin}
               onLogout={this.handleLogout}
               onLoading={this.handleLoading}
               onToast={this.handleToast}
            />
            <Loading isLoading={this.state.isLoading} />
            <Toasts toast={this.state.toast} onToast={this.handleToast} />
         </div>
      );
   }
}
