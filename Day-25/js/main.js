//Tạo các element
let carousel = document.querySelector(".carousel");
let carouselInner = carousel.querySelector(".carousel-inner");
let carouselItems = carouselInner.children;
let carouselImgs = carouselInner.querySelectorAll(".item img");
let carouselNavDot = carousel.querySelector(".carousel-dot");
let carouselBtnAddImg = carousel.querySelector(".carousel-btn-add-img");
let loader = carousel.querySelector(".loader");

let carouselNextBtn = carousel.querySelector(".carousel-nav .next");
let carouselPrevBtn = carousel.querySelector(".carousel-nav .prev");

let carouselRadio = `<label>
<input type="radio" name="carousel-dot-radio" class="carousel-dot-radio" id="" />
</label>`;

//Tính kích thước 1 item
let itemWidth = carouselInner.clientWidth; //Lấy kích thước chiều rộng của 1 element

//Tính tổng kích thước các item
let totalWidth = carouselItems.length * itemWidth;

//Cập nhật css
carouselInner.style.width = `${totalWidth}px`;

// Tạo dots
Array.from(carouselItems).forEach((element, index) => {
   carouselNavDot.insertAdjacentHTML("beforeend", carouselRadio);

   // Gán sự kiện cho dot khi click
   let dot = carouselNavDot.lastElementChild;
   dot.addEventListener("click", function () {
      carouselInner.style.translate = `${-(index * itemWidth)}px`;
   });
});

let carouselDots = carouselNavDot.querySelectorAll(".carousel-dot-radio");

// Active dot đầu tiên
carouselDots[0].checked = true;

// Active dot
function activeDot(order) {
   let dotActive = Array.from(carouselDots).findIndex(
      (element) => element.checked
   );

   let activeNewDot = carouselDots[dotActive + order];
   activeNewDot && activeNewDot.click();
   return activeNewDot;
}

//Lắng nghe sự kiện của nút next
carouselNextBtn.addEventListener("click", () => {
   activeDot(1);
});

//Lắng nghe sự kiện của nút prev
carouselPrevBtn.addEventListener("click", () => {
   activeDot(-1);
});

/* ========================= Drag ========================= */
let limitDrag = itemWidth * 0.1;

let initX;
let slid;

function resetInitX() {
   document.addEventListener(
      "mousemove",
      (e) => {
         initX = e.clientX;
      },
      { once: true }
   );
}

let handleDrag = function (e) {
   let distanceToX = e.clientX - initX;
   let rangeDragX = Math.abs(distanceToX);
   let slideTo = distanceToX > 0 ? -1 /** prev */ : 1; /** next */
   if (rangeDragX < limitDrag) {
      carouselInner.style.left = `${distanceToX}px`;
   } else if (!slid && activeDot(slideTo)) {
      // Chuyển ảnh khi rangeDragX >= limitDrag
      slid = true;
      Object.assign(carouselInner.style, {
         left: `0`,
         transition: "translate 0.4s, left 0.3s",
      });

      setTimeout(() => {
         carouselInner.style.transition = "translate 0.4s"; // Tắt transition left sau khi slide
         resetInitX();
         //Sau khi slide, reset initX để không bị giật ảnh khi vẫn còn giữ và di chuyển chuột
      }, 400);
   }
};

// Vô hiệu hoá tính năng kéo mặc định của ảnh
carouselImgs.forEach((img) => {
   img.draggable = false;
});

// Drag Start
carouselInner.addEventListener("mousedown", function (e) {
   initX = e.clientX;
   Object.assign(this.style, {
      cursor: "move",
      transition: "translate 0.4s", // Tắt transition left khi kéo
   });

   document.addEventListener("mousemove", handleDrag);
});

// Drag End
document.addEventListener("mouseup", function () {
   document.removeEventListener("mousemove", handleDrag);
   Object.assign(carouselInner.style, {
      transition: "translate 0.4s, left 0.3s", // Bật lại transition left khi nhả chuột
      left: `0`,
      cursor: "default",
   });

   slid = false;
});

/* ========================= Add photo to carousel ========================= */
let numRandomPhoto = 4;
carouselBtnAddImg.addEventListener("click", function () {
   if (numRandomPhoto > 7) return;
   // Tạo một đối tượng Image mới
   let img = new Image();
   img.alt = "";
   img.draggable = false;

   // Sự kiện onload sẽ được gọi khi ảnh đã được tải xong
   img.onload = function () {
      loader.style.display = "none";
      // Tạo div chứa ảnh
      let itemCarousel = document.createElement("div");
      itemCarousel.className = "item";
      itemCarousel.appendChild(img);

      // Thêm ảnh vào carousel
      carouselInner.insertAdjacentElement("beforeend", itemCarousel);

      // Cập nhật kích thước của carousel
      totalWidth += itemWidth;
      carouselInner.style.width = `${totalWidth}px`;

      // Cập nhật danh sách các ảnh và dot
      carouselItems = carouselInner.children;
      carouselNavDot.insertAdjacentHTML("beforeend", carouselRadio);
      let dot = carouselNavDot.lastElementChild;
      let index = carouselItems.length - 1;
      dot.addEventListener("click", function () {
         carouselInner.style.translate = `${-(index * itemWidth)}px`;
      });
      carouselDots = carouselNavDot.querySelectorAll(".carousel-dot-radio");
   };

   // Bắt đầu tải ảnh
   img.src = `https://picsum.photos/1600/500?random=${numRandomPhoto}`;
   loader.style.display = "block";
   numRandomPhoto++;
});
