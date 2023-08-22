function err(edit = false, ...args) {
   args.forEach((arr) => {
      if (!Array.isArray(arr)) {
         throw new Error(edit ? "notArr" : "Tham số truyền vào phải là mảng");
      } else if (arr.length === 0) {
         throw new Error("Tham số mảng truyền vào chưa có phần tử");
      }
   });
}
// --------------------------------------------------------------------------------------------------------------------------
console.log("# Bài 1/ Lấy kết quả giao giữa 2 mảng:");
var arrA = [1, 4, 3, 2];
var arrB = [5, 2, 6, 7, 1];

var intersectArr = () => {
   // Log error
   try {
      err(true, arrA, arrB);
   } catch (error) {
      if (error.message === "notArr") {
         return `Tham số arrA và arrB phải cùng là mảng`;
      }
      return `Mỗi tham số arrA, arrB phải có ít nhất 1 phần tử`;
   }

   // Handle
   return arrA.reduce((prev, current) => {
      return (
         !prev.includes(current) &&
            arrB.includes(current) &&
            prev.push(current),
         prev
      );
   }, []);
};
console.log("Input:", arrA, "và", arrB);
console.log("Output:", intersectArr(), `\n`);

// --------------------------------------------------------------------------------------------------------------------------
console.log("# Bài 2/ Làm phẳng array sau (Chuyển về mảng 1 chiều):");
var arr = [0, 1, [2, 3], [4, 5, [6, 7]], [8, [9, 10, [11, 12]]]];

var flatten = (array) => {
   // Log error
   try {
      err(array);
   } catch (error) {
      return error.message;
   }

   // Handle
   let arr = Array.from(array);
   for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i])) {
         var arrChild = arr[i];
         arr.splice(i, 1);
         for (let j = arrChild.length - 1; j >= 0; j--) {
            arr.splice(i, 0, arrChild[j]);
         }
         i = arr.findIndex((value) => Array.isArray(value)) - 1;
         if (i === -2) {
            break;
         }
      }
   }
   return arr;
};

console.log("Input:", arr);
console.log("Output:", flatten(arr), `\n`);

// --------------------------------------------------------------------------------------------------------------------------
console.log("# Bài 3/ Tách phần tử trong mảng theo đúng kiểu dữ liệu:");
var arr = [
   ["a", 1, true],
   ["b", 2, false],
];

var splitArrByType = (array) => {
   // Log error
   try {
      err(array);
   } catch (error) {
      return error.message;
   }

   // Handle
   let arr = flatten(array);
   return arr.reduce((prev, current) => {
      let index = prev.findIndex((value) => typeof value[0] === typeof current);
      return (
         index !== -1 ? prev[index].push(current) : prev.push([current]), prev
      );
   }, []);
};

console.log("Input:", arr);
console.log("Output:", splitArrByType(arr), `\n`);

// --------------------------------------------------------------------------------------------------------------------------
console.log(
   "# Bài 4/ Thiết kế 1 mảng phù hợp và thực hiện đổ dữ liệu lên giao diện:"
);
var arr = [
   [
      `Tiêu đề bài viết 1`,
      `Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis facilis
necessitatibus, excepturi praesentium totam blanditiis velit natus
dolor porro architecto exercitationem illo neque ut deserunt nihil
ratione temporibus, incidunt non?`,
      `./assets/imgs/1.jpg`,
   ],
   [
      `Tiêu đề bài viết 2`,
      `Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis facilis
necessitatibus, excepturi praesentium totam blanditiis velit natus
dolor porro architecto exercitationem illo neque ut deserunt nihil
ratione temporibus, incidunt non?`,
      `./assets/imgs/2.jpg`,
   ],
   [
      `Tiêu đề bài viết 3`,
      `Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis facilis
necessitatibus, excepturi praesentium totam blanditiis velit natus
dolor porro architecto exercitationem illo neque ut deserunt nihil
ratione temporibus, incidunt non?`,
      `./assets/imgs/3.jpg`,
   ],
];

var view = (array) => {
   // Log error
   try {
      err(array);
   } catch (error) {
      return error.message;
   }

   // Handle
   let arr = Array.from(array);
   return arr.reduce((prev, current, index) => {
      if (!Array.isArray(current)) {
         console.error(`Phần tử tại vị trí index = ${index} phải là mảng`);
      } else if (current.length < 3) {
         console.error(
            `Phần tử tại vị trí index = ${index} trong mảng thiếu dữ liệu để hiển thị`
         );
      } else if (!current.every((value) => !!value)) {
         console.error(
            `Phần tử tại vị trí index = ${index} có dữ liệu chưa hợp lệ`
         );
      } else {
         return (prev += `<li class="post__item">
         <div class="post__content">
            <h2 class="post__heading">
               <a href="#!" class="post__heading--link">
                  ${current[0]}
               </a>
            </h2>
            <p class="post__desc">
               ${current[1]}
            </p>
         </div>
         <figure class="post__wrap-img">
            <a href="#!">
               <img class="post__img" src="${current[2]}" alt="" />
            </a>          
         </figure>
      </li>`);
      }
      return (prev += `<li class="post__item"><h2 class="post__heading">Nội dung bài viết đang cập nhật...</h2></li>`);
   }, "");
};

document.querySelector(".post__list").innerHTML = view(arr);
