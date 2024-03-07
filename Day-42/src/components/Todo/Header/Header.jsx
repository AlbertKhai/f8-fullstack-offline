import Login from "./Login";
import ActionTodo from "./ActionTodo";
const Header = (props) => {
   return (
      <header className="header">
         <h1 className="todo-heading">
            {props.isLogin ? `Hi ${localStorage.getItem("name")}, bạn thật tuyệt 🥰` : "Chào mừng bạn đến với Todo 😀"}
         </h1>
         <div className="wrap__action-todo-header">
            {props.isLogin ? (
               <>
                  <ActionTodo {...props} />
               </>
            ) : (
               <Login {...props} />
            )}
         </div>
      </header>
   );
};

export default Header;
