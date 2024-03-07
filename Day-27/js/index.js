function validateCurrency(value) {
   if (!(Number.isFinite(+value) && Number.parseFloat(value))) {
      throw new Error("Tham số truyền vào phải là 1 số hữu hạn");
   }
}

Number.prototype.getCurrency = function () {
   try {
      validateCurrency(this);
   } catch (error) {
      return error.message;
   }

   return (+this).toLocaleString();
};

String.prototype.getCurrency = Number.prototype.getCurrency;

let products = [
   {
      id: 1,
      name: `[Mã SGBAU30 giảm đến 30K đơn 99K] Bikini Đi Biển Athena 3 Mảnh Có Khăn Quấn Siêu Quyến Rũ Cho Nữ`,
      path: `./assets/imgs/product-1.jpg`,
      price: 150000,
   },
   {
      id: 2,
      name: `Set đồ bơi bikini U GONNA S hai mảnh không tay co giãn có miếng đệm ngực màu trơn thời trang Hàn Quốc 2023 quyến rũ`,
      path: `./assets/imgs/product-2.jpg`,
      price: 200000,
   },
   {
      id: 3,
      name: `Bikini set 4 chi tiết LUHAZO áo bra 2 dây quần tam giác kèm áo lưới dài tay hottrend và khăn quấn thời trang 156 H-3.1`,
      path: `./assets/imgs/product-3.jpg`,
      price: 250000,
   },
   {
      id: 4,
      name: `Bikini liền thân đi biển nữ LUHAZO 1 mảnh khoét ngực hở eo sexy quyến rũ vải xốp xịn màu xanh cốm nổi bật 68141 D8T2`,
      path: `./assets/imgs/product-4.jpg`,
      price: 300000,
   },
   {
      id: 5,
      name: `Đồ bơi bikini 2 mảnh sexy 9 màu kèm feedback`,
      path: `./assets/imgs/product-5.jpg`,
      price: 350000,
   },
];

/* ========================= Add products ========================= */

let eleProduct = document.querySelector(".product");
let productListEle = eleProduct.querySelector(".product__list");

products.forEach((product, index) => {
   // Add product__item
   let tr = document.createElement("tr");
   tr.className = `product__item`;
   productListEle.append(tr);

   // Add product__order
   let productOrder = document.createElement("td");
   productOrder.className = "product__order";
   productOrder.append(++index);
   tr.append(productOrder);

   // Add product__img
   let productImg = document.createElement("img");
   productImg.className = "product__img";
   productImg.src = product.path;
   productImg.alt = product.name;

   let productThumb = document.createElement("figure");
   productThumb.className = "product__thumb";
   productThumb.append(productImg);

   let productImgWrap = document.createElement("td");
   productImgWrap.className = "product__img-wrap";
   productImgWrap.append(productThumb);
   tr.append(productImgWrap);

   // Add product__name
   let productNameLink = document.createElement("a");
   productNameLink.href = "#!";
   productNameLink.append(product.name);

   let productName = document.createElement("td");
   productName.className = "product__name";
   productName.append(productNameLink);
   tr.append(productName);

   // Add product__price
   let productPrice = document.createElement("td");
   productPrice.className = "product__price";
   productPrice.append(product.price.getCurrency());
   tr.append(productPrice);

   // Add product__action
   tr.innerHTML += `<td class="product__action">
   <div class="row">
      <div class="wrap__ctrl-quantity row">
         <input
            type="number"
            value="1"
            class="input__num"
         />
         <div class="ctrl-quantity__action">
            <button class="btn__increase">+</button>
            <button class="btn__decrease">-</button>
         </div>
      </div>
      <button class="btn-add-cart btn" id="${product.id}">
         <i class="fa-duotone fa-cart-shopping"></i>
      </button>
   </div>
   </td>`;
});

/* ========================= Handle click preview ========================= */
let allProductThumb = eleProduct.querySelectorAll(".product__thumb");
let preview = document.querySelector(".preview");
let previewInner = preview.querySelector(".preview__inner");
let previewOverlay = preview.querySelector(".preview__overlay");

allProductThumb.forEach((thumb) => {
   thumb.addEventListener("click", function () {
      let src = this.firstElementChild.src;
      let img = new Image();
      img.className = "preview__img";
      img.alt = "";
      img.onload = function () {
         previewInner.innerHTML = "";
         previewInner.append(img);
         preview.classList.toggle("show");
      };
      img.src = src.replace("/product-", "/big-product-");
   });
});

