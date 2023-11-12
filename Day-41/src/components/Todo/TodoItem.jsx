import React, { Component } from "react";
import { client } from "../../helper/client";

export default class TodoItem extends Component {
   constructor(props) {
      super(props);
      this.state = {
         todo: props,
         isEdit: true,
      };

      this.prevTodo = props;
   }

   handleAction = async (action, e) => {
      let todo = { ...this.state.todo };
      let isEdit = this.state.isEdit;
      let backPrevState = false;
      const id = Date.now();
      switch (action) {
         case "input":
            todo.todo = e.target.value;
            if (todo.todo.length > 255) {
               this.props.onToast({ mess: "Todo chỉ chứa tối đa 255 kí tự", type: "warning", id });
               todo.todo = todo.todo.slice(0, 255);
            }
            break;

         case "done":
            todo.isCompleted = !todo.isCompleted;
            break;

         case "delete":
            {
               this.props.onToast({
                  mess: `Bạn có chắc chắn muốn xoá todo này không 🤔?\n Bấm vào đây để xoá`,
                  type: "warning",
                  id,
                  confirmDeleteTodo: this.handleDeleteTodo,
               });
            }

            break;

         case "exit":
            backPrevState = true;
            break;

         default:
            isEdit = !isEdit;
            break;
      }

      if (backPrevState) {
         todo = this.prevTodo;
         isEdit = !isEdit;
      }

      this.setState({
         todo,
         isEdit,
      });
   };

   handleSubmit = async (e) => {
      e.preventDefault();
      const id = Date.now();
      const isEdit = this.state.isEdit;
      const todo = { ...this.state.todo };

      if (todo.todo.trim().length < 2) {
         this.props.onToast({ mess: "Todo phải chứa ít nhất 2 kí tự", type: "warning", id });
         return;
      }

      try {
         this.props.onLoading(true);
         const body = {
            todo: todo.todo.trim(),
            isCompleted: todo.isCompleted,
         };

         const { res, data } = await client.patch(`/todos/${this.props._id}`, body);

         if (!res.ok) {
            throw new Error(data.data);
         }

         this.prevTodo = data.data;
         this.setState({ todo: data.data, isEdit: !isEdit });
         this.props.onToast({ mess: "Cập nhật todo thành công", type: "success", id });
      } catch (error) {
         this.setState({
            todo: this.prevTodo,
            isEdit: !isEdit,
         });
         console.error(error.message);
         this.props.onLogout({ mess: "Cập nhật todo thất bại", type: "danger", id });
      }

      this.props.onLoading();
   };

   handleDeleteTodo = async () => {
      const id = Date.now();
      this.props.onLoading(true);
      try {
         const { res, data } = await client.delete(`/todos/${this.props._id}`);
         if (!res.ok) {
            throw new Error(data.data);
         }
         this.props.onDeleteTodo(this.props._id);
         this.props.onToast({
            mess: "Xoá todo thành công",
            type: "success",
            id,
         });
      } catch (error) {
         console.error(error.message);
         this.props.onLogout({ mess: "Xoá todo thất bại", type: "danger", id });
      }

      this.props.onLoading();
   };

   render() {
      const { todo, isCompleted: done } = this.state.todo;
      const isEdit = this.state.isEdit;
      return (
         <li className="todo-item">
            <form action="" method="post" className="todo-item__inner" onSubmit={(e) => this.handleSubmit(e)}>
               <div className="wrap__todo-content">
                  <textarea
                     onInput={(e) => this.handleAction("input", e)}
                     className={`todo-content ${done ? "done" : ""}`}
                     readOnly={isEdit}
                     value={todo}
                     rows={3}
                     placeholder="Cập nhật todo, nhớ là phải chứa ít nhất 2 kí tự nhé 😜"
                  ></textarea>
               </div>
               <div className="action__todo-content">
                  <div className={`wrap__edit ${isEdit ? "" : "editing"}`}>
                     <div className="wrap__btn-edit">
                        <button type="button" onClick={() => this.handleAction()} className="btn-edit">
                           <span>Sửa</span>
                        </button>
                     </div>
                     <div className="wrap__action-edit">
                        <div className="wrap__todo-done">
                           <button
                              type="button"
                              onClick={() => this.handleAction("done")}
                              className={`todo-done ${done ? "done" : ""}`}
                           >
                              <span className="mark-done">✔</span>
                           </button>
                           <span className="todo-status">{done ? "Đã hoàn thành" : "Chưa hoàn thành"}</span>
                        </div>
                        <button className="btn-update">
                           <span>Cập nhật</span>
                        </button>
                        <button type="button" onClick={() => this.handleAction("exit")} className="btn-exit">
                           <span>Thoát</span>
                        </button>
                     </div>
                  </div>
                  <div className="wrap__btn-delete">
                     <button type="button" onClick={() => this.handleAction("delete")} className="btn-delete">
                        <span>Xoá</span>
                     </button>
                  </div>
               </div>
            </form>
         </li>
      );
   }
}
