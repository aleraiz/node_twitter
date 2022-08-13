const loginBtn = document.querySelector("#buttonLoginModal");
const loginModalBg = document.querySelector(".loginModalBg");

loginBtn.addEventListener("click", function () {
  loginModalBg.classList.add("loginModalActive");
});
