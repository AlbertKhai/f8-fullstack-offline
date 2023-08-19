function isPrime(n) {
   if (n <= 1) return false;
   if (n <= 3) return true;
   if (n % 2 === 0 || n % 3 === 0) return false;
   for (let i = 5; i * i <= n; i += 6) {
      if (n % i === 0 || n % (i + 2) === 0) return false;
   }
   return true;
}

function err(arr, integer = false) {
   if (!Array.isArray(arr)) {
      throw new Error("Tham số truyền vào phải là mảng");
   } else if (arr.length === 0) {
      throw new Error("Tham số mảng truyền vào chưa có phần tử");
   }

   arr.forEach((num) => {
      typeof num === "string" ? (num = +num) : "";
      if (!Number.isFinite(num)) {
         throw new Error("Tất cả các phần tử của mảng phải là số");
      } else if (!Number.isInteger(num) && integer) {
         throw new Error("Tất cả các phần tử của mảng phải là số nguyên");
      }
   });
}

console.log(`================= Bài 1 =================`);
// Cho trước 1 mảng số nguyên, yêu cầu tìm số lớn nhất, nhỏ nhất trong mảng và vị trí

function findNum(arr) {
   try {
      err(arr, true);
   } catch (error) {
      return error.message;
   }

   console.log("Mảng được truyền vào:", arr);

   let nums = arr.slice(0);

   nums.sort(function (next, prev) {
      return next - prev;
   });

   let indexBig = [],
      indexSmall = [];

   arr.forEach(function (value, index) {
      if (value === nums[0]) {
         indexSmall.push(index);
      }
      if (value === nums.at(-1)) {
         indexBig.push(index);
      }
   });

   console.log(
      `Số nhỏ nhất trong mảng là: ${
         nums[0]
      } | Ở vị trí index: ${indexSmall.join(", ")}`
   );
   console.log(
      `Số lớn nhất trong mảng là: ${nums.at(
         -1
      )} | Ở vị trí index: ${indexBig.join(", ")}`
   );
}

var numbers = [0, 5456, 15, 50, 7, -94, 254, -7, 22, 199, -94];

findNum(numbers);

console.log(`================= Bài 2 ================= `);
// Cho trước 1 mảng số nguyên, tính trung bình các số nguyên tố trong mảng. Nếu trong mảng không có số nguyên tố thì hiển thị “Không có số nguyên tố”

function averagePrime(arr) {
   try {
      err(arr, true);
   } catch (error) {
      return error.message;
   }

   console.log("Mảng được truyền vào:", arr);

   let prime = [0],
      total = prime[0];

   arr.forEach(function (value) {
      if (isPrime(value)) {
         total += value;
         prime.push(value);
      }
   });

   let average;

   if (total === 0) {
      return "Không có số nguyên tố";
   } else {
      average = total / (prime.length - 1);
   }

   prime = prime.slice(1).join(", ");

   console.log("Các số nguyên tố có trong mảng là:", prime);
   console.log("Kết quả trung bình các số nguyên tố trong mảng là:", average);

   return average;
}

var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

averagePrime(numbers);

console.log(`================= Bài 3 ================= `);
// Cho trước 1 mảng bất kỳ, nếu trong mảng có các phần tử trùng nhau thì chỉ giữa lại 1 (Gọi là lọc trùng). In ra mảng sau khi đã xử lý

function filterArr(arr) {
   try {
      err(arr);
   } catch (error) {
      return error.message;
   }

   console.log("Mảng ban đầu", arr);

   arr.forEach(function (value, index) {
      for (let i = arr.length - 1; i >= 0; i--) {
         if (i === index) {
            break;
         }
         value === arr[i] ? arr.splice(i, 1) : "";
      }
   });

   console.log(`Mảng sau khi được lọc trùng lặp:`, arr);
   return arr;
}

var numbers = [0, 0, 1, 2, 2, 3, 4, 5, 6, 6, 6, 6.2, 7, 8, 9, 10, 10];
filterArr(numbers);

console.log(`================= Bài 4 ================= `);
// Cho trước 1 mảng số nguyên và thực hiện các yêu cầu sau

// Sắp xếp mảng theo thứ tự tăng dần

// Chèn thêm 1 số vào bất kỳ vị trí nào trong mảng mà không làm thay đổi thứ tự sắp xếp của mảng

// Ví dụ:

// var numbers = [5, 1, 9, 8, 10];
// var element = 4;
// Kết quả hiển thị:

// [1, 4, 5, 8, 9, 10]

function sortArr(arr, num) {
   try {
      err(arr, true);
   } catch (error) {
      return error.message;
   }

   console.log("Mảng ban đầu:", arr);

   arr.sort((next, prev) => next - prev);

   console.log("Mảng sau khi được sắp xếp:", arr);

   for (let i in arr) {
      if (arr[i] >= num) {
         arr.splice(i, 0, num);
         break;
      }
   }
   console.log(`Mảng sau khi được chèn số "${num}":`, arr);
   return arr;
}

var numbers = [5, 1, 9, 8, 10];
sortArr(numbers, 4);
