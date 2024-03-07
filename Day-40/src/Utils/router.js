import Navigo from "navigo";
const routers = new Navigo("/", { linksSelector: "[data-route]" });
const root = document.querySelector("#app");

window.navigate = (url) => {
   routers.navigate(url);
};

export const router = (arr, callback = () => {}, productsName) => {
   arr.forEach(({ path, component }) => {
      routers.on(path, (data) => {
         data = {
            hash: data.hashString,
            params: data.data,
            query: data.params,
            search: data.queryString,
            url: data.url,
         };

         if (path.includes(":id") && !productsName.includes(+data.params.id)) {
            window.location.href = "../../public/404.html";
            return;
         }

         const result = component(data);
         if (root) {
            let html = callback().replace("{body}", result);
            root.innerHTML = html;
         }
      });
   });

   if (!routers.resolve()) {
      window.location.href = "../../public/404.html";
   }
};
