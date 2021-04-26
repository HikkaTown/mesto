"use strict";
import Card from './Card.js';
import FormValidator from './FormValidator.js';
// находим блок с карточками
const photocardList = document.querySelector(".photocard__items");
// элементы для открытия попапа профиля и его редактирования
const editProfileBtn = document.querySelector(".profile__edit-btn");
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const editProfileForm = document.querySelector(
  ".popup__container_type_edit-form"
);
const nameInput = editProfileForm.querySelector(".popup__input_type_name");
const jobInput = editProfileForm.querySelector(".popup__input_type_job");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const editCloseBtn = document.querySelector(".popup__close_type_edit-close");
// элементы для открытия попапа добавления картинки и его редактирования
const addImageBtn = document.querySelector(".profile__add-btn");
const popupAddImage = document.querySelector(".popup_type_add-card");
const addImageForm = document.querySelector(".popup__container_type_add-form");
const nameImage = addImageForm.querySelector(".popup__input_type_name-card");
const urlImage = addImageForm.querySelector(".popup__input_type_url-img");
const addCloseBtn = document.querySelector(".popup__close_type_add-form");
// попап с картинкой
const popupImage = document.querySelector(".popup_type_image");
const popupImageContainer = popupImage.querySelector(
  ".popup__container_type_image"
);
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
// объект параметров для сброса формы
const resetFormSettings = {
  formSelector: 'form.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorSelector: '.popup__error',
  errorVisible: 'popup__error_visible'
};

// слушатель на крестики для попапов отдельно
editCloseBtn.addEventListener("click", (e) => {
  closePopup(popupEditProfile);
});
addCloseBtn.addEventListener("click", (e) => {
  closePopup(popupAddImage);
});
// колбэк для закрытия попапа по клику на оверлей или нажатия Escape
function handlerExitPopup(e) {
  const popup = document.querySelector(".popup_opened");
  if (e.key === "Escape" || e.target === popup) {
    closePopup(popup);
  }
}
// функция для удаления слушателя с window и оверлея
function removeListenerExitPopup(popup) {
  popup.removeEventListener("click", handlerExitPopup);
  window.removeEventListener("keyup", handlerExitPopup);
}

// удалить
function setListenerExitPopup(popup) {
  popup.addEventListener("click", handlerExitPopup);
  window.addEventListener("keyup", handlerExitPopup);
}

// добавление карточек
function renderCard(cardData) {
  // переворачиваю входной массив чтобы карточки появились как нужно и отдельно добавленная картачка встала первой
  cardData.reverse().forEach((data) => {
    const card = new Card(data, '.myTemplateCard');
    const cardElement = card.generateCard();
    photocardList.prepend(cardElement);
  });
}
// добавление карты
addImageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // передаю подготовленный объект
  renderCard([{ name: nameImage.value, link: urlImage.value }]);
  // очищаю инпуты для следующего добавления
  // addImageForm.reset();
  closePopup(popupAddImage);
});
// добавляю класс с анимацией чтобы не было рывков при загрузке страницы
setTimeout(() => {
  popupEditProfile.classList.add("animation-transition");
  popupAddImage.classList.add("animation-transition");
  popupImage.classList.add("animation-transition");
}, 500);
// открытие попапа с добавлением картинки
addImageBtn.addEventListener("click", (e) => {
  // очищение формы
  resetForm(popupAddImage, resetFormSettings);
  // открытие попапа
  openPopup(popupAddImage);
});
// открытие формы при клики на кнопку редактировать
editProfileBtn.addEventListener("click", (e) => {
  // очищение формы
  resetForm(popupEditProfile, resetFormSettings);
  // открытие попапа
  openPopup(popupEditProfile);
  // подготовка инпутов
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});
// обработчик событий для сохранения редактирования формы редактирования профиля
editProfileForm.addEventListener("submit", handleProfileSubmit);

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.querySelector(".page").classList.add("overflow-hidden");
  // функция вешает обработчики на нужные элементы
  setListenerExitPopup(popup);
}
// Скрываем попапы с помощью функции
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.querySelector(".page").classList.remove("overflow-hidden");
  // удаляем слушатель с window и оверлея popup
  removeListenerExitPopup(popup);
}
// форма сбрасывает ошибки и т.д после закрытия формы
function resetForm(popup, selectors) {
  const form = popup.querySelector(selectors.formSelector);
  form.reset();
  const formInput = form.querySelectorAll(selectors.inputSelector);
  const warrning = form.querySelectorAll(selectors.errorSelector);
  const submitButton = form.querySelector(selectors.submitButtonSelector);
  formInput.forEach((item) => {
    if (item.classList.contains(selectors.inputErrorClass)) {
      item.classList.remove(selectors.inputErrorClass);
    }
  });
  warrning.forEach((item) => {
    if (item.classList.contains(selectors.errorVisible)) {
      item.classList.remove(selectors.errorVisible);
    }
  });
  if (submitButton.classList.contains(selectors.inactiveButtonClass)) {
    submitButton.classList.remove(selectors.inactiveButtonClass);
    submitButton.disabled = false;
  }
  if (form.classList.contains("popup__container_type_add-form")) {
    submitButton.classList.add(selectors.inactiveButtonClass);
    submitButton.disabled = true;
  }
}

function handleProfileSubmit(e) {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
}
// функция рендера карточек
renderCard(initialCards);
const formList = document.querySelectorAll('form.popup__container').forEach((formElement) => {
  const validForm = new FormValidator(
    {
      inputSelector: '.popup__input',
      submitButtonSelector: '.popup__submit',
      inactiveButtonClass: 'popup__submit_disabled',
      inputErrorClass: 'popup__input_type_error',
      errorSelector: '.popup__error',
      errorVisible: 'popup__error_visible'
    },
    formElement
  );
  validForm.enableValidation();
});