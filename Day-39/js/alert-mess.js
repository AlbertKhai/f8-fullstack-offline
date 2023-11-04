const $ = document.querySelector.bind(document);
export const alertMess = async function (mess, type = "success") {
   const wrapAlert = $(".wrap-alert");
   type += "-alert";

   let html = `
       <h3>${mess}</h3>
       <button class="close"><i class="fa-solid fa-xmark"></i></button>`;

   const alert = document.createElement("div");
   alert.classList.add("alert", "hide");
   alert.innerHTML = html;
   wrapAlert.append(alert);

   setTimeout(function () {
      alert.classList.replace("hide", type);
   }, 100);

   let timeoutId = setTimeout(() => {
      alert.classList.add("hide");
      setTimeout(() => {
         alert.remove();
      }, 500);
   }, 3000);

   alert.querySelector(".close").addEventListener("click", () => {
      clearTimeout(timeoutId);
      alert.classList.add("hide");
      setTimeout(() => {
         alert.remove();
      }, 500);
   });
};
