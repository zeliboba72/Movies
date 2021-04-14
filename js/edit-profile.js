const editButton = document.querySelector(".profile__edit");
const nameProfile = document.querySelector(".profile__name");
const businessProfile = document.querySelector(".profile__business");
const modalEdit = document.querySelector(".modal-edit");

editButton.addEventListener("click", () => {
  if (modalEdit.classList.contains("open")) {
    return;
  }
  document.body.style.paddingRight =
    window.innerWidth - document.body.clientWidth + "px";
  document.body.style.overflow = "hidden";

  modalEdit.classList.add("open");

  const editModalOverlay = document.querySelector(".modal-edit__overlay");
  const editModalCloseButton = document.querySelector(".modal-edit__close");
  const editModalInputName = document.querySelector(".modal-edit__name");
  const editModalInputBusiness = document.querySelector(
    ".modal-edit__business"
  );
  const editModalSubmit = document.querySelector(".modal-edit__button");

  editModalInputName.focus();

  editModalInputName.value = nameProfile.title;
  editModalInputBusiness.value = businessProfile.title;

  function submit() {
    if (editModalInputName.value.length === 0) {
      if (editModalInputBusiness.value.length === 0) {
        editModalInputBusiness.classList.add("empty-string");
      }
      editModalInputName.classList.add("empty-string");
      editModalInputName.focus();
      return;
    } else if (editModalInputBusiness.value.length === 0) {
      editModalInputBusiness.classList.add("empty-string");
      editModalInputBusiness.focus();
      return;
    }

    editModalInputName.classList.remove("empty-string");
    editModalInputBusiness.classList.remove("empty-string");
    nameProfile.innerHTML = editModalInputName.value;
    nameProfile.title = editModalInputName.value;
    businessProfile.innerHTML = editModalInputBusiness.value;
    businessProfile.title = editModalInputBusiness.value;

    modalEdit.classList.add("submit");
    setTimeout(() => {
      modalEdit.classList.remove("open");
      modalEdit.classList.remove("submit");
      document.body.style.overflow = "visible";
      document.body.style.paddingRight = 0;
    }, 300);
  }

  function closingWindow() {
    editModalInputName.classList.remove("empty-string");
    editModalInputBusiness.classList.remove("empty-string");
    modalEdit.classList.add("close");
    setTimeout(() => {
      modalEdit.classList.remove("open");
      modalEdit.classList.remove("close");
      document.body.style.overflow = "visible";
      document.body.style.paddingRight = 0;
    }, 300);
  }

  editModalOverlay.addEventListener("mousedown", (e) => {
    if (e.target !== editModalOverlay) {
      return;
    }
    closingWindow();
  });
  editModalCloseButton.addEventListener("click", closingWindow);
  editModalSubmit.addEventListener("click", submit);
});
