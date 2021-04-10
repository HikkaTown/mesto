'use strict'
// находим блок с карточками
const photocardList = document.querySelector('.photocard__items');
// элементы для открытия попапа профиля и его редактирования
const editProfileBtn = document.querySelector('.profile__edit-btn');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const editProfileForm = document.querySelector('.popup__container_type_edit-form');
const nameInput = editProfileForm.querySelector('.popup__input_type_name');
const jobInput = editProfileForm.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const editCloseBtn = document.querySelector('.popup__close_type_edit-close');
// элементы для открытия попапа добавления картинки и его редактирования
const addImageBtn = document.querySelector('.profile__add-btn');
const popupAddImage = document.querySelector('.popup_type_add-card');
const addImageForm = document.querySelector('.popup__container_type_add-form');
const nameImage = addImageForm.querySelector('.popup__input_type_name-card');
const urlImage = addImageForm.querySelector('.popup__input_type_url-img');
const addCloseBtn = document.querySelector('.popup__close_type_add-form');
// попап с картинкой
const popupImage = document.querySelector('.popup_type_image');
const popupImageContainer = popupImage.querySelector('.popup__container_type_image');
const popupImageCloseBtn = popupImageContainer.querySelector('.popup__close_type_image');
const popupImagePicture = popupImageContainer.querySelector('.popup__image');
const popupImageText = popupImageContainer.querySelector('.popup__title-image');
const cardTemplate = document.querySelector('.myTemplateCard');

function openImage(name, link, popupName) {
  renderImagePrev(name, link);
  openPopup(popupName);
}

function cardLikeToggle(e) {
  e.target.classList.toggle('photocard__like-btn_active');
}
// удаление картчоки
function deletCard(e) {
  const delCardBtn = e.target.closest('.photocard__item');
  photocardList.removeChild(delCardBtn);
}

function setListenerExitPopup(popup) {
  const closeBtn = popup.querySelector('.popup__close');
  popup.addEventListener('click', handlerExitPopup);
  closeBtn.addEventListener('click', handlerExitPopup);
  window.addEventListener('keyup', handlerExitPopup);
  function handlerExitPopup(e) {
    if(e.target == popup || e.key == 'Escape' || e.target == closeBtn) {
      closePopup(popup);
      removeListenerExitPopup();
    }
  }
  function removeListenerExitPopup() {
    popup.removeEventListener('click', handlerExitPopup);
    closeBtn.removeEventListener('click', handlerExitPopup);
    window.removeEventListener('keyup', handlerExitPopup);
  }
}

// функция рендера карточек из коробки
function createCard(cardData) {
  const card = cardTemplate.content.cloneNode(true);
  const imageCard = card.querySelector('.photocard__image');
  imageCard.src = cardData.link;
  imageCard.alt = cardData.name;
  const nameCard = card.querySelector('.photocard__title');
  nameCard.textContent = cardData.name;
  // сразу вешаю слушатель на картику, чтобы открывать попап
  // ---- вынес openImage
  imageCard.addEventListener('click', (e) => {
    openImage(cardData.name, cardData.link, popupImage);
  });
  const likeCard = card.querySelector('.photocard__like-btn');
  likeCard.addEventListener('click', cardLikeToggle);
  const trashIcon = card.querySelector('.photocard__delet-btn');
  trashIcon.addEventListener('click', deletCard);
  return card;
}

function renderCard(arr) {
  // переворачиваю входной массив чтобы карточки появились как нужно и отдельно добавленная картачка встала первой
  arr.reverse().forEach(item => {
    photocardList.prepend(createCard(item));
  })
}

// при октрытие предпросмотра подгружаем название и саму картинку
function renderImagePrev(name, url) {
  popupImagePicture.src = url;
  popupImagePicture.alt = name;
  popupImageText.textContent = name;
}
// добавление карты
addImageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // передаю подготовленный объект
  renderCard([{name: nameImage.value , link: urlImage.value }]);
  // очищаю инпуты для следующего добавления
  // addImageForm.reset();
  closePopup(popupAddImage);
});

// добавляю класс с анимацией чтобы не было рывков при загрузке страницы
setTimeout(() => {
  popupEditProfile.classList.add('animation-transition');
  popupAddImage.classList.add('animation-transition');
  popupImage.classList.add('animation-transition');
}, 500);

// открытие попапа с добавлением картинки
addImageBtn.addEventListener('click', (e) => {
  openPopup(popupAddImage);
});
// открытие формы при клики на кнопку редактировать
editProfileBtn.addEventListener('click', (e) => {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});
// обработчик событий для сохранения редактирования формы редактирования профиля
editProfileForm.addEventListener('submit', handleProfileSubmit);

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.querySelector('.page').classList.add('overflow-hidden');
  // функция вешает обработчики на нужные элементы, и удаляет слушателя после срабатывания через замыкание
  setListenerExitPopup(popup);
}
// Скрываем попапы с помощью функции
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.querySelector('.page').classList.remove('overflow-hidden');
  resetForm(popup, settings);
}
// форма сбрасывает ошибки и т.д после закрытия формы
function resetForm(popup, selectors) {
  const form = popup.querySelector(selectors.formSelector);
  if(form) {
    form.reset();
    const formInput = form.querySelectorAll(selectors.inputSelector);
    const warrning = form.querySelectorAll(selectors.errorSelector);
    const submitButton = form.querySelector(selectors.submitButtonSelector);
    formInput.forEach((item) => {
      if(item.classList.contains(selectors.inputErrorClass)) {
        item.classList.remove(selectors.inputErrorClass);
      }
    });
    warrning.forEach((item) => {
      if(item.classList.contains(selectors.errorVisible)) {
        item.classList.remove(selectors.errorVisible);
      }
    });
    if(submitButton.classList.contains(selectors.inactiveButtonClass)) {
      submitButton.classList.remove(selectors.inactiveButtonClass);
      submitButton.disabled = false;
    }
    if(form.classList.contains('popup__container_type_add-form')) {
      submitButton.classList.add(selectors.inactiveButtonClass);
      submitButton.disabled = true;
    }
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