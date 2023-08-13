function updateTotalPrice() {
   var total = 0;
   document.querySelectorAll(".cart__item").forEach(function (item) {
      var quantity = item.querySelector(".cart__num-btn--preview").textContent;
      item.querySelector(".cart__product-num").textContent = quantity;

      var price = parseFloat(
         item.querySelector(".cart__product-price").textContent
      );
      total += price * parseInt(quantity);
   });
   document.querySelector(".cart__total-price strong").textContent =
      "$" + total.toFixed(2);
}

document.querySelectorAll(".cart__btn-del-product").forEach(function (button) {
   button.addEventListener("click", function () {
      var item = this.closest(".cart__item");
      item.classList.add("hide");

      setTimeout(function () {
         item.remove();

         var cartItems = document.querySelectorAll(".cart__item").length;
         document.querySelector(".cart__total-product").textContent = cartItems;

         updateTotalPrice();
      }, 500); // Remove the item after the transition is complete (0.5s)
   });
});

document.querySelectorAll(".cart__num-btn--down").forEach(function (button) {
   button.addEventListener("click", function () {
      var preview = this.parentNode.querySelector(".cart__num-btn--preview");
      var quantity = parseInt(preview.textContent);
      if (quantity > 1) {
         preview.textContent = quantity - 1;
      }
      updateTotalPrice();
   });
});

document.querySelectorAll(".cart__num-btn--up").forEach(function (button) {
   button.addEventListener("click", function () {
      var preview = this.parentNode.querySelector(".cart__num-btn--preview");
      var quantity = parseInt(preview.textContent);
      if (quantity < 99) {
         preview.textContent = quantity + 1;
      }
      updateTotalPrice();
   });
});
// Call updateTotalPrice at the beginning to initialize the total price
updateTotalPrice();
