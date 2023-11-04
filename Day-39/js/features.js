import { client } from "./client.js";
import { render } from "./render.js";
import { renderBlogUser } from "./render.js";
import patternsRegex from "./patterns-regex.js";
import { alertMess } from "./alert-mess.js";
import { calcDate } from "./date-picker.js";
import { app } from "./index.js";

const { stripHtml, regexEmail } = patternsRegex;

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

export const features = {
   root: $(".blog"),
   nav: $(".nav"),
   authWrap: $(".auth-wrap"),
   wrapAccount: $(".wrap__account"),
   wrapPostBlog: $(".wrap__post-blog"),
   alertMess,
   stripHtml,
   render,

   handleLogDatePicker: function () {
      flatpickr("#datePostBlog", {
         dateFormat: "d-m-Y",
         allowInput: true,
         onClose: function (selectedDates) {
            calcDate(selectedDates);
         },
      });
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

   isLogin: function () {
      const status = localStorage.getItem("login_token") ? true : false;
      return status;
   },

   isPageBlogs: function () {
      return localStorage.getItem("user-id");
   },

   getIdMe: function () {
      try {
         let userData = localStorage.getItem("login_token");
         let userId;

         if (userData) {
            userId = JSON.parse(userData)._id;
         }

         if (!userId) {
            throw new Error("userId not null");
         }

         return userId;
      } catch (error) {
         console.err(error.message);
         return null;
      }
   },

   backHome: function () {
      localStorage.removeItem("user-id");
      location.reload();
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

   setEventFormAuthen: async function () {
      const btnAccountLogin = $(".btn__account-login");
      const authOverlay = $(".auth-overlay");
      const authBtnTabs = $$(".btn__tab");
      const authInputs = $$(".auth-input");
      const authViews = $$(".auth-view");
      const authFormLogin = $(".form-login");

      const getAuthMess = (eleInput) => {
         return eleInput.closest(".auth-control").querySelector(".auth-message");
      };

      const resetForm = (authTab) => {
         authTab.querySelectorAll(".error")?.forEach((err) => {
            err.classList.remove("error");
         });
         authTab.querySelector(".auth-form").reset();
      };

      const switchTab = (btn) => {
         const btnTabActive = $(".btn__tab.active");
         const tabShow = $(".auth-tab:not(.d-none)");
         const tabHide = $(".auth-tab.d-none");

         if (btn !== btnTabActive) {
            btn.classList.add("active");
            tabShow.classList.add("d-none");
            tabHide.classList.remove("d-none");
            btnTabActive.classList.remove("active");

            resetForm(tabShow);
            resetForm(tabHide);
         }
      };

      const addErrInput = (eleInput, mess = "Vui lòng nhập thông tin") => {
         const eleMess = getAuthMess(eleInput);
         eleMess.innerHTML = `<i>${mess}</i>`;
         eleMess.classList.add("error");
         eleInput.classList.add("error");
      };

      const errInputNull = (eleInput) => {
         const inputs = eleInput.closest(".auth-tab").querySelectorAll(".auth-input");
         inputs.forEach((input) => {
            if (!input.value) {
               addErrInput(input);
            }
         });
      };

      const removeErrInput = (eleInput) => {
         const eleMess = getAuthMess(eleInput);
         eleMess.classList.remove("error");
         eleInput.classList.remove("error");
      };

      // Btn Account
      btnAccountLogin.addEventListener("click", () => {
         $(".auth-wrap").classList.toggle("show");
         authFormLogin.reset();
      });

      // Overlay
      authOverlay.addEventListener("click", () => {
         btnAccountLogin.click();
         const btnTabLogin = $(".btn__tab-login:not(.active)");
         btnTabLogin && switchTab(btnTabLogin);
         resetForm($(".auth-tab:not(.d-none)"));
      });

      // Switch Tab
      authBtnTabs.forEach((authBtnTab) => {
         authBtnTab.addEventListener("click", function () {
            switchTab(this);
         });
      });

      // Add event validate input
      authInputs.forEach((authInput) => {
         // Auth Input onblur
         authInput.addEventListener("blur", function () {
            errInputNull(this);
         });

         // Auth Input onkeypress
         authInput.addEventListener("input", function () {
            errInputNull(this);

            this.value && this.classList.contains("error") && removeErrInput(this);
         });

         // Auth Input Email
         if (authInput.type === "email") {
            authInput.addEventListener("input", function () {
               if (!regexEmail.test(this.value) && this.value) {
                  addErrInput(this, "Vui lòng nhập đúng định dạng email");
               } else if (!this.value) {
                  addErrInput(this);
               } else {
                  removeErrInput(this);
               }
            });
         }

         // Auth Input Password minmax
         if (authInput.classList.contains("pass-limit")) {
            authInput.addEventListener("input", function () {
               if (!this.value) {
                  addErrInput(this);
               } else if (/^.{1,7}$/.test(this.value)) {
                  addErrInput(this, "Mật khẩu tối thiểu 8 ký tự");
               } else if (!/[A-Z]/.test(this.value)) {
                  addErrInput(this, "Mật khẩu phải chứa ít nhất một chữ cái hoa");
               } else if (!/\d/.test(this.value)) {
                  addErrInput(this, "Mật khẩu phải chứa ít nhất một chữ số");
               } else {
                  removeErrInput(this);
               }
            });
         }
      });

      // Toggle Password Visibility
      authViews.forEach((authView) => {
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

   renderAuth: async function (userName) {
      const isLogin = this.isLogin();
      const userId = this.isPageBlogs();

      if (isLogin) {
         this.authWrap.innerHTML = "";

         this.wrapAccount.innerHTML = `
              <button class="btn__account-option">
                 <span class="user__hi">Chào,</span>
                 <span class="user__name"><i class="fa fa-spinner fa-spin"></i><span>Loading...</span></span>
                 <a href="#!" class="user__avatar">
                    <img
                       src="https://source.boringavatars.com/beam/50?${this.getIdMe()}"
                       alt="user avatar"
                       class="user__avatar-img"
                    />
                 </a>
              </button>
              <button class="btn__account-logout hide">ĐĂNG XUẤT</button>`;

         this.getProfile();

         if (!userId) {
            this.wrapPostBlog.innerHTML = `
            <div class="post-blog__inner">
               <h2 class="heading__post-blog">Tạo một blog mới</h2>
               <form action="" method="post" class="form__post-blog">
                  <label for="titlePostBlog">Tiêu đề</label>
                  <input type="text" name="titlePostBlog" class="title__post-blog" id="titlePostBlog" />
                  <label for="contentPostBlog">Nội dung</label>
                  <textarea name="contentPostBlog" id="contentPostBlog" class="content__post-blog"></textarea>
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
            this.wrapPostBlog.classList.remove("hide");
         }
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
         await this.setEventFormAuthen();

         this.wrapPostBlog.innerHTML = "";
         setTimeout(() => {
            this.wrapAccount.classList.remove("hide");
            $(".btn__account-login").classList.remove("hide");
         }, 500);
      }

      const wrapHeading = $(".wrap__heading");
      const heading = wrapHeading.querySelector(".heading-content");

      if (userId) {
         const headingLoad = wrapHeading.querySelector(".heading__loading");
         const userAvatar = wrapHeading.querySelector(".user__avatar");
         const userAvatarImg = wrapHeading.querySelector(".user__avatar-img");
         const wrapBtnHome = $(".wrap-btn__home");

         headingLoad.classList.remove("hide");
         userAvatarImg.src = `https://source.boringavatars.com/beam/50?${userId}`;
         userAvatar.classList.remove("hide");
         heading.innerHTML = app.profileUser.username;
         headingLoad.classList.add("hide");
         wrapBtnHome.classList.remove("hide");
      } else {
         heading.innerHTML = "New Blogs";
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
            const content = this.stripHtml(contentEl.value);

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

      // Watch Blogs a User
      this.root.addEventListener("click", (e) => {
         const el = e.target.classList;

         switch (true) {
            case el.contains("user__name-link"):
            case el.contains("user__avatar-img"):
               var blogItem = e.target.closest(".blog-item");
               const userName = blogItem.querySelector(".user__name a");
               const userAvatar = blogItem.querySelector(".user__avatar-img");

               const regexIndexUser = /\?(\w+)$/;
               const name = userName.innerHTML;
               const userId = userAvatar.src.match(regexIndexUser)[1];
               localStorage.setItem("user-id", userId);
               renderBlogUser(name, userAvatar.src, userId);
               break;
            case el.contains("blog-item__link"):
               var modalBlog = $(".modal__blog-item");
               var blogItem = e.target.closest(".blog-item");
               var modalBlogItem = modalBlog.querySelector(".blog-item");
               const modalBlogOverlay = modalBlog.querySelector(".blog-item__overlay");
               modalBlogItem.innerHTML = blogItem.innerHTML;
               setTimeout(() => {
                  modalBlog.classList.remove("hide");
               }, 200);

               modalBlogOverlay.addEventListener("click", function hideModalBlogItem() {
                  modalBlog.classList.add("hide");
                  modalBlog.addEventListener("transitionend", function removeContent() {
                     modalBlogItem.innerHTML = "";
                     modalBlog.removeEventListener("transitionend", removeContent);
                     modalBlogOverlay.removeEventListener("click", hideModalBlogItem);
                  });
               });
               break;

            default:
               break;
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

         if (e.target.classList.contains("home")) {
            this.backHome();
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
            $(".btn__account-login").click();
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
         this.alertMess("Bạn vui lòng đăng nhập lại", "warning");
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
         this.render({ blogs: [blog.data], position: "afterbegin", root: ".blog-list" });

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
};
