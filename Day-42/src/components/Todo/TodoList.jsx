import TodoItem from "./TodoItem";
import { Component } from "react";

export default class TodoList extends Component {
   constructor(props) {
      super(props);
      this.state = {
         listTodo: props.listTodo,
      };
   }

   componentDidUpdate(prevProps) {
      if (this.props.listTodo !== prevProps.listTodo) {
         this.setState({
            listTodo: this.props.listTodo,
         });
      }
   }

   render() {
      return (
         <ul className="todo-list">
            {this.state.listTodo?.map((item, index) => (
               <TodoItem
                  key={item._id}
                  onDeleteTodo={this.props.onDeleteTodo}
                  onLoading={this.props.onLoading}
                  onToast={this.props.onToast}
                  onLogout={this.props.onLogout}
                  index={index}
                  {...item}
               />
            ))}
         </ul>
      );
   }
}
