function isObj(obj) {
   return (
      (typeof obj === "object" && !Array.isArray(obj) && obj !== null) || false
   );
}

function errNum(arg) {
   typeof arg === "string" ? (arg = +arg) : "";
   return !Number.isFinite(arg) || !(arg > 0) || !Number.isInteger(arg);
}

console.log(`========================= Bài 1 =========================`);
var errors = {
   name: {
      required: "Vui lòng nhập họ tên",
      min: "Họ tên phải từ 5 ký tự",
   },
   email: {
      email: "Định dạng email không hợp lệ",
      unique: "Email đã có người sử dụng",
      required: "Vui lòng nhập địa chỉ email",
   },
   password: {
      required: "Vui lòng nhập mật khẩu",
      same: "Mật khẩu phải khớp với mật khẩu nhập lại",
   },
};

function getError(field) {
   if (!isObj(errors[field])) {
      return `"${field}" không phải là 1 nhóm lỗi trong errors`;
   } else if (Object.keys(errors[field]).length === 0) {
      return `Nhóm lỗi "${field}" trong errors chưa có dữ liệu`;
   }
   return Object.values(errors[field])[0];
}

console.log(getError(`password`));

console.log(`\n========================= Bài 2 =========================`);
var Customer = function (name, age, address) {
   this.name = name;
   this.age = age;
   this.address = address;
};

function getShortName(fullName) {
   fullName = fullName.trim().split(" ");
   if (fullName.length === 1) return fullName[0];
   return fullName.at(0) + " " + fullName.at(-1);
}

function validateCustomer(arr) {
   if (!Array.isArray(arr)) {
      throw new Error("Tham số truyền vào phải là 1 mảng");
   } else if (arr.length === 0) {
      throw new Error("Tham số mảng truyền vào chưa có đối tượng");
   }

   let keys = [];
   for (let index in arr) {
      obj = arr[index];
      errNum(obj.age) && keys.push("age");
      (typeof obj.name !== "string" || !obj.name) && keys.push("name");
      (typeof obj.address !== "string" || !obj.address) && keys.push("address");
      if (keys.length > 0) {
         keys = keys.join(", ");
         throw new Error(
            `Thuộc tính ${keys} của đối tượng tại vị trí index: ${index} trong mảng có giá trị không hợp lệ`
         );
      }
   }
}

function createCustomers(arr) {
   // Log error
   try {
      validateCustomer(arr);
   } catch (error) {
      return error.message;
   }

   // Handle
   let customers = JSON.parse(JSON.stringify(arr));
   return (
      customers
         .sort((next, prev) => next.age - prev.age)
         .forEach(
            (customer) => (customer.shortName = getShortName(customer.name))
         ),
      customers
   );
}

const customers = [
   { name: "Nguyễn Văn A", age: 11, address: "Ha Noi" },
   { name: "Nguyễn Văn B", age: 2, address: "Hai Phong" },
   { name: "Nguyễn Văn C", age: 12, address: "TP.HCM" },
];

const result = createCustomers(customers);
console.log(result);

console.log(`\n========================= Bài 3 =========================`);
var User = function (name, password, email) {
   this.name = name;
   this.password = password;
   this.email = email;
};

var data = [];

function handleRegister(name, password, email) {
   if (!name || !password || !email) {
      console.warn("Hãy nhập đầy đủ thông tin name, password, email");
   } else if (data.some((obj) => obj.email === email)) {
      console.warn(`Email "${email}" đã được sử dụng`);
   } else {
      let user = new User(name, password, email);
      user.role = "user";
      data.push(Object.assign({}, user));
      console.log(`Đăng kí thành công`);
   }
}

function handleLogin(email, password) {
   var result = data.find(
      (obj) => obj.email === email && obj.password === password
   );
   return result || "Thông tin đăng nhập không hợp lệ";
}

handleRegister("Nguyen Van A", "123456", "nguyenvana@email.com");
handleRegister("Nguyen Van B", "1234567", "nguyenvanb@email.com");
handleRegister("Nguyen Van B", "1234567", "nguyenvanb@email.com");
handleRegister("Nguyen Van C", "1234567", "nguyenvanc@email.com");

const dataLogin = handleLogin("nguyenvanb@email.com", "1234567");

console.log("data:", data, `\n`);
console.log("dataLogin:", dataLogin);
