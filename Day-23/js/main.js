const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const btnAccount = $(".btn__account");
const authWrap = $(".auth-wrap");
const authOverlay = $(".auth-overlay");
const authBtnTabs = $$(".btn__tab");
const authTabs = $$(".auth-tab");
const authInputs = $$(".auth-input");
const authViews = $$(".auth-view");
const authFormLogin = $(".form-login");
const authFormRegister = $(".form-register");

const regexEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

const users = [{ name: "Khai", email: "khai@gmail.com", password: "123456" }];

/* ========================= Switch tab ========================= */
function resetForm(authTab) {
   authTab.querySelectorAll(".error")?.forEach((err) => {
      err.classList.remove("error");
   });
   authTab.querySelector(".auth-form").reset();
}

function switchTab(btn) {
   const btnTabActive = $(".btn__tab.active");
   const tabShow = $(".auth-tab:not(.d-none)");
   const tabHide = $(".auth-tab.d-none");

   if (btn !== btnTabActive) {
      btn.classList.add("active");
      tabShow.classList.add("d-none");
      tabHide.classList.remove("d-none");
      btnTabActive.classList.remove("active");

      resetForm(tabShow);
   }
}
// Btn Account
btnAccount.onclick = function () {
   authWrap.classList.toggle("show");
};

// Overlay
authOverlay.onclick = function () {
   btnAccount.onclick();
   resetForm($(".auth-tab:not(.d-none)"));
};

// Switch Tab
authBtnTabs.forEach((authBtnTab) => {
   authBtnTab.addEventListener("click", function () {
      switchTab(this);
   });
});

/* ========================= Log Error ========================= */
function getAuthMess(eleInput) {
   return eleInput.closest(".auth-control").querySelector(".auth-message");
}

function addErrInput(eleInput, mess = "Vui lòng nhập thông tin") {
   const eleMess = getAuthMess(eleInput);
   eleMess.innerHTML = `<i>${mess}</i>`;
   eleMess.classList.add("error");
   eleInput.classList.add("error");
}

function removeErrInput(eleInput) {
   const eleMess = getAuthMess(eleInput);
   eleMess.classList.remove("error");
   eleInput.classList.remove("error");
}

function errInputNull(eleInput) {
   const inputs = eleInput.closest(".auth-tab").querySelectorAll(".auth-input");
   inputs.forEach((input) => {
      if (!input.value) {
         addErrInput(input);
      }
   });
}

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
         if (this.value.length < 6 || this.value.length > 20) {
            addErrInput(this, "Mật khẩu tối thiểu 6 - 20 ký tự");
         } else {
            removeErrInput(this);
         }
      });
   }
});

/* ========================= Toggle Password Visibility ========================= */
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

/* ========================= Submit form ========================= */
function addMessSubmit(eleMess, mess, success = false) {
   eleMess.innerHTML = `<i>${mess}</i>`;
   if (success) {
      eleMess.classList.remove("error");
      eleMess.classList.add("success");
      return;
   }
   eleMess.classList.add("error");
}

// Login
authFormLogin.addEventListener("submit", function (event) {
   event.preventDefault();
   const emailUser = this.querySelector("#auth-email-login");
   const passUser = this.querySelector("#auth-password-login");
   if (emailUser.value && passUser.value) {
      const authMess = this.querySelector(".auth-message");
      let nameUser;
      let matchPass;
      let matchEmail = users.some((user) => {
         if (user.email === emailUser.value) {
            matchPass = user.password === passUser.value;
            nameUser = user.name;
            return true;
         }
      });

      if (!matchEmail) {
         addMessSubmit(authMess, "Account not existed.");
      } else if (!matchPass) {
         addMessSubmit(authMess, "Wrong password.");
      } else {
         addMessSubmit(authMess, "Đăng nhập thành công", true);
         setTimeout(() => {
            btnAccount.onclick();
            authMess.classList.remove("success", "error");
            this.reset();
         }, 1000);
      }
   } else {
      errInputNull(emailUser);
   }
});

// Register
authFormRegister.addEventListener("submit", function (event) {
   event.preventDefault();
   const nameUser = this.querySelector("#auth-name-register");
   const emailUser = this.querySelector("#auth-email-register");
   const passUser = this.querySelector("#auth-password-register");
   if (nameUser.value && emailUser.value && passUser.value) {
      const authMess = this.querySelector(".auth-message");
      let matchEmail = users.some((user) => user.email === emailUser.value);

      if (matchEmail) {
         addMessSubmit(authMess, "Email này đã được sử dụng để đăng ký");
      } else {
         addMessSubmit(authMess, "Đăng ký thành công", true);
         users.push({
            name: nameUser.value,
            email: emailUser.value,
            password: passUser.value,
         });
         setTimeout(() => {
            switchTab($(".btn__tab:not(.active)"));
            authMess.classList.remove("success", "error");
            this.reset();
         }, 1000);
      }
   } else {
      errInputNull(nameUser);
   }
});
