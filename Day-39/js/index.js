import { client } from "./client.js";
import { config } from "./config.js";
import { render } from "./render.js";
import { features } from "./features.js";
import { alertMess } from "./alert-mess.js";

const { PAGE_LIMIT } = config;

moment.locale("vi");

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

export const app = {
   nav: $(".nav"),
   wrapAccount: $(".wrap__account"),
   root: $(".blog"),
   blogInner: $("blog-inner"),
   blogList: $(".blog-list"),
   wrapPostBlog: $(".wrap__post-blog"),
   loading: $(".blog-item__loading"),
   authWrap: $(".auth-wrap"),
   alertMess,
   render,

   isLoading: false,
   isFirstLoad: true,
   profileUser: {
      userId: null,
      username: null,
      blogsUser: null,
   },

   query: {
      limit: PAGE_LIMIT,
      page: 1,
   },

   getBlogs: async function (query = {}) {
      this.loading.classList.remove("hide");
      let queryString = new URLSearchParams(query).toString();

      queryString = queryString ? "?" + queryString : "";

      const { data: blogs } = await client.get(`/blogs${queryString}`);

      this.render({ blogs: blogs.data });
      this.isLoading = false;
      this.loading.classList.add("hide");

      // Scroll level gets more news
      let percent = 0.4;
      if (this.blogList.children.length > 50) {
         percent = 0.8;
      }

      this.pointLoading = document.body.clientHeight * percent;
   },

   getUserId: function () {
      this.profileUser.userId = localStorage.getItem("user-id");
   },

   getBlogsUser: async function (position, root, id) {
      this.loading = $(".blog-item__loading");
      this.loading.classList.remove("hide");

      try {
         this.getUserId();

         if (!this.profileUser.userId) {
            throw new Error("userId not null");
         }

         const { res, data } = await client.get(`/users/${this.profileUser.userId}`);

         if (!res.ok) {
            throw new Error("Unauthorize");
         }

         this.profileUser.username = data.data.name;
         this.profileUser.blogsUser = data.data.blogs;
         const blogs = this.profileUser.blogsUser.splice(0, this.query.limit);
         const name = data.data.name;

         this.render({ blogs, position, root, name, id: id || this.profileUser.userId });
         this.isLoading = false;
         this.loading.classList.add("hide");

         // Scroll level gets more news
         let percent = 0.6;
         if (this.blogList.children.length > 50) {
            percent = 0.8;
         }

         this.pointLoading = document.body.clientHeight * percent;
      } catch (error) {
         console.log(error.message);
         // features.logout();
      }

      this.isLoading = false;
      this.loading.classList.add("hide");
   },

   handleScrollLoad: function () {
      const eventScrollLoad = (e) => {
         const y = window.scrollY;
         if (y >= this.pointLoading && !this.isLoading) {
            this.isLoading = true;

            if (this.profileUser.userId) {
               if (this.profileUser.blogsUser.length) {
                  const blogs = this.profileUser.blogsUser.splice(0, this.query.limit);
                  const name = this.profileUser.username;
                  const id = this.profileUser.userId;
                  this.render({ blogs, name, id });
                  setTimeout(() => {
                     this.isLoading = false;
                  }, 1000);
               }
               return;
            } else {
               this.query.page++;
               this.getBlogs(this.query);
            }
         }
      };

      window.addEventListener("scroll", eventScrollLoad);
   },

   // Khởi động app
   start: async function () {
      this.getUserId();

      if (this.profileUser.userId) {
         await this.getBlogsUser();
      } else {
         this.getBlogs(this.query);
      }
      features.renderAuth();
      this.handleScrollLoad();
      features.addEvent();

      this.isFirstLoad = false;
   },
};

//Chạy app
app.start();
