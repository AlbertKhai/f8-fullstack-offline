var content = `    Lorem   ipsum dolor sit   amet consectetur
 adipisicing elit. Ipsa dignissimos soluta         veritatis rerum minima? Expedita.`;
var tagP = document.getElementsByTagName("p")[0];

if (!content) {
   tagP.innerHTML = "Vui lòng nhập nội dung cho content";
} else if (!content.trim().includes(" ")) {
   content = content.trim();
   tagP.innerHTML = `${content}`;
   setInterval(() => {
      tagP.innerHTML = `<span>${content}</span>`;
   }, 1000);
   setInterval(() => {
      tagP.innerHTML = `${content}`;
   }, 2000);
} else {
   tagP.innerHTML = `${content}`;
   content = tagP.innerText;
   var position = 0;
   var nextPosition;

   setInterval(() => {
      nextPosition = content.indexOf(" ", position);
      if (nextPosition !== -1) {
         tagP.innerHTML = `${content.slice(0, position)}
            <span>${content.slice(position, nextPosition)}</span> 
            ${content.slice(nextPosition)}`;

         position = nextPosition + 1;
      } else {
         tagP.innerHTML = `${content.slice(0, position)} <span>${content.slice(
            position
         )}</span>`;

         position = 0;
      }
   }, 1000);
}