previewOverlay.addEventListener("click", function () {
   preview.classList.toggle("show");
});

/* ========================= Handle Ctrl Quantity ========================= */
let allBtnIncrease = eleProduct.querySelectorAll(".btn__increase");
let allBtnDecrease = eleProduct.querySelectorAll(".btn__decrease");

let handleClickCtrlQuantity = function () {
   let inputNum = this.parentNode.previousElementSibling;
   this.innerHTML === "+" ? inputNum.stepUp() : inputNum.stepDown();
};

allBtnIncrease.forEach((btn) => {
   btn.addEventListener("click", handleClickCtrlQuantity);
});

allBtnDecrease.forEach((btn) => {
   btn.addEventListener("click", handleClickCtrlQuantity);
});

/* ========================= Handle Ctrl Cart ========================= */

let allBtnAdd = eleProduct.querySelectorAll(".btn-add-cart");
let eleCart = document.querySelector(".cart");
let eleTable = eleCart.querySelector(".cart__table");
let eleCartList = eleCart.querySelector(".product__list");
let eleCartTotalQuantity = eleCart.querySelector(".cart__total-quantity");
let eleCartTotalPrice = eleCart.querySelector(".cart__total-price");
let eleCartAction = eleCart.querySelector(".cart__action");
let eleCartMess = eleCart.querySelector(".cart__mess");

let cartIdProducts = [];
let infoProductInCart = [];

let getPrice = function (id) {
   return products.find((product) => product.id === +id).price;
};

let calcTotalQuantity = function () {
   let result = 0;
   let inputsNum = eleCartList.querySelectorAll(".input__num");
   inputsNum.forEach((input) => {
      result += +input.value;
   });
   eleCartTotalQuantity.innerText = result;
};

let calcTotalPrice = function () {
   let result = 0;
   infoProductInCart.forEach((product) => {
      result += product.totalPrice;
   });
   result = result === 0 ? result : result.getCurrency();
   eleCartTotalPrice.innerText = result;
};

let calcProductPrice = function (id, productItem) {
   let quantityProduct = productItem.querySelector(".input__num").value;

   infoProductInCart.find((product, index) => {
      if (product.id === id) {
         product.quantity += quantityProduct > 0 ? +quantityProduct : 1;

         eleCartList.children[index].querySelector(".input__num").value =
            product.quantity;

         product.totalPrice = product.quantity * getPrice(id);

         eleCartList.children[index].querySelector(
            ".product__total-price"
         ).innerText = product.totalPrice.getCurrency();
      }
      return product.id === id;
   });
};

let calcPriceUpdateCart = function (productItem, index) {
   let quantityProduct = productItem.querySelector(".input__num").value;

   if (quantityProduct > 0) {
      let product = infoProductInCart[index];
      if (quantityProduct === product.quantity) return;
      product.quantity = +quantityProduct;
      product.totalPrice = product.quantity * getPrice(cartIdProducts[index]);
      productItem.querySelector(".product__total-price").innerText =
         product.totalPrice.getCurrency();
   } else {
      cartIdProducts.splice(index, 1);
      infoProductInCart.splice(index, 1);
      productItem.outerHTML = "";
      return index;
   }
};

let editCartOrder = function (positionEdit) {
   let productsInCart = eleCartList.querySelectorAll(".product__item");
   productsInCart.forEach((product, index) => {
      if (index >= positionEdit) {
         product.firstElementChild.innerText = ++index;
      }
   });
};

let handleClickDelProduct = function () {
   if (confirm("Đừng bỏ em, nỡ lòng nào 😭")) {
      let index = cartIdProducts.findIndex(
         (idProduct) => this.id === idProduct
      );
      eleCartList.children[index].classList.remove("show");
      cartIdProducts.splice(index, 1);
      infoProductInCart.splice(index, 1);
      eleCartList.children[index].outerHTML = "";

      if (!eleCartList.querySelector(".product__item")) {
         eleTable.classList.remove("show");
         eleCartAction.classList.remove("show");
         eleCartMess.classList.add("show");
      }

      editCartOrder(index);
      calcTotalPrice();
      calcTotalQuantity();
      alert("Ớ kìa😑");
   }
};

