function err(...args) {
   args.every((arg) => {
      typeof arg === "string" ? (arg = +arg) : "";
      if (!Number.isFinite(arg)) {
         throw new Error("Giá trị truyền vào phải là số");
      } else if (!(arg > 0)) {
         throw new Error("Giá trị truyền vào phải lớn hơn 0");
      } else if (!Number.isInteger(arg)) {
         throw new Error("Giá trị truyền vào phải là số nguyên");
      }
   });
}

let result,
   checkedError = false;

// -------------------------------------------------------------------------------
console.log(`================= Bài 1: N số fibonacci ================= `);

// Hiển thị N số Fibonacci đầu tiên

// Ví dụ: Gán n = 10 sẽ hiển thị danh sách 10 số fibonacci

// Yêu cầu: Không dùng vòng lặp

function fibonacci(n, a = 0, b = 1, result = "") {
   if (!checkedError) {
      try {
         checkedError = true;
         err(n);
         const log = `Số đầu tiên trong dãy Fibonacci là:`;
         if (+n === 1) {
            return `${log} ${a}`;
         }
         return `${n} ${log} ${a} ${fibonacci(n - 1, b, a + b, result)}`;
      } catch (error) {
         return error.message;
      }
   }

   if (n === 1) return (result += a);
   result += a + " ";
   return fibonacci(n - 1, b, a + b, result);
}

let n = "10";
console.log(fibonacci(n));

// -------------------------------------------------------------------------------
console.log(`================= Bài 2: Đảo ngược số ================= `);

// Viết hàm đảo ngược số nguyên với tham số là số cần đảo ngược

// Ví dụ: Khi gọi hàm và truyền đối số 12345 sẽ trả về kết quả 54321

function reverseNumber(n) {
   try {
      err(n);
   } catch (error) {
      return error.message;
   }

   let reversed = "";
   while (n > 0) {
      reversed += n % 10;
      n = Math.floor(n / 10);
   }
   return `Số nguyên sau khi được đảo ngược: ${+reversed}`;
}

console.log(reverseNumber(12345));

// -------------------------------------------------------------------------------
console.log(`============= Bài 3: Viết hàm chuyển số thành chữ ============= `);

// Ví dụ: Số 4298 sẽ chuyển thành: Bốn ngàn hai trăm chín tám

// Ràng buộc: Số cần chuyển đổi có giá trị từ 0 đến 9999

function numToWords(num) {
   if (num < 0 || num > 9999)
      return "Số cần chuyển đổi phải có giá trị từ 0 đến 9999";
   result = "";
   let log = `${num} =>`;
   let ones = [
      "không",
      "một",
      "hai",
      "ba",
      "bốn",
      "năm",
      "sáu",
      "bảy",
      "tám",
      "chín",
   ];
   let tens = [
      "",
      "mười",
      "hai mươi",
      "ba mươi",
      "bốn mươi",
      "năm mươi",
      "sáu mươi",
      "bảy mươi",
      "tám mươi",
      "chín mươi",
   ];

   let thousands = Math.floor(num / 1000);
   if (thousands > 0) {
      result += ones[thousands] + " ngàn ";
      num -= thousands * 1000;
   }

   let hundreds = Math.floor(num / 100);
   if (hundreds > 0) {
      result += ones[hundreds] + " trăm ";
      num -= hundreds * 100;
   } else if (thousands > 0 && num > 0) {
      result += "không trăm ";
   }

   let tensPlace = Math.floor(num / 10);
   if (tensPlace >= 1) {
      result += tens[tensPlace] + " ";
      num -= tensPlace * 10;
   } else if (tensPlace === 0 && (hundreds > 0 || thousands > 0) && num > 0) {
      result += "lẻ ";
   }

   if (num > 0) {
      if (num === 1 && tensPlace >= 2) {
         result += "mốt";
      } else {
         result += ones[num];
      }
   }
   result = result.trim().charAt(0).toUpperCase() + result.slice(1);
   return `${log} ${result}`;
}

console.log(numToWords(4298));
