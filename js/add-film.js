const buttonAddFilm = document.querySelector(".profile__button");
const main = document.querySelector(".main");
const modalAddFilm = document.querySelector(".modal-add-film");

buttonAddFilm.addEventListener("click", () => {
  if (modalAddFilm.classList.contains("open")) {
    return;
  }
  document.body.style.paddingRight =
    window.innerWidth - document.body.clientWidth + "px";
  document.body.style.overflow = "hidden";

  modalAddFilm.classList.add("open");

  const modalAddFilmOverlay = document.querySelector(
    ".modal-add-film__overlay"
  );
  const modalAddFilmCloseButton = document.querySelector(
    ".modal-add-film__close"
  );
  const modalAddFilmLoadFile = document.querySelector(
    ".modal-add-film__file-loader"
  );
  const modalAddFilmSubmitButton = document.querySelector(
    ".modal-add-film__button-submit"
  );
  const modalAddFilmName = document.querySelector(".modal-add-film__name");

  modalAddFilmName.focus();

  let srcImage;

  modalAddFilmLoadFile.addEventListener("change", readFile);

  function readFile() {
    let file = modalAddFilmLoadFile.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      srcImage = reader.result;
      modalAddFilmLoadFile.value = "";
    };
    modalAddFilmSubmitButton.classList.add("active");
  }

  function submitNewFilm() {
    if (modalAddFilmName.value.length === 0) {
      modalAddFilmName.classList.add("empty-string");
      modalAddFilmName.focus();
      return;
    } else if (!srcImage) {
      return;
    }
    const newItemIntoMain = document.createElement("div");
    newItemIntoMain.classList.add("main__item");
    newItemIntoMain.insertAdjacentHTML(
      "afterbegin",
      `
      <div class="main__image-wrap">
          <img src="${srcImage}" alt="" class="main__image" />
      </div>
      <div class="main__description-wrap">
          <h2 title="${modalAddFilmName.value}" class="main__description">${modalAddFilmName.value}</h2>
          <label class="main__checkbox">
          <input
            type="checkbox"
            class="main__checkbox__input visually-hidden"
          />
          <svg class="main__checkbox-like">
            <use href="#like"></use>
          </svg>
        </label>
      </div>`
    );

    main.append(newItemIntoMain);
    modalAddFilmSubmitButton.removeEventListener("click", submitNewFilm);
    modalAddFilm.classList.add("submit");
    setTimeout(() => {
      resetForWindow("submit");
    }, 300);
  }

  function closeWindow() {
    modalAddFilmSubmitButton.removeEventListener("click", submitNewFilm);
    modalAddFilm.classList.add("close");
    setTimeout(() => {
      resetForWindow("close");
    }, 300);
  }

  function resetForWindow(closeOrSubmit) {
    modalAddFilmName.classList.remove("empty-string");
    modalAddFilmName.value = "";
    modalAddFilmSubmitButton.classList.remove("active");
    modalAddFilm.classList.remove("open");
    modalAddFilm.classList.remove(closeOrSubmit);
    document.body.style.overflow = "visible";
    document.body.style.paddingRight = 0;
  }

  modalAddFilmSubmitButton.addEventListener("click", submitNewFilm);

  modalAddFilmCloseButton.addEventListener("click", closeWindow);
  modalAddFilmOverlay.addEventListener("mousedown", (e) => {
    if (e.target !== modalAddFilmOverlay) {
      return;
    }
    closeWindow();
  });
});
