import { client } from "./client.js";
import { config } from "./config.js";

const { PAGE_LIMIT } = config;
moment.locale("vi");

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const app = {
   nav: $(".nav"),
   wrapAccount: $(".wrap__account"),
   root: $(".blog"),
   blogInner: $("blog-inner"),
   blogList: $(".blog-list"),
   wrapPostBlog: $(".wrap__post-blog"),
   loading: $(".blog-item__loading"),
   authWrap: $(".auth-wrap"),

   isLoading: false,
   isFirstLoad: true,

   query: {
      limit: PAGE_LIMIT,
      page: 1,
   },

   randomAvatar: 1,

   stripHtml: (html) => html.replace(/<(?!br\s*\/?)[^>]+>/gi, ""),
   regexEmail: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,

   typeContent: function (content) {
      this.stripHtml(content);

      const patternsVideo = [/(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/watch\?v=([a-zA-Z0-9_-]{11})/g];

      const embedsVideo = ["https://www.youtube.com/embed/"];

      const patternImg = /(https?:\/\/[^?]+\.(jpg|jpeg|png|gif|bmp))/g;

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

      if (urls.length) {
         urls.forEach((url, index) => {
            content = content.replace(url, html[index]);
         });

         return content;
      }

      return `<p>${content}</p>`;
   },

   render: function (blogs, position = "beforebegin", of = "loading") {
      this[of].insertAdjacentHTML(
         position,
         `${blogs
            .map(({ title, content, timeUp, userId }) => {
               return `
                  <section class="blog-item">
                     <div class="blog-item__user">
                        <div class="user__img">
                           <a href="#!" class="user__avatar">
                              <img
                                 src="https://source.boringavatars.com/beam/50?${this.randomAvatar++}"
                                 alt=""
                                 class="user__avatar-img"
                              />
                           </a>
                        </div>
                        <div class="user__info">
                           <div class="user__name"><a href="#!">${userId.name}</a></div>
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
                           ${this.typeContent(content)}
                        </div>
                     </div>
                  </section>`;
            })
            .join("")}`
      );
   },

   getBlogs: async function (query = {}) {
      this.loading.classList.remove("hide");
      let queryString = new URLSearchParams(query).toString();

      queryString = queryString ? "?" + queryString : "";

      const { data: blogs } = await client.get(`/blogs${queryString}`);

      this.render(blogs.data);
      this.isLoading = false;
      this.loading.classList.add("hide");

      // Scroll level gets more news
      let percent = 0.4;
      if (this.blogList.children.length > 50) {
         percent = 0.8;
      }

      this.pointLoading = document.body.clientHeight * percent;
   },

   handleScrollLoad: function () {
      const eventScrollLoad = (e) => {
         if (this.endPage) return;
         const y = window.scrollY;
         if (y >= this.pointLoading && !this.isLoading) {
            this.isLoading = true;
            this.query.page++;
            this.getBlogs(this.query);
         }
      };

      window.addEventListener("scroll", eventScrollLoad);
   },

   /* ========================= Authentication ========================= */

   isLogin: function () {
      const status = localStorage.getItem("login_token") ? true : false;
      return status;
   },

   alertMess: async function (mess, type = "success") {
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
   },

   loadingBtn: function (status = true, btn, contentBtn = `Đăng nhập`) {
      const button = btn || this.root.querySelector(".auth-submit[name=btnLogin]");
      if (status) {
         button.innerHTML = `<i class="fa fa-spinner fa-spin"></i><span>Loading...</span>`;
         button.disabled = true;
      } else {
         button.innerHTML = contentBtn;
         button.disabled = false;
      }
   },

   renderAuth: async function () {
      const isLogin = this.isLogin();

      if (isLogin) {
         this.authWrap.innerHTML = "";

         this.wrapAccount.innerHTML = `
            <button class="btn__account-option">
               <span class="user__hi">Chào,</span>
               <span class="user__name"><i class="fa fa-spinner fa-spin"></i><span>Loading...</span></span>
               <a href="#!" class="user__avatar">
                  <img
                     src="https://source.boringavatars.com/beam/30?1"
                     alt="user avatar"
                     class="user__avatar-img"
                  />
               </a>
            </button>
            <button class="btn__account-logout hide">ĐĂNG XUẤT</button>`;

         this.wrapPostBlog.innerHTML = `
            <div class="post-blog__inner">
               <h2 class="heading__post-blog">Tạo một blog mới</h2>
               <form action="" method="post" class="form__post-blog">
                  <label for="titlePostBlog">Tiêu đề</label>
                  <input type="text" name="titlePostBlog" class="title__post-blog" id="titlePostBlog" />
                  <label for="contentPostBlog">Nội dung</label>
                  <div name="contentPostBlog" id="contentPostBlog" class="content__post-blog" contenteditable></div>
                  <label for="contentPostBlog">Chọn ngày đăng bài</label>
                  <div class="wrap-date__post-blog">
                     <input
                        type="date"
                        id="datePostBlog"
                        class="date__post-blog"
                        autocomplete="off"
                        placeholder="DD/MM/YYYY"
                     />
                     <button type="button" id="btnDatePicker" class="btn-date__post-blog">
                        <i class="fa-regular fa-calendar"></i>
                     </button>
                  </div>
                  <button class="submit__post-blog">Đăng bài</button>
               </form>
            </div>`;
         this.handleLogDatePicker();
         this.getProfile();
         this.wrapPostBlog.classList.remove("hide");
      } else {
         this.wrapAccount.classList.add("hide");
         this.wrapAccount.innerHTML = `
            <button class="btn__account-login hide">
               <span>ĐĂNG NHẬP</span>
               <i class="fa-regular fa-user"></i>
            </button>`;

         this.authWrap.innerHTML = `
         <div class="auth-overlay"></div>

         <!-- Auth account -->
         <div class="auth-container">
            <!-- Auth nav -->
            <div class="auth-nav">
               <button class="btn__tab btn__tab-login active">
                  Đăng nhập
               </button>
               <button class="btn__tab">Đăng ký</button>
            </div>
            <!-- End .auth-nav -->
            <div class="auth-panel">
               <!-- Auth-tab login -->
               <div class="auth-tab auth-login">
                  <!-- Form -->
                  <form
                     action="#!"
                     method="POST"
                     class="auth-form form-login"
                  >
                     <!-- Message -->
                     <p class="auth-message"></p>
                     <!-- End .auth-message when submit -->

                     <!-- Auth email -->
                     <div class="auth-control">
                        <label for="auth-email-login" class="auth-label">
                           Email
                        </label>
                        <div class="auth-row">
                           <input
                              type="email"
                              name="email"
                              id="auth-email-login"
                              placeholder="Email"
                              class="auth-input"
                              value=""
                           />
                        </div>
                        <p class="auth-message"></p>
                     </div>
                     <!-- End .auth-email -->

                     <!-- Auth Password -->
                     <div class="auth-control">
                        <label
                           for="auth-password-login"
                           class="auth-label"
                        >
                           Mật khẩu
                        </label>
                        <div class="auth-row password">
                           <input
                              type="password"
                              name="password"
                              id="auth-password-login"
                              placeholder="Mật khẩu"
                              class="auth-input"
                              value=""
                           />
                           <button type="button" class="auth-view">
                              <i class="fa-light fa-eye"></i>
                              <i class="fa-light fa-eye-slash d-none"></i>
                           </button>
                        </div>
                        <p class="auth-message"></p>
                     </div>
                     <!-- End .auth-password -->

                     <!-- Auth action forgot -->
                     <div class="auth-control action">
                        <button class="auth-forgot">
                           <i>Quên mật khẩu?</i>
                        </button>
                     </div>

                     <!-- End .auth-forgot -->

                     <!-- Submit Login -->
                     <div class="auth-control">
                        <button
                           type="submit"
                           class="auth-submit"
                           name="btnLogin"
                        >
                           Đăng nhập
                        </button>
                     </div>
                     <!-- End auth-submit -->
                  </form>
                  <!-- End .auth-form -->
               </div>
               <!-- End tab-login -------------------->

               <!-- Auth tab register -------------------->
               <div class="auth-tab auth-register d-none">
                  <div class="auth-desc">
                     Hoàn thành đăng ký, và bắt đầu trải nghiệm ngay!
                  </div>

                  <!-- Form -->
                  <form
                     action="#!"
                     method="POST"
                     class="auth-form form-register"
                  >
                     <p class="auth-message ta-c"></p>
                     <!-- Auth name -->
                     <div class="auth-control">
                        <label
                           for="auth-name-register"
                           class="auth-label"
                        >
                           Họ và tên
                        </label>
                        <div class="auth-row">
                           <input
                              class="auth-input"
                              id="auth-name-register"
                              type="text"
                              name="name"
                              placeholder="Họ và tên"
                              value=""
                           />
                        </div>
                        <div class="auth-message">
                           Vui lòng nhập thông tin
                        </div>
                     </div>
                     <!-- End .auth-name-sign-up -->

                     <!-- Auth email Sign-in -->
                     <div class="auth-control">
                        <label
                           for="auth-email-register"
                           class="auth-label"
                        >
                           Email
                        </label>
                        <div class="auth-row">
                           <input
                              type="email"
                              name="email"
                              id="auth-email-register"
                              placeholder="Email"
                              class="auth-input"
                              value=""
                           />
                        </div>
                        <p class="auth-message"></p>
                     </div>
                     <!-- End .auth-email -->

                     <!-- Auth Password Sign-up -->
                     <div class="auth-control">
                        <label
                           for="auth-password-register"
                           class="auth-label"
                        >
                           Mật khẩu
                        </label>
                        <div class="auth-row password">
                           <input
                              type="password"
                              name="password"
                              id="auth-password-register"
                              placeholder="Mật khẩu"
                              class="auth-input pass-limit"
                              value=""
                           />
                           <button type="button" class="auth-view">
                              <i class="fa-light fa-eye"></i>
                              <i class="fa-light fa-eye-slash d-none"></i>
                           </button>
                        </div>
                        <p class="auth-message"></p>
                     </div>
                     <!-- End .auth-password -->

                     <!-- Auth Term -->
                     <div class="auth-control term">
                        Bằng cách đăng ký tài khoản, bạn cũng đồng thời
                        chấp nhận mọi
                        <a href="#!">
                           điều kiện về qui định và chính sách của GenK
                        </a>
                     </div>
                     <!-- End Auth Term -->

                     <!-- Submit Register -->
                     <div class="auth-control">
                        <button
                           type="submit"
                           class="auth-submit"
                           name="btnRegister"
                        >
                           Đăng ký
                        </button>
                     </div>
                  </form>
                  <!-- End .auth-form -->
               </div>
               <!-- End tab-register -->
            </div>
            <!-- End Auth panel -->
         </div>
         <!-- End Auth account -->
         `;

         this.wrapPostBlog.classList.add("hide");
         await this.addEventAuth();

         this.wrapPostBlog.innerHTML = "";
         setTimeout(() => {
            this.wrapAccount.classList.remove("hide");
            $(".btn__account-login").classList.remove("hide");
         }, 500);
      }

      console.log("isLogin", this.isLogin());
   },

   setAccessToken: async function () {
      try {
         let userData = localStorage.getItem("login_token");
         let accessToken;

         if (userData) {
            accessToken = JSON.parse(userData).accessToken;
         }

         if (!accessToken) {
            throw new Error("accessToken not null");
         }

         client.setToken(accessToken);
      } catch (error) {
         throw error;
      }
   },

   getProfile: async function () {
      try {
         await this.setAccessToken();
         const { res, data: user } = await client.get("/users/profile");

         if (!res.ok) {
            throw user;
         }

         const profileName = $(".user__name");
         profileName.innerText = user.data.name;
      } catch (error) {
         console.log(error.message);
         this.logout();
      }
   },

   addEvent: function () {
      this.root.addEventListener("submit", (e) => {
         e.preventDefault();

         // Login
         if (e.target.classList.contains("form-login")) {
            const emailEl = e.target.querySelector("#auth-email-login");
            const passwordEl = e.target.querySelector("#auth-password-login");
            const eleMess = e.target.querySelector(".auth-message");

            const email = emailEl.value;
            const password = passwordEl.value;

            this.login({ email, password }, eleMess, e.target);
         }

         // register
         if (e.target.classList.contains("form-register")) {
            const emailEl = e.target.querySelector("#auth-email-register");
            const passwordEl = e.target.querySelector("#auth-password-register");
            const nameEl = e.target.querySelector("#auth-name-register");
            const eleMess = e.target.querySelector(".auth-message");

            const email = emailEl.value;
            const password = passwordEl.value;
            const name = nameEl.value;

            this.register({ email, password, name }, eleMess, e.target);
         }

         // Post blog
         if (e.target.classList.contains("form__post-blog")) {
            const titleEl = e.target.querySelector(".title__post-blog");
            const contentEl = e.target.querySelector(".content__post-blog");

            const title = this.stripHtml(titleEl.value);
            const content = this.stripHtml(contentEl.innerHTML);

            if (!title) {
               this.alertMess("Bạn vui lòng nhập tiêu đề trước khi đăng bài", "danger");
               return;
            } else if (!content) {
               this.alertMess("Bạn vui lòng nhập nội dung trước khi đăng bài", "danger");
               return;
            }

            this.postBlog({ title, content }, e.target);
         }
      });

      // Logout
      this.nav.addEventListener("click", async (e) => {
         if (e.target.classList.contains("btn__account-logout")) {
            e.preventDefault();

            const btnLogout = e.target;
            this.loadingBtn(true, btnLogout);

            try {
               await this.setAccessToken();
               const { res, data } = await client.post("/auth/logout");

               if (!res.ok) {
                  throw data;
               }
            } catch (error) {
               console.log(error.message);
            }

            btnLogout.classList.add("hide");
            this.alertMess("Đăng xuất thành công");
            this.logout(false);
            return;
         }

         if (e.target.classList.contains("btn__account-option")) {
            e.preventDefault();

            e.target.nextElementSibling.classList.toggle("hide");
         }
      });

      $("body").addEventListener("click", (e) => {
         if (!e.target.classList.contains("btn__account-option")) {
            $(".btn__account-logout")?.classList.add("hide");
         }
      });
   },

   login: async function (data, eleMess, eleForm) {
      this.loadingBtn(); //Thêm loading
      try {
         //Call API
         const { res, data: userData } = await client.post("/auth/login", data);

         this.loadingBtn(false); //Xóa loading
         if (!res.ok) {
            throw new Error("Email hoặc mật khẩu không hợp lệ");
         }

         const accessToken = userData.data;

         //Thêm token vào Storage (localStorage)
         localStorage.setItem("login_token", JSON.stringify(accessToken));

         this.addMessSubmit(eleMess, "Đăng nhập thành công", true);
         setTimeout(() => {
            this.btnAccountLogin.click();
            eleMess.classList.remove("success", "error");
            eleForm.reset();
            //Render
            setTimeout(() => {
               this.renderAuth();
            }, 500);
         }, 1000);
      } catch (e) {
         this.loadingBtn(false);
         this.addMessSubmit(eleMess, e.message);
      }
   },

   register: async function (data, eleMess, eleForm) {
      this.loadingBtn(true, $(".auth-submit[name=btnRegister]")); //Thêm loading
      try {
         const { res, data: userData } = await client.post("/auth/register", data);
         this.loadingBtn(false, $(".auth-submit[name=btnRegister]")); //Xóa loading
         if (!res.ok) {
            throw new Error(userData.message);
         }

         this.addMessSubmit(eleMess, "Đăng ký thành công", true);
         setTimeout(() => {
            const btnTabActive = $(".btn__tab.active");
            const btnTabNotActive = $(".btn__tab:not(.active)");
            const tabShow = $(".auth-tab:not(.d-none)");
            const tabHide = $(".auth-tab.d-none");
            const emailEl = $("#auth-email-login");
            const passwordEl = $("#auth-password-login");

            const { email, password } = data;
            emailEl.value = email;
            passwordEl.value = password;

            btnTabNotActive.classList.add("active");
            tabShow.classList.add("d-none");
            tabHide.classList.remove("d-none");
            btnTabActive.classList.remove("active");

            eleMess.classList.remove("success", "error");
            eleForm.reset();
         }, 2000);
      } catch (e) {
         this.loadingBtn(false, $(".auth-submit[name=btnRegister]"), "Đăng Ký"); //Xóa loading
         this.addMessSubmit(eleMess, e.message);
      }
   },

   logout: async function (notification = true) {
      localStorage.removeItem("login_token");
      this.renderAuth();

      if (notification) {
         await this.alertMess("Bạn vui lòng đăng nhập lại", "warning");
      }
   },

   postBlog: async function (data) {
      this.loadingBtn(true, $(".submit__post-blog"));
      try {
         await this.setAccessToken();
         const { res, data: blog } = await client.post("/blogs", data);

         this.loadingBtn(false, $(".submit__post-blog"), "Đăng bài");

         if (!res.ok) {
            throw new Error("Unauthorize");
         }

         this.alertMess("Đăng bài thành công");
         this.render([blog.data], "afterbegin", "blogList");

         const titleEl = $(".title__post-blog");
         const contentEl = $(".content__post-blog");
         titleEl.value = "";
         contentEl.innerHTML = "";
      } catch (e) {
         console.log(e.message);
         await this.alertMess("Đăng bài không thành công", "danger");
         this.logout();
      }
   },

   /* ========================= Log Date Picker ========================= */

   calcDate: function (time) {
      const now = moment();
      const momentDate = moment(time[0]).set({
         hour: now.get("hour"),
         minute: now.get("minute"),
         second: now.get("second"),
      });

      if (momentDate.isSame(now, "day")) {
         this.alertMess("Thời gian hiện tại đã được chọn 😏.", "warning");
         return;
      }

      if (momentDate.isBefore(now)) {
         this.alertMess("AccessToken cuộc sống lúc đó hết hạn rùi. 🤨", "warning");
         return;
      }

      const formattedDate = momentDate.format("D/M/YYYY H [giờ] : mm [phút]");
      const duration = moment.duration(momentDate.diff(now));

      const centuries = Math.floor(duration.asYears() / 100);
      const decades = Math.floor((duration.asYears() % 100) / 10);
      const years = Math.floor(duration.asYears() % 10);
      const days = Math.floor(duration.asDays() % 365);
      const hours = duration.hours();
      const minutes = duration.minutes();
      const seconds = duration.seconds();

      let timeUnits = [
         { value: centuries, name: "thế kỷ" },
         { value: decades, name: "thập kỷ" },
         { value: years, name: "năm" },
         { value: days, name: "ngày" },
         { value: hours, name: "giờ" },
         { value: minutes, name: "phút" },
         { value: seconds, name: "giây" },
      ];

      let timeLeft = timeUnits
         .filter((unit) => unit.value > 0)
         .map((unit) => `${unit.value} ${unit.name}`)
         .join(" ");

      this.alertMess(`Bài viết của bạn sẽ được đăng vào ${formattedDate}<br />(Còn ${timeLeft})`);
   },

   handleLogDatePicker: function () {
      const thisApp = this;
      flatpickr("#datePostBlog", {
         dateFormat: "d-m-Y",
         allowInput: true,
         onClose: function (selectedDates) {
            thisApp.calcDate(selectedDates);
         },
      });
   },

   /* ========================= Modal ========================= */
   /* === Switch tab === */
   resetForm: function (authTab) {
      authTab.querySelectorAll(".error")?.forEach((err) => {
         err.classList.remove("error");
      });
      authTab.querySelector(".auth-form").reset();
   },

   switchTab: function (btn) {
      const btnTabActive = $(".btn__tab.active");
      const tabShow = $(".auth-tab:not(.d-none)");
      const tabHide = $(".auth-tab.d-none");

      if (btn !== btnTabActive) {
         btn.classList.add("active");
         tabShow.classList.add("d-none");
         tabHide.classList.remove("d-none");
         btnTabActive.classList.remove("active");

         this.resetForm(tabShow);
         this.resetForm(tabHide);
      }
   },

   /* === Log Error === */
   getAuthMess: function (eleInput) {
      return eleInput.closest(".auth-control").querySelector(".auth-message");
   },

   addMessSubmit: function (eleMess, mess, success = false) {
      eleMess.innerHTML = `<i>${mess}</i>`;
      if (success) {
         eleMess.classList.remove("error");
         eleMess.classList.add("success");
         return;
      }
      eleMess.classList.add("error");
   },

   errInputNull: function (eleInput) {
      const inputs = eleInput.closest(".auth-tab").querySelectorAll(".auth-input");
      inputs.forEach((input) => {
         if (!input.value) {
            this.addErrInput(input);
         }
      });
   },

   addErrInput: function (eleInput, mess = "Vui lòng nhập thông tin") {
      const eleMess = this.getAuthMess(eleInput);
      eleMess.innerHTML = `<i>${mess}</i>`;
      eleMess.classList.add("error");
      eleInput.classList.add("error");
   },

   removeErrInput: function (eleInput) {
      const eleMess = this.getAuthMess(eleInput);
      eleMess.classList.remove("error");
      eleInput.classList.remove("error");
   },

   /* === Add Even Modal === */
   addEventAuth: async function () {
      const thisApp = this;

      this.btnAccountLogin = $(".btn__account-login");
      this.authOverlay = $(".auth-overlay");
      this.authBtnTabs = $$(".btn__tab");
      this.authInputs = $$(".auth-input");
      this.authViews = $$(".auth-view");
      this.authFormLogin = $(".form-login");
      this.authFormRegister = $(".form-register");

      // Btn Account
      this.btnAccountLogin.addEventListener("click", () => {
         this.authWrap.classList.toggle("show");
         this.authFormLogin.reset();
      });

      // Overlay
      this.authOverlay.addEventListener("click", () => {
         this.btnAccountLogin.click();
         const btnTabLogin = $(".btn__tab-login:not(.active)");
         btnTabLogin && this.switchTab(btnTabLogin);
         this.resetForm($(".auth-tab:not(.d-none)"));
      });

      // Switch Tab
      this.authBtnTabs.forEach((authBtnTab) => {
         authBtnTab.addEventListener("click", function () {
            thisApp.switchTab(this);
         });
      });

      // Add event validate input
      this.authInputs.forEach((authInput) => {
         // Auth Input onblur
         authInput.addEventListener("blur", function () {
            thisApp.errInputNull(this);
         });

         // Auth Input onkeypress
         authInput.addEventListener("input", function () {
            thisApp.errInputNull(this);

            this.value && this.classList.contains("error") && thisApp.removeErrInput(this);
         });

         // Auth Input Email
         if (authInput.type === "email") {
            authInput.addEventListener("input", function () {
               if (!thisApp.regexEmail.test(this.value) && this.value) {
                  thisApp.addErrInput(this, "Vui lòng nhập đúng định dạng email");
               } else if (!this.value) {
                  thisApp.addErrInput(this);
               } else {
                  thisApp.removeErrInput(this);
               }
            });
         }

         // Auth Input Password minmax
         if (authInput.classList.contains("pass-limit")) {
            authInput.addEventListener("input", function () {
               if (!this.value) {
                  thisApp.addErrInput(this);
               } else if (/^.{1,7}$/.test(this.value)) {
                  thisApp.addErrInput(this, "Mật khẩu tối thiểu 8 ký tự");
               } else if (!/[A-Z]/.test(this.value)) {
                  thisApp.addErrInput(this, "Mật khẩu phải chứa ít nhất một chữ cái hoa");
               } else if (!/\d/.test(this.value)) {
                  thisApp.addErrInput(this, "Mật khẩu phải chứa ít nhất một chữ số");
               } else {
                  thisApp.removeErrInput(this);
               }
            });
         }
      });

      // Toggle Password Visibility
      this.authViews.forEach((authView) => {
         authView.addEventListener("click", function () {
            const inputPass = this.previousElementSibling;
            const showPass = this.querySelector(".fa-eye");
            const hidePass = this.querySelector(".fa-eye-slash");

            if (inputPass.type === "password") {
               inputPass.type = "text";
               showPass.classList.add("d-none");
               hidePass.classList.remove("d-none");
            } else {
               inputPass.type = "password";
               showPass.classList.remove("d-none");
               hidePass.classList.add("d-none");
            }
         });
      });
   },

   // Khởi động app
   start: function () {
      this.getBlogs(this.query);
      this.handleScrollLoad();
      this.addEvent();
      this.renderAuth();
      this.isFirstLoad = false;
   },
};

//Chạy app
app.start();
