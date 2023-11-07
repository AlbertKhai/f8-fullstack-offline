export const productsName = [1, 2, 3, 4];

export const Products = () => {
   return `<h1>Danh sách sản phẩm</h1>
    <ul>
        ${productsName.map((name) => `<li><a href="/san-pham/${name}" data-route>Sản phẩm ${name}</a></li>`).join("")}
    </ul>
    `;
};
