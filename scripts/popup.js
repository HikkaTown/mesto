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
const addCloseBtn = document.querySelector('.popup__close_type_add-form');
// попап с картинкой
const popupImage = document.querySelector('.popup_type_image');
const popupImageContainer = popupImage.querySelector('.popup__container_type_image');
const popupImageCloseBtn = popupImageContainer.querySelector('.popup__close_type_image');
const popupImagePicture = popupImageContainer.querySelector('.popup__image');
const popupImageText = popupImageContainer.querySelector('.popup__title-image');
// функция рендера карточек из коробки

// nameInput.addEventListener('keyup', (e) => {
//   enableValidation({
//     formSelector: '.popup_type_edit-profile',
//     inputSelector: '.popup__input_type_name',
//     submitButtonSelector: '.popup__submit',
//     inactiveButtonClass: 'popup__submit_disabled',
//     inputErrorClass: 'popup__input_type_error',
//     errorClass: 'popup__error_visible'
//   });
// });

// function enableValidation(obj) {
//   const form = document.querySelector(obj.formSelector);
//   const input = form.querySelector(obj.inputSelector);
//   const submitBtn = form.querySelector(obj.submitButtonSelector);
//   if(input.value.length < 2 || input.value.length > 40) {
//     input.classList.add(obj.inputErrorClass);
//     form.querySelector('.popup__error').classList.add(obj.errorClass);
//     submitBtn.disabled = true;
//     submitBtn.classList.add(obj.inactiveButtonClass);
//   } else {
//     input.classList.remove(obj.inputErrorClass);
//     form.querySelector('.popup__error').classList.remove(obj.errorClass);
//     submitBtn.classList.remove(obj.inactiveButtonClass);
//     submitBtn.disabled = false;
//   }
// }


function createCard(cardData) {
  const cardTemplate = document.querySelector('.myTemplateCard');
  const card = cardTemplate.content.cloneNode(true);
  const imageCard = card.querySelector('.photocard__image');
  imageCard.src = cardData.link;
  imageCard.alt = cardData.name;
  const nameCard = card.querySelector('.photocard__title');
  nameCard.textContent = cardData.name;
  // сразу вешаю слушатель на картику, чтобы открывать попап
  function openImage(e) {
    renderImagePrev(cardData.name, cardData.link);
    openPopup(popupImage);
  }
  imageCard.addEventListener('click', openImage);
  // событие для лайка карточки
  const likeCard = card.querySelector('.photocard__like-btn');
  function cardLikeToggle(e) {
    e.target.classList.toggle('photocard__like-btn_active');
  }
  likeCard.addEventListener('click', cardLikeToggle);
  // событие для удаления карточки которое удаляет все слушатели и саму карточку
  const deletCard = card.querySelector('.photocard__delet-btn');
  function deletCardListner(e) {
    const delCardBtn = e.target.closest('.photocard__item');
    photocardList.removeChild(delCardBtn);
    imageCard.removeEventListener('click', openImage);
    likeCard.removeEventListener('click', cardLikeToggle);
    deletCard.removeEventListener('click', deletCardListner);
  }
  deletCard.addEventListener('click', deletCardListner);
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
  const nameImage = addImageForm.querySelector('.popup__input_type_name-card');
  const urlImage = addImageForm.querySelector('.popup__input_type_url-img');
  // передаю подготовленный объект
  renderCard([{name: nameImage.value , link: urlImage.value }]);
  // очищаю инпуты для следующего добавления
  addImageForm.reset();
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
// функция показа попапа с помощью объекта по которому нажали
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.querySelector('.page').classList.add('overflow-hidden');
  const closeBtn = popup.querySelector('.popup__close');
  // колбэк для заркытия попапа нажатием клавиши или по клику на оверлей
  // событие навешивается и удаляется после закрытия
  function handlerExitPopup(e) {
    if(e.target == popup || e.key == 'Escape' || e.target == closeBtn) {
      closePopup(popup);
      closeBtn.removeEventListener('click', handlerExitPopup);
      popup.removeEventListener('click', handlerExitPopup);
      window.removeEventListener('keyup', handlerExitPopup);
    }
  }
  closeBtn.addEventListener('click', handlerExitPopup);
  popup.addEventListener('click', handlerExitPopup);
  window.addEventListener('keyup', handlerExitPopup); 
}
// Скрываем попапы с помощью функции
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.querySelector('.page').classList.remove('overflow-hidden');
}

function handleProfileSubmit(e) {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
}
// функция рендера карточек
renderCard(initialCards);