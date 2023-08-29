function areNaN(args) {
   if (!args.every((value) => value !== null && Number.isFinite(+value))) {
      throw new Error("Các tham số truyền vào phải là số hữu hạn");
   }
}

function validateCurrency(value, currency) {
   if (!Number.isFinite(+value) || !+value) {
      throw new Error("Giá trị cần lấy đơn vị tiền tệ phải là 1 số hữu hạn");
   } else if (typeof currency !== "string") {
      throw new Error("Vui lòng nhập đơn vị tiền tệ dạng chuỗi.");
   }
}

// -------------------------------- Bài 1 -----------------------------------------------
console.log("# Bài 1");
function sum(...args) {
   console.log("Input:", ...args);
   // Log error
   try {
      areNaN(args);
   } catch (error) {
      return error.message;
   }
   // Handle
   return args.reduce((prev, next) => +prev + +next);
}

console.log("Output:", sum(1, "2", 3));

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
   num = this.toString().split("");
   for (let i = num.length - 3; i > 0; i -= 3) {
      num.splice(i, 0, ",");
   }
   return `${num.join("")} ${currency}`;
};

String.prototype.getCurrency = Number.prototype.getCurrency;

var money = "25360000";
console.log("Input:", money);
console.log("Output:", money.getCurrency("₫"));

// -------------------------------- Bài 3 -----------------------------------------------
console.log("\n# Bài 3");
var array = [
   {
      id: 1,
      name: "Chuyên mục 1",
      parent: 0,
   },
   {
      id: 2,
      name: "Chuyên mục 2",
      parent: 0,
   },
   {
      id: 3,
      name: "Chuyên mục 3",
      parent: 0,
   },
   {
      id: 4,
      name: "Chuyên mục 2.1",
      parent: 2,
   },
   {
      id: 5,
      name: "Chuyên mục 2.2",
      parent: 2,
   },
   {
      id: 6,
      name: "Chuyên mục 2.3",
      parent: 2,
   },
   {
      id: 7,
      name: "Chuyên mục 3.1",
      parent: 3,
   },
   {
      id: 8,
      name: "Chuyên mục 3.2",
      parent: 3,
   },
   {
      id: 9,
      name: "Chuyên mục 3.3",
      parent: 3,
   },
   {
      id: 10,
      name: "Chuyên mục 2.2.1",
      parent: 5,
   },
   {
      id: 11,
      name: "Chuyên mục 2.2.2",
      parent: 5,
   },
   {
      id: 12,
      name: "Chuyên mục 2.2.3",
      parent: 5,
   },
];

function validateArr(arr) {
   if (!Array.isArray(arr)) {
      throw new Error("Tham số truyền vào phải là mảng");
   } else if (arr.length === 0) {
      throw new Error("Tham số mảng truyền vào chưa có phần tử");
   }
   if (
      arr.every(
         (value) =>
            !isNaN(+value.id) &&
            !isNaN(+value.parent) &&
            value.name &&
            typeof value.id === "number" &&
            typeof value.parent === "number" &&
            value.name === "string"
      )
   ) {
      throw new Error("Phần tử trong mảng có dữ liệu chưa hợp lệ");
   }
}

function nestArray(arr) {
   try {
      validateArr(arr);
   } catch (error) {
      return error.message;
   }

   arr = [...arr.sort((a, b) => a.parent - b.parent)];
   let end = () => arr.length - 1;
   let max = () => arr[end()].parent;
   while (arr[end()].parent > 0) {
      let maxParent = max();
      let lastIndex = end();
      let parent = arr[maxParent - 1];
      if (!parent) {
         arr.splice(lastIndex, 1);
         continue;
      }
      parent.children = [];
      for (let i = lastIndex; i >= 0; i--) {
         if (arr[i].parent === maxParent) {
            delete arr[i].parent;
            parent.children.unshift(...arr.splice(i, 1));
         }
      }
      parent.children = parent.children.sort((a, b) => a.id - b.id);
   }
   arr.forEach((element) =>
      element.parent === 0 ? delete element.parent : ""
   );
   return arr;
}
console.log(nestArray(array));

// -------------------------------- Bài 4 -----------------------------------------------
console.log("\n# Bài 4");
Array.prototype.reduce2 = function (callback, result) {
   let i = 1;
   result ? (i = 0) : (result = this[0]);
   for (i; i < this.length; i++) {
      result = callback(result, this[i], i, this);
   }
   return result;
};

// --------- Test 1 ---------
console.log("--- Test 1: Tìm phần tử khác nhau giữa 2 mảng");
var arr1 = [5, 2, 1, 9, 8];
var arr2 = [2, 1, 8, 3];
// Kết quả: [5, 9]

// Reduce Original
var reduce = arr1.reduce(function (prev, current) {
   if (!arr2.includes(current)) {
      prev.push(current);
   }
   return prev;
}, []);
console.log("reduce:", reduce);

// Reduce 2
var reduce2 = arr1.reduce(function (prev, current) {
   if (!arr2.includes(current)) {
      prev.push(current);
   }
   return prev;
}, []);
console.log("reduce 2:", reduce2);

// --------- Test 2 ---------
console.log("--- Test 2: Tìm max");
var numbers = [5, 2, 1, 9, 8]; // Kết quả: 9

// Reduce Original
var reduce = numbers.reduce(function (prev, current) {
   return prev < current ? current : prev;
});
console.log("reduce:", reduce);

// Reduce 2
var reduce2 = numbers.reduce(function (prev, current) {
   return prev < current ? current : prev;
});
console.log("reduce 2:", reduce2);
