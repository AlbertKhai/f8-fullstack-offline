import patternsRegex from "./patterns-regex.js";
import { app } from "./index.js";
const { stripHtml, patternsVideo, patternImg, patternLink, patternEmail, patternPhone } = patternsRegex;

moment.locale("vi");

const $ = document.querySelector.bind(document);

const typeContent = function (content) {
   content = stripHtml(content);

   const embedsVideo = ["https://www.youtube.com/embed/"];

   let urls = [];
   let html = [];

   for (let i = 0; i < patternsVideo.length; i++) {
      let matches = [...content.matchAll(patternsVideo[i])];
      matches.forEach((match) => {
         urls.push(match[0]);
         html.push(
            `<iframe
               width="700"
               height="394"
               src="${embedsVideo[i] + match[4]}"
               frameborder="0"
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
               allowfullscreen >
            </iframe>`.replace(/\n/g, "")
         );
      });
   }

   let imgMatches = [...content.matchAll(patternImg)];
   imgMatches.forEach((match) => {
      urls.push(match[0]);
      html.push(
         `<figure>
            <img src="${match[0]}" alt="" />
          </figure>`.replace(/\n/g, "")
      );
   });

   let linkMatches = [...content.matchAll(patternLink)];
   linkMatches.forEach((match) => {
      urls.push(match[0]);
      html.push(`<a href="${match[0]}" target="_blank">${match[0]}</a>`);
   });

   let emailMatches = [...content.matchAll(patternEmail)];
   emailMatches.forEach((match) => {
      urls.push(match[0]);
      html.push(`<a href="mailto:${match[0]}">${match[0]}</a>`);
   });

   let phoneMatches = [...content.matchAll(patternPhone)];
   phoneMatches.forEach((match) => {
      urls.push(match[0]);
      html.push(`<a href="tel:${match[0]}">${match[0]}</a>`);
   });

   if (urls.length) {
      urls.forEach((url, index) => {
         const regex = new RegExp(url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
         content = content.replace(regex, html[index]);
      });

      content = content.replace(/\n/g, "<br>");

      return content;
   }

   content = content.replace(/\n/g, "<br>");

   return `<p>${content}</p>`;
};

export const render = ({ blogs, position = "beforebegin", root, name, id }) => {
   root = $(root) || $(".blog-item__loading");

   root.insertAdjacentHTML(
      position,
      `${blogs
         .map(({ title, content, timeUp, userId }) => {
            return `
                <section class="blog-item">
                   <div class="blog-item__user">
                      <div class="user__img">
                         <a href="#!" class="user__avatar">
                            <img
                               src="https://source.boringavatars.com/beam/50?${id || userId["_id"]}"
                               alt=""
                               class="user__avatar-img"
                            />
                         </a>
                      </div>
                      <div class="user__info">
                         <div class="user__name"><a class="user__name-link" href="#!">${name || userId.name}</a></div>
                         <div class="user__time-up">
                            <span>${moment(timeUp).fromNow()}</span>
                            • <i class="fa-solid fa-earth-americas"></i>
                         </div>
                      </div>
                   </div>
                   <div class="blog-item__body">
                      <h2 class="blog-item__title">
                         <a href="#!" class="blog-item__link">${title}</a>
                      </h2>
                      <div class="blog-item__content">
                         ${typeContent(content)}
                      </div>
                   </div>
                </section>`;
         })
         .join("")}`
   );
};

export const renderBlogUser = (name, srcImg, id) => {
   const wrapHeading = $(".wrap__heading");
   const headingLoad = wrapHeading.querySelector(".heading__loading");
   const userAvatar = wrapHeading.querySelector(".user__avatar");
   const userAvatarImg = wrapHeading.querySelector(".user__avatar-img");
   const heading = wrapHeading.querySelector(".heading-content");
   const blogList = $(".blog-list");
   const wrapPostBlog = $(".wrap__post-blog");
   const wrapBtnHome = $(".wrap-btn__home");

   wrapPostBlog.classList.add("hide");
   headingLoad.classList.remove("hide");
   userAvatarImg.src = srcImg;
   userAvatar.classList.remove("hide");
   heading.innerHTML = name;

   wrapPostBlog.innerHTML = "";

   const blogItems = blogList.querySelectorAll(".blog-item");
   blogItems.forEach((blogItem) => blogItem.remove());

   app.getBlogsUser("afterbegin", ".blog-list", id);
   headingLoad.classList.add("hide");
   wrapBtnHome.classList.remove("hide");
};
