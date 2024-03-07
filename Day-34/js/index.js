const todo = document.querySelector(".todo");
const header = todo.querySelector(".header");
const wrapSearch = header.querySelector(".wrap__search");
const search = header.querySelector(".heading__search");
const btnAddTodo = header.querySelector(".btn-add-todo");
const main = todo.querySelector("main");
const todoUndone = main.querySelector(".todo-undone");
const todoDone = main.querySelector(".todo-done");
const btnShowTodoDone = main.querySelector(".btn__show-todo-done");
const todoModal = todo.querySelector(".todo-modal");
const todoModalOverlay = todoModal.querySelector(".todo-modal__overlay");
const todoModelForm = todoModal.querySelector(".todo-modal__form");
const todoModelInput = todoModal.querySelector(".todo-modal__input");
const btnSaveTodo = todoModal.querySelector(".btn__save-todo");
const btnCancel = todoModal.querySelector(".btn__cancel-todo");
const loader = document.querySelector(".loader");
const loaderInner = loader.querySelector(".loader-inner");

let todoEditing = "";

/* ========================= Server ========================= */
let requestQueue = Promise.resolve();

const enqueueRequest = (request) => {
   requestQueue = requestQueue.then(() => request());
};

const postTodoItem = async (id, value, status) => {
   enqueueRequest(() => {
      return fetch(`https://5rrz83-8080.csb.app/todos`, {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ id: id, value: value, status: status }),
      });
   });
};

const patchEditTodoItem = async (id, value) => {
   enqueueRequest(() => {
      return fetch(`https://5rrz83-8080.csb.app/todos/${id}`, {
         method: "PATCH",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ value: value }),
      });
   });
};

const patchDoneTodoItem = async (id, status) => {
   enqueueRequest(() => {
      return fetch(`https://5rrz83-8080.csb.app/todos/${id}`, {
         method: "PATCH",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ status: status }),
      });
   });
};

const deleteTodoItem = (id) => {
   enqueueRequest(() => {
      return fetch(`https://5rrz83-8080.csb.app/todos/${id}`, {
         method: "DELETE",
      });
   });
};

/* ========================= Num Todo Done ========================= */
const numTodoDone = document.createTextNode(`${todoDone.children.length}`);
btnShowTodoDone.insertBefore(numTodoDone, btnShowTodoDone.lastElementChild);

btnShowTodoDone.addEventListener("click", function () {
   this.classList.toggle("show");
   todoDone.classList.toggle("hide");
});

/* ========================= Search ========================= */
wrapSearch.addEventListener("click", function () {
   search.focus();
});

search.addEventListener("input", function () {
   const todoItems = main.querySelectorAll(".todo-item");
   todoItems.forEach((item) => {
      const value = item.querySelector(".todo-item__content").innerText;
      if (!value.includes(this.value)) {
         item.style.display = "none";
         return;
      }

      if (item.style.display === "none") {
         item.style.display = "flex";
      }
   });
});

/* ========================= Func ========================= */

// Func Todo Modal
const handleHideTodoModal = () => {
   todoModal.classList.add("hide");
   setTimeout(() => {
      todoModelInput.value = "";
   }, 300);
};

const handleShowTodoModal = () => {
   todoModal.classList.remove("hide");

   // focus vào input khi đã hiện modal
   todoModal.addEventListener("transitionend", function focusInput() {
      todoModelInput.focus();
      // Đặt con trỏ vào cuối input
      todoModelInput.setSelectionRange(
         todoModelInput.value.length,
         todoModelInput.value.length
      );
      // Xóa listener sau khi đã focus để tránh việc focus lại mỗi khi có transition
      todoModal.removeEventListener("transitionend", focusInput);
   });
};

