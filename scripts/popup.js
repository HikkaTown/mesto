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

function createCard(cardData) {
  const cardTemplate = document.querySelector('.myTemplateCard');
  const card = cardTemplate.content.cloneNode(true);
  const imageCard = card.querySelector('.photocard__image');
  imageCard.src = cardData.link;
  imageCard.alt = cardData.name;
  const nameCard = card.querySelector('.photocard__title');
  nameCard.textContent = cardData.name;
  // сразу вешаю слушатель на картику, чтобы открывать попап
  imageCard.addEventListener('click', (e) => {
    renderImagePrev(cardData.name, cardData.link);
    openPopup(popupImage);
  });
  // событие для лайка карточки
  const likeCard = card.querySelector('.photocard__like-btn');
  likeCard.addEventListener('click', (e) => {
    e.target.classList.toggle('photocard__like-btn_active');
  });
  // событие для удаления карточки
  const deletCard = card.querySelector('.photocard__delet-btn');
  deletCard.addEventListener('click', (e) => {
    const delCardBtn = e.target.closest('.photocard__item');
    photocardList.removeChild(delCardBtn);
  });
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
})

// скрытие редактирования профиля при клике на крестик
editCloseBtn.addEventListener('click', (e) => {
  closePopup(popupEditProfile);
});
// скрытие просмотра изображения при клике на крестик
addCloseBtn.addEventListener('click', (e) => {
  closePopup(popupAddImage);
});
// закрытие формы при клике на крестик
popupImageCloseBtn.addEventListener('click', (e) => {
  closePopup(popupImage);
})
// открытие формы при клики на кнопку редактировать
editProfileBtn.addEventListener('click', (e) => {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
})
// обработчик событий для сохранения редактирования формы редактирования профиля
editProfileForm.addEventListener('submit', handleProfileSubmit);
// функция показа попапа с помощью объекта по которому нажали
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.querySelector('.page').classList.add('overflow-hidden');
  popup.addEventListener('click', closeOverlayClick(popup));
  window.addEventListener('keyup', closeKeyPopup(popup));
}
// Скрываем попапы с помощью функции
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.querySelector('.page').classList.remove('overflow-hidden');
  // window.removeEventListener('keyup', closeKeyHandler);
}
// создаю функция для закрытия попапа по клику на оверлей с её самоуничтожением
function closeOverlayClick(popup) {
  return function closeHandler(e) {
    // проверяю кликнул ли пользователь на оверлей
    if(e.target == popup) {
      closePopup(popup);
      // удаляю слушатель после закрытия
      popup.removeEventListener('click', closeHandler);
    }
  };
}
// функция закрытия попапа по нажатию на клавишу `Escape`
function closeKeyPopup(popup) {
  return function closeKeyHandler(e) {
    if(e.key == `Escape`) {
      closePopup(popup);
      // удаление слушателя с window
      window.removeEventListener('keydown', closeKeyHandler);
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