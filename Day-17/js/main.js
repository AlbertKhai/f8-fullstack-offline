function areNaN(...args) {
   return !args.every((arg) => Number.isFinite(Number(arg)));
}

function formatVND(value) {
   return value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
}

var result;

// -------------------------------------------------------------------------------
console.log(`================= Bài 1: Tính tiền taxi ================= `);

var km = 120;

if (areNaN(km)) {
   result = "Đơn vị km phải là số";
} else if (!(km > 0)) {
   result = "Đơn vị km phải lớn hơn 0";
} else if (km > 0) {
   if (km <= 1) {
      result = km * 15000;
   } else if (km <= 5) {
      result = (km - 1) * 13500 + 15000;
   } else if (km > 5) {
      result = (km - 5) * 11000 + 4 * 13500 + 15000;
   }
   if (km > 120) {
      result *= 0.9;
   }

   result = `Taxi fare: ${formatVND(result)}`;
}

console.log(result);

// -------------------------------------------------------------------------------
console.log(`================= Bài 2: Tính tiền điện ================= `);

var prices = [1678, 1734, 2014, 2536, 2834, 2927];
var kWhRange = [0, 50, 100, 200, 300, 400];

var kWh = 201;

if (areNaN(kWh)) {
   result = "Đơn vị kWh cần tính phải là số";
} else if (!(kWh > 0)) {
   result = "Đơn vị kWh cần tính phải lớn hơn 0";
} else if (kWh > 0) {
   result = 0;
   for (var i = 0; i < kWhRange.length; i++) {
      if (kWh <= kWhRange[i + 1] || !kWhRange[i + 1]) {
         result += (kWh - kWhRange[i]) * prices[i];
         break;
      } else {
         result += (kWhRange[i + 1] - kWhRange[i]) * prices[i];
      }
   }
   result = `Bill tiền điện: ${formatVND(result)}`;
}

console.log(result);

// -------------------------------------------------------------------------------
console.log(`================ Bài 3: Tính giá trị biểu thức ================ `);

var n = 5;

if (areNaN(n)) {
   result = "Đơn vị tính phải là số";
} else if (!Number.isInteger(n)) {
   result = "Đơn vị tính phải là số nguyên";
} else if (!(n > 0)) {
   result = "Đơn vị tính phải lớn hơn 0";
} else {
   result = 0;
   var i = 1;
   while (i <= n) {
      result += i * (i + 1);
      i++;
   }

   result = `Kết quả biểu thức S = ${result}`;
}

console.log(result);

// -------------------------------------------------------------------------------
console.log(`============ Bài 4: Viết hàm kiểm tra số nguyên tố ============ `);

function primeNum(n) {
   if (n < 2) {
      return false;
   }
   for (var i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) {
         return false;
      }
   }
   return true;
}

var num = 9007199254740881;

if (areNaN(num)) {
   result = "Đối số num cần kiểm tra phải là số";
} else if (!Number.isInteger(num)) {
   result = "Đối số num cấn kiểm tra phải là số nguyên";
} else {
   result = primeNum(num)
      ? `${num} là số nguyên tố`
      : `${num} không phải số nguyên tố`;
}

console.log(result);

// -------------------------------------------------------------------------------
console.log(`================= Bài 5: Vẽ tam giác số ================= `);

var n = 2;

if (areNaN(n)) {
   result = "Số dòng N để tạo tam giác số phải là số";
} else if (!Number.isInteger(n)) {
   result = "Số dòng N để tạo tam giác số phải là số nguyên";
} else if (!(n > 0)) {
   result = "Số dòng N để tạo tam giác số phải lớn hơn 0";
} else {
   result = "";
   var count = 1;

   for (var i = 1; i <= n; i++) {
      for (var k = 1; k <= i; k++) {
         result += count + " ";
         count++;
      }
      result += "\n";
   }
}

console.log(result);

// -------------------------------------------------------------------------------
console.log(`================= Bài 6: Vẽ bàn cờ vua ================= `);

result = "";
for (var i = 1; i <= 8; i++) {
   for (var k = 1; k <= 8; k++) {
      if ((i + k) % 2 === 0) {
         result += "⬜️";
      } else {
         result += "⬛️";
      }
   }
   result += "\n";
}

console.log(result);

// -------------------------------------------------------------------------------
console.log(`=================  Bài 7: Vẽ bảng cửu chương ================= `);

result = "";
for (var i = 1; i <= 10; i++) {
   for (var k = 1; k <= 10; k++) {
      result += (i * k).toString().padStart(2, " ") + " ";
   }
   result += "\n";
}
console.log(result);

// -------------------------------------------------------------------------------
console.log(`===== Bài 8: Tính giá trị biểu thức không dùng vòng lặp ===== `);

function S(x) {
   if (x == 1) {
      return 1;
   } else {
      return 1 / x + S(x - 1);
   }
}

var n = 18;

if (areNaN(n)) {
   result = "Giá trị n cần tính phải là số";
} else if (!Number.isInteger(n)) {
   result = "Giá trị n cần tính phải là số nguyên";
} else if (!(n > 0)) {
   result = "Giá trị n cần tính phải lớn hơn 0";
} else {
   result = `Kết quả biểu thức S = ${S(n)}`;
}

console.log(result);
