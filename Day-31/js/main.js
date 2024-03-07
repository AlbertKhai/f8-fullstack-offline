const root = document.querySelector("#root");
const template = document.querySelector("template");

template.innerHTML = `<div class="timer">
    <h2>Get Link</h2>
    <span class="counter"></span>
    <div class="action">
        <button class="btn" disabled>Get Link</button>
    </div>
</div>`;

const templateNode = template.content.cloneNode(true);
root.append(templateNode);

/* ========================= Handle Get-link ========================= */
const counterEl = document.querySelector(".counter");
const btnGetLink = document.querySelector(".btn");

let requestAnimationFrame =
   window.requestAnimationFrame ||
   window.mozRequestAnimationFrame ||
   window.webkitRequestAnimationFrame ||
   window.msRequestAnimationFrame;

let countdown = 30;
let lastTime = Date.now();

counterEl.innerText = countdown;

const id = lastTime.toString(36) + Math.random().toString(36).substring(2);

let getLink = (route) => {
   return fetch(`https://lws923-8686.csb.app/${route}?id=${id}`)
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => console.error("Error:", error));
};

getLink("init").then((res) => {
   console.log(res);
});

let count = () => {
   let currentTime = Date.now();
   if (currentTime - lastTime >= 1000) {
      countdown--;
      lastTime = currentTime;
      counterEl.innerText = countdown;
   }

   if (countdown > 0) {
      requestAnimationFrame(count);
   } else {
      getLink("getLink").then((link) => {
         btnGetLink.disabled = false;
         btnGetLink.addEventListener("click", () => {
            window.location.href = link;
         });
      });
   }
};

requestAnimationFrame(count);
