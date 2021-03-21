'use strict'
// коллекция карточек которые будут в начале
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
// находим блок с карточками
let photocardList = document.querySelector('.photocard__items');
// элементы для открытия попапа профиля и его редактирования
let editProfileBtn = document.querySelector('.profile__edit-btn');
let popupEditProfile = document.querySelector('.popup_type_edit-profile');
let editProfileForm = document.querySelector('.popup__container_type_edit-form');
let nameInput = editProfileForm.querySelector('.popup__input_type_name');
let jobInput = editProfileForm.querySelector('.popup__input_type_job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let editCloseBtn = document.querySelector('.popup__close_type_edit-close');
// элементы для открытия попапа добавления картинки и его редактирования
let addImageBtn = document.querySelector('.profile__add-btn');
let popupAddImage = document.querySelector('.popup_type_add-card');
let addImageForm = document.querySelector('.popup__container_type_add-form');
let addCloseBtn = document.querySelector('.popup__close_type_add-form');
// попап с картинкой
let popupImage = document.querySelector('.popup_type_image');
let popupImageContainer = popupImage.querySelector('.popup__container_type_image');
let imageCloseBtn = popupImageContainer.querySelector('.popup__close_type_image');
// функция рендера карточек из коробки
function renderCard(arr) {
  let template = document.querySelector('.myTemplateCard');
  for(let i = 0; i < arr.length; i++) {
    let clone = template.content.cloneNode(true);
    let image = clone.querySelector('.photocard__image');
    image.src = arr[i].link;
    image.alt = arr[i].name;
    let nameCard = clone.querySelector('.photocard__title');
    nameCard.textContent = arr[i].name;
    template.parentNode.prepend(clone);
  }
}
//слушатель для удаления, лайка, и открытия попапа с предпросмотром картинки
photocardList.addEventListener('click', (e) => {
  if(e.target.classList.contains('photocard__delet-btn')) {
    let delCard = e.target.parentNode;
    photocardList.removeChild(delCard);
  } else if(e.target.classList.contains('photocard__like-btn')) {
    e.target.classList.toggle('photocard__like-btn_active');
  } else if(e.target.classList.contains('photocard__image')) {
    let url = e.target.getAttribute('src');
    let name = e.target.parentNode.querySelector('.photocard__title').textContent;
    renderImagePrev(name, url);
    popupVisible(e);
  }
});
// при октрытие предпросмотра подгружаем название и саму картинку
function renderImagePrev(name, url) {
  let template = document.querySelector('.templatePrevImage');
  let clone = template.content.cloneNode(true);
  let image = clone.querySelector('.popup__image');
  image.src = url;
  image.alt = name;
  let title = clone.querySelector('.popup__title-image');
  title.textContent = name;
  template.parentNode.prepend(clone);
}
// добавление карты
addImageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let nameImage = addImageForm.querySelector('.popup__input_type_name-card');
  let urlImage = addImageForm.querySelector('.popup__input_type_url-img');
  let template = document.querySelector('.myTemplateCard');
  let clone = template.content.cloneNode(true);
  let title = clone.querySelector('.photocard__title');
  title.textContent = nameImage.value;
  let image = clone.querySelector('.photocard__image');
  image.src = urlImage.value;
  image.alt = nameImage.value;
  template.parentNode.prepend(clone);
  nameImage.value = '';
  urlImage.value = '';
  popupHidden();
});

// добавляю класс с анимацией чтобы не было рывков при загрузке страницы
setTimeout(() => {
  popupEditProfile.classList.add('animation-transition');
  popupAddImage.classList.add('animation-transition');
  popupImage.classList.add('animation-transition');
}, 500);

// открытие попапа с добавлением картинки
addImageBtn.addEventListener('click', (e) => {
  popupVisible(e);
})

// скрытие редактирования профиля при клике на крестик
popupEditProfile.addEventListener('click', (e) => {
  if(e.target == editCloseBtn) {
    popupHidden();
  }
});
// скрытие просмотра изображения при клике на крестик
popupAddImage.addEventListener('click', (e) => {
  if(e.target == addCloseBtn) {
    popupHidden();
  }
});
// закрытие формы при клике на крестик
popupImage.addEventListener('click', (e) => {
  if(e.target == imageCloseBtn) {
    popupHidden();
  }
})
// открытие формы при клики на кнопку редактировать
editProfileBtn.addEventListener('click', (e) => {
  popupVisible(e);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
})
// обработчик событий для сохранения редактирования формы редактирования профиля
editProfileForm.addEventListener('submit', formSubmitHandler);
// функция показа формы с помощью объекта по которому нажали
function popupVisible(e) {
  if(e.target == editProfileBtn) {
    popupEditProfile.classList.toggle('popup_opened');
    document.querySelector('.page').classList.toggle('overflow-hidden');
  } else if(e.target == addImageBtn) {
    popupAddImage.classList.toggle('popup_opened');
    document.querySelector('.page').classList.toggle('overflow-hidden');
  } else if(e.target.classList.contains('photocard__image')) {
    popupImage.classList.toggle('popup_opened');
    document.querySelector('.page').classList.toggle('overflow-hidden');
  }
}
// Скрываем попапы с помощью функции
function popupHidden() {
  if(popupEditProfile.classList.contains('popup_opened')) {
    popupEditProfile.classList.toggle('popup_opened');
    document.querySelector('.page').classList.toggle('overflow-hidden');
  } else if(popupAddImage.classList.contains('popup_opened')) {
    popupAddImage.classList.toggle('popup_opened');
    document.querySelector('.page').classList.toggle('overflow-hidden');
  } else if(popupImage.classList.contains('popup_opened')) {
    popupImage.classList.toggle('popup_opened');
    document.querySelector('.page').classList.toggle('overflow-hidden');
    setTimeout(() => {
      popupImageContainer.removeChild(document.querySelector('.popup__image'));
      popupImageContainer.removeChild(document.querySelector('.popup__title-image'));
    }, 300);
  }
}

function formSubmitHandler(e) {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popupHidden();
}
// функция рендера карточек
renderCard(initialCards);