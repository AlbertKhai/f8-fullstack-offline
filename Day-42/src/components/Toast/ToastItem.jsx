import React, { Component } from "react";

export default class ToastItem extends Component {
   constructor(props) {
      super(props);
      this.state = {
         hide: true,
      };
   }

   handleToast = (id, e) => {
      e?.stopPropagation();
      clearTimeout(this.timeoutId);
      this.setState({
         hide: true,
      });
      setTimeout(() => {
         this.props.onToast({ id, isClose: true });
      }, 500);
   };

   componentDidMount = () => {
      setTimeout(() => {
         this.setState({
            hide: false,
         });
      }, 100);

      const time = this.props.toast.confirmDeleteTodo ? 6000 : 3000;

      this.timeoutId = setTimeout(() => {
         this.setState({
            hide: true,
         });

         setTimeout(() => {
            this.props.onToast({ id: this.props.toast.id, isClose: true });
         }, 500);
      }, time);
   };

   handleDeleteTodo = () => {
      const { id, confirmDeleteTodo: del } = this.props.toast;
      del && del();
      this.handleToast(id);
   };

   render() {
      const { mess, type, id } = this.props.toast;
      return (
         <div
            onClick={() => {
               this.handleDeleteTodo();
            }}
            className={`toast ${type} ${this.state.hide ? "hide" : ""}`}
         >
            <h3>{mess}</h3>
            <button onClick={(e) => this.handleToast(id, e)} className="close">
               <i className="fa-solid fa-xmark"></i>
            </button>
         </div>
      );
   }
}
