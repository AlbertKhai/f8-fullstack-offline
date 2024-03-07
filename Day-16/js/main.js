function areNaN(...args) {
   return !args.every((arg) => Number.isFinite(Number(arg)));
}
var result;

// -------------------------------------------------------------------------------
console.log(`================= Bài 1: Hoán vị 2 số ================= `);

var a = 0;
var b = 7;

if (areNaN(a, b)) {
   result = "Không thể thực hiện, các giá trị phải cùng kiểu là số";
} else {
   console.log(`Trước khi hoán vị: a = ${a} | b = ${b}`);

   a = a + b;
   b = a - b;
   a = a - b;

   result = `Sau khi hoán vị: a = ${a} | b = ${b} `;
}
console.log(result);

// -------------------------------------------------------------------------------
console.log(`================= Bài 2: Thực hiện phép toán ================= `);

var S = 10 + 20 + 5 ** 10 / 2;

console.log(`Kết quả S = ${S}`);

// -------------------------------------------------------------------------------
console.log(`================= Bài 3: Tìm số lớn nhất ================= `);

var a = -10;
var b = 2;
var c = 50;

if (areNaN(a, b, c)) {
   result = "Không thể thực hiện, các giá trị phải cùng kiểu là số";
} else {
   result = a;
   if (result < b) {
      result = b;
   }
   if (result < c) {
      result = c;
   }

   result = `Số lớn nhất trong 3 số là: ${result}`;
}
console.log(result);

// -------------------------------------------------------------------------------
console.log(`================= Bài 4: Kiểm tra số cùng dấu ================= `);

var a = 10;
var b = -5;

if (areNaN(a, b)) {
   result = "Không thể thực hiện, các giá trị phải cùng kiểu là số";
} else if (a * b === 0) {
   result = "Không thể kiểm tra với số 0, vì số 0 không mang khái niệm dấu";
} else {
   result = `${a} ${a * b > 0 ? "cùng dấu" : "khác dấu"} với ${b}`;
}
console.log(result);

// -------------------------------------------------------------------------------
console.log(`================= Bài 5: Sắp xếp 3 số ================= `);

var a = 2;
var b = 1;
var c = 1;

if (areNaN(a, b, c)) {
   result = "Không thể thực hiện, các giá trị phải cùng kiểu là số";
} else {
   console.log(`Trước khi sắp xếp: a = ${a} | b = ${b} | b = ${c}`);

   var num1, num2, num3, temp;

   if (a > b) {
      temp = a;
      a = b;
      b = temp;
   }
   if (b > c) {
      temp = b;
      b = c;
      c = temp;
   }
   if (a > b) {
      temp = a;
      a = b;
      b = temp;
   }

   result = `Sau khi sắp xếp: a = ${a} | b = ${b} | b = ${c}`;
}
console.log(result);
