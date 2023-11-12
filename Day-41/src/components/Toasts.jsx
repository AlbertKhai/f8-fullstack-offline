import React, { Component } from "react";
import ToastList from "./Toast/ToastList";

export default class Toasts extends Component {
   constructor(props) {
      super(props);
      this.state = {
         toasts: [],
      };
      this.prevToast = props.toast;
   }

   componentDidUpdate() {
      if (this.props.toast?.id !== this.prevToast?.id) {
         this.handleToast(this.props.toast);
         this.prevToast = this.props.toast;
      }
   }

   handleToast = ({ mess, type, id, isClose = false, confirmDeleteTodo }) => {
      if (isClose) {
         this.setState({
            toasts: this.state.toasts.filter((item) => item.id !== id),
         });
         return;
      }

      type += "-toast";

      this.setState({
         toasts: [...this.state.toasts, { mess, type, id, confirmDeleteTodo }],
      });
   };

   render() {
      return <ToastList toasts={this.state.toasts} onToast={this.handleToast} />;
   }
}
