const loginBtn = document.querySelector("#buttonLoginModal");
const loginModalBg = document.querySelector(".loginModalBg");
const loginBtnClose = document.querySelector("#buttonCloseLoginModal");

loginBtn.addEventListener("click", function () {
  loginModalBg.classList.add("loginModalActive");
});

loginBtnClose.addEventListener("click", function () {
  loginModalBg.classList.remove("loginModalActive");
});

const registerBtn = document.querySelector("#buttonRegisterModal");
const registerModalBg = document.querySelector(".registerModalBg");
const registerBtnClose = document.querySelector("#buttonCloseRegisterModal");

registerBtn.addEventListener("click", function () {
  registerModalBg.classList.add("registerModalActive");
});

registerBtnClose.addEventListener("click", function () {
  registerModalBg.classList.remove("registerModalActive");
});