// Func Add Todo Item
const setEvenBtnsTodoItem = (todoItem) => {
   const todoItemContent = todoItem.querySelector(".todo-item__content");
   const btnDel = todoItem.querySelector(".btn-del");
   const btnEdit = todoItem.querySelector(".btn-edit");
   const btnStatus = todoItem.querySelector(".btn-status");

   btnDel.addEventListener("click", function () {
      todoItem.remove();
      if (numTodoDone.data !== todoDone.children.length) {
         numTodoDone.data = todoDone.children.length;
      }
      deleteTodoItem(todoItem.index);
   });

   btnEdit.addEventListener("click", function () {
      todoModelInput.value = todoItemContent.innerText;
      todoEditing = todoItem;
      handleShowTodoModal();
   });

   btnStatus.addEventListener("click", function () {
      const isDone = this.classList.contains("done");
      const newParent = isDone ? todoUndone : todoDone;
      this.classList.toggle("done");
      todoItem.remove();

      if (!newParent.children.length) {
         newParent.append(todoItem);
      }

      Array.from(newParent.children).find((item, index) => {
         if (item.index > todoItem.index) {
            newParent.insertBefore(todoItem, item);
            return true;
         } else if (index === newParent.children.length - 1) {
            newParent.append(todoItem);
         }
      });

      numTodoDone.data = todoDone.children.length;

      patchDoneTodoItem(todoItem.index, isDone ? "" : "done");
   });
};

const handleAddTodo = (id, valueAddTodo, status = "") => {
   if (!valueAddTodo) {
      valueAddTodo = todoModelInput.value;
   }

   const todoParent = status ? todoDone : todoUndone;

   if (valueAddTodo) {
      const contentTodo = document.createTextNode(`${valueAddTodo}`);

      const todoItem = document.createElement("div");
      const todoItemContent = document.createElement("p");

      todoItem.classList.add("todo-item");
      todoItemContent.classList.add("todo-item__content");

      todoItem.append(todoItemContent);
      todoItemContent.append(contentTodo);

      const buttons = `<button class="btn-del btn-danger"><i class="fa-regular fa-trash-can"></i></button>
         <button class="btn-edit btn-primary"><i class="fa-regular fa-pen-to-square"></i></button>
         <button class="btn-status ${status}"><i class="fa-regular fa-check-to-slot"></i></button>`;

      todoItem.insertAdjacentHTML("beforeend", buttons);

      todoParent.append(todoItem);

      todoItem.index = id || Date.now();

      setEvenBtnsTodoItem(todoItem);

      !id && postTodoItem(todoItem.index, valueAddTodo, "");
   }
};

// Edit Todo
const handleEditTodo = () => {
   const todoItemContent = todoEditing.querySelector(".todo-item__content");
   if (todoItemContent.childNodes[0].data === todoModelInput.value) return;

   todoItemContent.childNodes[0].data = todoModelInput.value;

   patchEditTodoItem(todoEditing.index, todoModelInput.value);
};

/* ========================= Event Todo Modal ========================= */

btnAddTodo.addEventListener("click", function () {
   handleShowTodoModal();
   todoEditing = "";
});

todoModelForm.addEventListener("submit", function (e) {
   e.preventDefault();

   if (!todoModelInput.value.trim()) {
      todoModelInput.value = "";
      this.reportValidity();
      return;
   }

   if (todoEditing) {
      handleEditTodo();
   } else {
      handleAddTodo();
   }

   handleHideTodoModal();
});

btnCancel.addEventListener("click", function () {
   handleHideTodoModal();
});

todoModalOverlay.addEventListener("click", function () {
   handleHideTodoModal();
});

/* ========================= Get Todo Items ========================= */

(async () => {
   loader.classList.remove("hide");
   const res = await fetch(`https://5rrz83-8080.csb.app/todos`);
   const todoItems = await res.json();
   todoItems.forEach(({ id, value, status }) => {
      handleAddTodo(id, value, status);
   });
   numTodoDone.data = todoDone.children.length;

   loader.classList.add("hide");
})();
