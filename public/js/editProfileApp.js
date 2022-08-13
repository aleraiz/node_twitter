const editProfileBtn = document.querySelector(".modalBtn");
const editModalBg = document.querySelector(".editModalBg");
const editBtnClose = document.querySelector(".editModalCloseBtn");

editProfileBtn.addEventListener("click", function () {
  editModalBg.classList.add("editModalActive");
});

editBtnClose.addEventListener("click", function () {
  editModalBg.classList.remove("editModalActive");
});
