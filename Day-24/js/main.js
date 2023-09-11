const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const todoWrap = $(".todo-wrap");
const todoFormAdd = $(".todo__form--add");
const todoInputAdd = $(".todo__form--add .todo__input");
const todoEditButtons = $$(".todo__btn-edit");
const todoRemoveButtons = $$(".todo__btn-remove");

const actionBtn = `<span class="todo__action-btn-wrap">
<button
   title="button edit todo"
   type="button"
   class="todo__btn-edit"
>
   <i class="fa-solid fa-pen-to-square"></i>
</button>
<button
   title="button remove todo"
   type="button"
   class="todo__btn-remove"
>
   <i class="fa-solid fa-trash"></i>
</button>
</span>`;

function updateTodo(todoUpdate, todoBox) {
   const todoBoxInput = todoBox.querySelector(".todo__content");
   todoBoxInput.innerText = todoUpdate.querySelector(".todo__input").value;
   todoUpdate.replaceWith(todoBox);
}

function createTodoUpdate(todoBox, textContent) {
   const todoFormUpdate = document.createElement("form");
   todoFormUpdate.classList.add("todo__form", "todo__form--update");
   todoFormUpdate.innerHTML = `<div class="todo__row">
         <input
            type="text"
            class="todo__input"
            placeholder="Update task"
            value=""
         />
         <button
            type="submit"
            title="button update todo"
            class="todo__btn-add"
         >
            Add Task
         </button>
      </div>`;

   todoFormUpdate.querySelector(".todo__input").value = textContent;
   todoFormUpdate.addEventListener("submit", function (e) {
      e.preventDefault();
      updateTodo(todoFormUpdate, todoBox);
   });
   todoBox.replaceWith(todoFormUpdate);
}

function addEvenRemoveBtn(btn) {
   btn.addEventListener("click", function () {
      this.closest(".todo-box").remove();
   });
}

function addEvenEditBtn(btn) {
   btn.addEventListener("click", function () {
      const todoBox = this.closest(".todo-box");
      const todoContent = todoBox.querySelector(".todo__content").innerText;
      console.log(todoContent);
      createTodoUpdate(todoBox, todoContent);
   });
}

function createTodo(textNode) {
   const nodeTodo = document.createElement("div");
   const nodeP = document.createElement("p");
   const textNodeP = document.createTextNode(textNode);

   nodeTodo.classList.add("todo-box");
   nodeP.classList.add("todo__content");

   nodeTodo.appendChild(nodeP);
   nodeP.appendChild(textNodeP);
   nodeP.insertAdjacentHTML("afterend", actionBtn);
   todoWrap.appendChild(nodeTodo);

   addEvenRemoveBtn(nodeTodo.querySelector(".todo__btn-remove"));
   addEvenEditBtn(nodeTodo.querySelector(".todo__btn-edit"));
}

todoFormAdd.addEventListener("submit", function (e) {
   e.preventDefault();
   if (todoInputAdd.value) {
      createTodo(todoInputAdd.value);
      todoInputAdd.value = "";
   }
});

todoRemoveButtons.forEach((removeBtn) => {
   addEvenRemoveBtn(removeBtn);
});

todoEditButtons.forEach((editBtn) => {
   addEvenEditBtn(editBtn);
});