let pushProductInCart = function (id, productItem) {
   let quantityProduct = productItem.querySelector(".input__num").value;
   quantityProduct = quantityProduct > 0 ? +quantityProduct : 1;

   infoProductInCart.push({
      id: id,
      quantity: quantityProduct,
      totalPrice: getPrice(id) * quantityProduct,
   });

   // Add product__item
   let tr = document.createElement("tr");
   tr.className = `product__item`;

   // Add product info form productItem
   for (let i = 0; i <= 3; i++) {
      tr.innerHTML += productItem.childNodes[i].outerHTML;
   }

   // Update product__order in Cart
   tr.firstElementChild.innerHTML =
      1 + cartIdProducts.findIndex((value) => value === id);

   // Add product__action
   tr.innerHTML += `<td class="product__action">
      <div class="wrap__ctrl-quantity row">
         <input
            type="number"
            value="${quantityProduct}"
            class="input__num"
         />
         <div class="ctrl-quantity__action">
            <button class="btn__increase">+</button>
            <button class="btn__decrease">-</button>
         </div>
      </div>
   </td>
   <td class="product__total-price">
      ${(getPrice(id) * quantityProduct).getCurrency()}
   </td>
   <td class="product__action">
      <button class="btn__del-product btn" id="${id}">
         <i class="fa-duotone fa-trash"></i>
      </button>
   </td>`;

   eleCartList.append(tr);
   tr.classList.add("show");

   // Add even preview
   let productThumb = eleCartList.lastChild.querySelector(".product__thumb");

   productThumb.addEventListener("click", function () {
      let src = this.firstElementChild.src;
      let img = new Image();
      img.className = "preview__img";
      img.alt = "";
      img.src = src.replace("/product-", "/big-product-");
      img.onload = function () {
         previewInner.innerHTML = "";
         previewInner.append(img);
         preview.classList.toggle("show");
      };
   });

   // Add even btn
   let btnIncrease = eleCartList.lastChild.querySelector(".btn__increase");
   let btnDecrease = eleCartList.lastChild.querySelector(".btn__decrease");
   let btnDelProduct = eleCartList.lastChild.querySelector(".btn__del-product");

   btnIncrease.addEventListener("click", handleClickCtrlQuantity);
   btnDecrease.addEventListener("click", handleClickCtrlQuantity);
   btnDelProduct.addEventListener("click", handleClickDelProduct);

   calcTotalQuantity();
   calcTotalPrice();
};

// Add even btn add cart
allBtnAdd.forEach((btnAdd) => {
   btnAdd.addEventListener("click", function () {
      let productItem = this.closest(".product__item");

      if (!eleCartList.querySelector(".product__item")) {
         eleTable.classList.add("show");
         eleCartAction.classList.add("show");
         eleCartMess.classList.remove("show");
      }

      if (cartIdProducts.includes(this.id)) {
         calcProductPrice(this.id, productItem);
         calcTotalQuantity();
         calcTotalPrice();
      } else {
         cartIdProducts.push(this.id) &&
            pushProductInCart(this.id, productItem);
      }
   });
});

// Add even cart__btn-update
let cartBtnUpdate = eleCart.querySelector(".cart__btn-update");

cartBtnUpdate.addEventListener("click", function () {
   let productItemInCart = eleCartList.querySelectorAll(".product__item");
   let index;
   let i = productItemInCart.length - 1;
   for (i; i >= 0; i--) {
      let result = calcPriceUpdateCart(productItemInCart[i], i);
      if (result) {
         index = result;
      }
   }
   if (!eleCartList.querySelector(".product__item")) {
      eleTable.classList.remove("show");
      eleCartAction.classList.remove("show");
      eleCartMess.classList.add("show");
   }
   index && editCartOrder(index);
   calcTotalQuantity();
   calcTotalPrice();
   alert("Cập nhật cho rồi đó 😁");
});

// Add even cart__btn-del
let cartBtnDel = eleCart.querySelector(".cart__btn-del");
cartBtnDel.addEventListener("click", function () {
   if (confirm("Không mua nữa à 😟")) {
      eleTable.classList.remove("show");
      eleCartAction.classList.remove("show");
      eleCartMess.classList.add("show");
      eleCartList.innerHTML = "";
      cartIdProducts.length = 0;
      infoProductInCart.length = 0;
      calcTotalPrice();
      calcTotalQuantity();
      alert("Giải tán 😶");
   }
});
