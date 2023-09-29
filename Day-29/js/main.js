let listEl = document.querySelector(".list");
let itemEls = listEl.querySelectorAll(".list-item");
let itemActiveEls = listEl.querySelectorAll(".active.list-item");
let itemNotActiveEls = listEl.querySelectorAll(".list-item:not(.active)");

let itemUnder;
let halfHeightItemUnder;
let nextItemUnder;
let itemDrag;
let movedUp = false;
let isDragItemActive;

/* ========================= Data-index ========================= */
itemActiveEls.forEach((item, index) => {
   item.dataset.index = index;
});

itemNotActiveEls.forEach((item, index) => {
   item.dataset.index = index;
});

/* ========================= Arrange ========================= */

let handleArrange = function () {
   let selector = isDragItemActive
      ? ".active.list-item"
      : ".list-item:not(.active)";
   let items = listEl.querySelectorAll(selector);
   let itemLabel = isDragItemActive ? "Module:" : "Bài:";

   items.forEach((item, index) => {
      if (+item.dataset.index !== index) {
         item.dataset.index = index;
         item.childNodes[0].nodeValue = `${itemLabel} ${index + 1}: `;
      }
   });
};

/* ========================= Handle Drag and Drop ========================= */

let handleDragOver = function (e) {
   if (e.offsetY < halfHeightItemUnder && !movedUp) {
      listEl.insertBefore(itemDrag, itemUnder);
      movedUp = true;
   } else if (movedUp) {
      listEl.insertBefore(itemDrag, nextItemUnder);
      movedUp = false;
   }
};

let handleDragStart = function (e) {
   itemDrag = this;
   itemDrag.classList.add("ghost");
   isDragItemActive = itemDrag.classList.contains("active") ? true : false;
};

let handleDragEnd = function (e) {
   this.classList.remove("ghost");
   itemUnder.removeEventListener("dragover", handleDragOver);
   handleArrange();
};

let handleDragEnter = function (e) {
   if (this === itemDrag) return;
   itemUnder = this;
   nextItemUnder = this.nextElementSibling;

   if (nextItemUnder === itemDrag) {
      nextItemUnder = nextItemUnder.nextElementSibling;
   }

   halfHeightItemUnder = this.clientHeight / 2;
   itemUnder.addEventListener("dragover", handleDragOver);
};

let handleDragLeave = function (e) {
   if (this === itemDrag) return;
   itemUnder.removeEventListener("dragover", handleDragOver);
};

/* ========================= Set Even ========================= */

listEl.addEventListener("dragover", function (e) {
   e.preventDefault();
});

itemEls.forEach((item) => {
   item.addEventListener("dragstart", handleDragStart);

   item.addEventListener("dragend", handleDragEnd);

   item.addEventListener("dragenter", handleDragEnter);

   item.addEventListener("dragleave", handleDragLeave);
});
