const btnCreateUser = document.querySelector("#btnCreateUser");
const editBtns = document.querySelectorAll(".btn-edit");
const modalFormUser = document.querySelector("#modalFormUser");
const formUser = document.querySelector("#formUser");
const headingModal = document.querySelector("#headingModal");
const inputEmail = document.querySelector("#inputEmail");
const inputName = document.querySelector("#inputName");
const inputStatus = document.querySelector("#inputStatus");
const inputId = document.querySelector("#inputId");
const btnSubmitFormUser = document.querySelector("#btnSubmitFormUser");
const delBtns = document.querySelectorAll(".btn-del");
const nameWillDel = document.querySelector("#nameWillDel");
const emailWillDel = document.querySelector("#emailWillDel");
const inputDelUser = document.querySelector("#inputDelUser");
const messErrors = document.querySelectorAll(".mess-error");
const btnShowError = document.querySelector("#showError");
const messName = document.querySelector("#messName");
const messEmail = document.querySelector("#messEmail");

if (btnShowError.dataset.isError === "true") {
    const isCreate = btnShowError.dataset.errorFrom === "create";
    headingModal.innerText = isCreate ? "Thêm người dùng" : "Sửa người dùng";
    btnSubmitFormUser.innerText = isCreate ? "Thêm mới" : "Sửa";
    formUser.action = isCreate ? "/users/create" : "/users/edit";
    btnShowError.click();
}

editBtns.forEach((editBtn) => {
    editBtn.addEventListener("click", function () {
        const userId = this.dataset.id;
        const userName = this.dataset.name;
        const userEmail = this.dataset.email;
        const userStatus = this.dataset.status;

        messName.innerText = "";
        messEmail.innerText = "";

        inputId.value = userId;
        inputName.value = userName;
        inputEmail.value = userEmail;
        inputStatus.checked = userStatus === "true";
        headingModal.innerText = "Sửa người dùng";
        btnSubmitFormUser.innerText = "Sửa";
        formUser.action = "/users/edit";
    });
});

btnCreateUser.addEventListener("click", () => {
    inputName.value = "";
    inputEmail.value = "";
    messName.innerText = "";
    messEmail.innerText = "";
    inputStatus.checked = false;

    formUser.action = "/users/create";
    headingModal.innerHTML = "Thêm người dùng";
    btnSubmitFormUser.innerHTML = "Thêm mới";
});

delBtns.forEach((delBtn) => {
    delBtn.addEventListener("click", function () {
        const userId = this.dataset.id;
        const userName = this.dataset.name;
        const userEmail = this.dataset.email;

        nameWillDel.innerText = userName;
        emailWillDel.innerText = userEmail;
        inputDelUser.value = userId;
    });
});
