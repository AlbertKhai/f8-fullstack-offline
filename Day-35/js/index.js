import { client } from "./client.js";
import { config } from "./config.js";
const { PAGE_LIMIT } = config;
moment.locale("vi");

const app = {
   loading: document.querySelector(".news-item__loading"),
   newsTopEl: document.querySelector(".news-top"),
   newsList: document.querySelector(".news-list"),
   formSearch: document.querySelector(".form-search"),
   searchEl: document.querySelector(".search"),

   isLoading: false,
   isSearch: false,

   query: {
      _sort: "id",
      _order: "desc",
      _limit: PAGE_LIMIT,
      _page: 1,
   },

   resetNewsList: function () {
      this.newsList.innerHTML = `
            <li class="news-item__loading hide">
                <div class="news-item__wrap-thumbnail loading"></div>
                <div class="news-item__content">
                    <div class="news-item__title loading"></div>
                    <div class="news-item__meta loading"></div>
                    <div class="news-item__excerpt loading"></div>
                </div>
            </li>
        `;
      this.loading = document.querySelector(".news-item__loading");
   },

   render: function (news) {
      const stripHtml = (html) => html.replace(/(<([^>]+)>)/gi, "");

      this.loading.insertAdjacentHTML(
         "beforebegin",
         `${news
            .map(({ title, excerpt, imgSrc, categories, date, isTop }) => {
               if (isTop && !this.isSearch) return "";
               date = new Date(date);
               return `
    <li class="news-item">
        <figure class="news-item__wrap-thumbnail">
            <a href="#!">
            <img
                src="${stripHtml(imgSrc)}"
                alt='${stripHtml(title)}'
                class="news-item__thumbnail"
            />
            </a>
        </figure>
        <div class="news-item__content">
            <h2 class="news-item__title">
                <a href="#!" class="news-item__link">${stripHtml(title)}</a>
            </h2>

            <div class="news-item__meta">
                <span class="new-item__categories">
                    <a href="#!">${stripHtml(categories)}</a>
                </span>
                <span class="new-item__time">${moment(date).fromNow()}</span>
            </div>

            <p class="news-item__excerpt">${stripHtml(excerpt)}</p>
        </div>
    </li>`;
            })
            .join("")}`
      );
   },

   //Call API
   getNews: async function (query = {}) {
      this.loading.classList.remove("hide");
      let queryString = new URLSearchParams(query).toString();

      queryString = queryString ? "?" + queryString : "";

      const { res, data: news } = await client.get(`/news${queryString}`);
      this.render(news);
      this.isLoading = false;
      this.loading.classList.add("hide");

      // Scroll level gets more news
      let percent = 0.4;
      if (this.newsList.children.length > 20) {
         percent = 0.8;
      }

      this.pointLoading = document.body.clientHeight * percent;

      const totalCount = res.headers.get("X-Total-Count");
      const totalPages = Math.ceil(totalCount / PAGE_LIMIT);

      if (this.query._page >= totalPages) {
         if (!this.isSearch) {
            this.query._page = 0;
         } else {
            this.endPage = true;
         }
      } else {
         this.endPage = false;
      }
   },

   getNewsTop: async function (categories) {
      const stripHtml = (html) => html.replace(/(<([^>]+)>)/gi, "");
      const { data: newsTop } = await client.get(`/${categories}`);
      const date = new Date(newsTop.date);

      this.newsTopEl.innerHTML = `<div class="news-top__content">
      <div class="news-top__content-inner">
         <h2 class="news-top__title">
            <a href="#!" class="news-top__link">${stripHtml(newsTop.title)}</a>
         </h2>

         <p class="news-top__time">${moment(date).fromNow()}</p>
      </div>
   </div>

   <figure class="news-top__wrap-thumbnail">
      <a href="#!">
         <img
            src="${stripHtml(newsTop.imgSrc)}"
            alt="${stripHtml(newsTop.title)}"
            class="news-top__thumbnail"
         />
      </a>
   </figure>`;
      this.newsTopEl.classList.remove("loading");
   },

   handleSearch: function () {
      this.formSearch.addEventListener("submit", (e) => {
         e.preventDefault();
         const keyword = this.searchEl.value;

         if (!keyword.trim()) {
            this.searchEl.value = "";
            e.target.reportValidity();
            return;
         }

         this.isSearch = true;
         this.query.q = keyword;
         this.newsTopEl.style.display = "none";
         this.resetNewsList();
         this.getNews(this.query);
      });
   },

   handleSort: function () {
      const btnsSort = document.querySelectorAll(".sort-new__btn");
      const sortNewsContent = document.querySelector(".sort-news__content");

      btnsSort.forEach((btnSort) => {
         const value = btnSort.dataset.value;
         const content = btnSort.querySelector(
            ".sort-new__btn-content"
         ).innerHTML;

         btnSort.addEventListener("click", (e) => {
            if (sortNewsContent.innerHTML === content) return;
            sortNewsContent.innerHTML = content;
            this.resetNewsList();
            this.query._order = value;
            this.query._page = 1;
            this.getNews(this.query);
         });
      });
   },

   handleAddNews: function () {
      const eventAddNews = (e) => {
         if (this.endPage) return;
         const y = window.scrollY;
         if (y >= this.pointLoading && !this.isLoading) {
            this.isLoading = true;
            this.query._page++;
            this.getNews(this.query);
         }
      };

      this.eventAddNews = eventAddNews;

      window.addEventListener("scroll", eventAddNews);
   },

   //Khởi động app
   start: function () {
      this.getNews(this.query);
      this.getNewsTop("newsTopSmartBuy");
      this.handleSearch();
      this.handleSort();
      this.handleAddNews();
   },
};

//Chạy app
app.start();
