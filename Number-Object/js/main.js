function validateNum(args) {
   if (!args.length) throw new Error();
   let mess = args.length > 1 ? "Các tham" : "Tham";
   if (
      !args.every(
         (value) => Number.isFinite(+value) && Number.parseFloat(value)
      )
   ) {
      throw new Error(`${mess} số truyền vào phải là số hữu hạn`);
   }
}

function validateCurrency(value, currency) {
   if (!(Number.isFinite(+value) && Number.parseFloat(value))) {
      throw new Error("Giá trị cần lấy đơn vị tiền tệ phải là 1 số hữu hạn");
   }
   if (typeof currency !== "string") {
      throw new Error("Vui lòng nhập đơn vị tiền tệ dạng chuỗi.");
   }
}

// -------------------------------- Bài 1 -----------------------------------------------
console.log("# Bài 1");
function sum(...args) {
   console.log("Input:", ...args);
   // Log error
   try {
      validateNum(args);
   } catch (error) {
      return error.message;
   }

   // Handle
   return args.reduce((prev, next) => +prev + +next);
}

console.log("Output:", sum(1, 2, 3));

// -------------------------------- Bài 2 -----------------------------------------------
console.log("\n# Bài 2");
Number.prototype.getCurrency = function (currency = "$") {
   // Log Error
   try {
      validateCurrency(this, currency);
   } catch (error) {
      return error.message;
   }

   // Handle
   // num = this.toString().split("");
   // for (let i = num.length - 3; i > 0; i -= 3) {
   //    num.splice(i, 0, ",");
   // }
   return `${(+this).toLocaleString()} ${currency}`;
};

String.prototype.getCurrency = Number.prototype.getCurrency;

var money = "25360000";
console.log("Input:", money);
console.log("Output:", money.getCurrency("₫"));

// -------------------------------- Bài 3 -----------------------------------------------
console.log("\n# Bài 3");
Array.prototype.push2 = function (...args) {
   for (let value of args) {
      this[this.length] = value;
   }
   return this.length;
};

// --------- Test ---------
var arr1 = ["a", 0];
console.log("arr1:", arr1);
console.log("arr1.push([]):", arr1.push([]));
console.log("arr1:", arr1);

console.log("\n");

var arr2 = ["a", 0];
console.log("arr2:", arr2);
console.log("arr2.push2([]):", arr2.push2([]));
console.log("arr2:", arr2);

// -------------------------------- Bài 4 -----------------------------------------------
console.log("\n# Bài 4");
Array.prototype.filter2 = function (callback) {
   let result = [];
   for (let i in this) {
      if (callback(this[i], i, this)) {
         result[result.length] = this[i];
      }
   }
   return result;
};

// --------- Test ---------
var arr = [1, 2, 3, 4, 5, 6, 7];
console.log("arr:", arr);
console.log(
   "arr.filter((value) => value > 3):",
   arr.filter((value) => value > 3)
);

console.log("\n");

console.log("arr:", arr);
console.log(
   "arr.filter2((value) => value > 3):",
   arr.filter2((value) => value > 3)
);

// -------------------------------- Bài 5 -----------------------------------------------
console.log("\n# Bài 5");
var categories = [
   {
      id: 1,
      name: "Chuyên mục 1",
   },
   {
      id: 2,
      name: "Chuyên mục 2",
      children: [
         {
            id: 4,
            name: "Chuyên mục 2.1",
         },
         {
            id: 5,
            name: "Chuyên mục 2.2",
            children: [
               {
                  id: 10,
                  name: "Chuyên mục 2.2.1",
               },
               {
                  id: 11,
                  name: "Chuyên mục 2.2.2",
               },
               {
                  id: 12,
                  name: "Chuyên mục 2.2.3",
               },
            ],
         },
         {
            id: 6,
            name: "Chuyên mục 2.3",
         },
      ],
   },
   {
      id: 3,
      name: "Chuyên mục 3",
      children: [
         {
            id: 7,
            name: "Chuyên mục 3.1",
         },
         {
            id: 8,
            name: "Chuyên mục 3.2",
         },
         {
            id: 9,
            name: "Chuyên mục 3.3",
         },
      ],
   },
];

// Handle
var categoriesName = [];

function pushName(arr, signLevel) {
   arr.forEach((obj) => {
      categoriesName.push(signLevel + obj.name);
      if (obj.children) {
         pushName(obj.children, signLevel + signLevel);
      }
   });
}

categories.forEach((obj) => {
   categoriesName.push(obj.name);
   if (obj.children) {
      pushName(obj.children, "--|");
   }
});

var form = document.querySelector(".form");
form.innerHTML = `<select name="" id="" class="form__select">
   <option value="">Chọn chuyên mục</option>
   ${categoriesName
      .map(
         (value) =>
            `<option value="${value.slice(
               value.lastIndexOf(" ") + 1
            )}">${value}</option>`
      )
      .join("")}
</select>`;
