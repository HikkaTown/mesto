const addIcon = new URL('../images/add-icon.svg', import.meta.url);
const closeIconSmall = new URL('../images/close-icon_small.svg', import.meta.url);
const closeIcon = new URL('../images/close-icon.svg', import.meta.url);
const deleteIcon = new URL('../images/delete-icon.svg', import.meta.url);
const editIcon = new URL('../images/edit-icon.svg', import.meta.url);
const likeIconActive = new URL('../images/like-icon_active.svg', import.meta.url);
const likeIcon = new URL('../images/like-icon.svg', import.meta.url);

const iconList = [
  // меняем исходные пути на переменные
  { name: 'Add Icon', link: addIcon },
  { name: 'Close Icon Small', link: closeIconSmall },
  { name: 'Close Icon', link: closeIcon },
  { name: 'Delete Icon', link: deleteIcon },
  { name: 'Edit Icon', link: editIcon },
  { name: 'Like Icon Active', link: likeIconActive },
  { name: 'Like Icon', link: likeIcon },
]; 

import './index.css';
import initialCards from '../utils/initialCards';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {
  editProfileBtn,
  popupEditProfile,
  editProfileForm,
  nameInput,
  jobInput,
  addImageBtn,
  popupAddImage,
  addImageForm,
  popupImage,
  validationConfig
} from '../utils/constant.js';

// элементы для открытия попапа добавления картинки и его редактирования
// Работаем с профилем
const userInfo = new UserInfo({nameSelector: '.profile__name', descriptionSelctor: '.profile__job'});
const popupUser = new PopupWithForm((e) => {
  e.preventDefault();
  popupUser._getInputValues();
  userInfo.setUserInfo(popupUser.inputValue[0], popupUser.inputValue[1]);
  popupUser.close();
  },
  '.popup_type_edit-profile'
);
editProfileBtn.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.userName;
  jobInput.value = userData.userDescription;
  popupUser.open();
});
// работаем с добавлением карточки
const popupAddCard = new PopupWithForm((e) => {
  e.preventDefault();
  // передаю подготовленный объект
  popupAddCard._getInputValues();
  let cardData = [{name: popupAddCard.inputValue[0], link: popupAddCard.inputValue[1]}];
  const addNewCard = new Section({items: cardData, 
    renderer: (element) => {
      const newCard = new Card(element, '.myTemplateCard', () => {
        const cardPreview = new PopupWithImage(element.name, element.link, '.popup_type_image');
        cardPreview.open();
      });
      const cardElementt = newCard.generateCard();
      addNewCard.addItem(cardElementt);
    }}, '.photocard__items');
  addNewCard.rendererItems();
  popupAddCard.close();
}, '.popup_type_add-card');
addImageBtn.addEventListener('click', () => {
  popupAddCard.open();
});
// рендерю карточки
const renderCard = new Section({items: initialCards,
    renderer: (element) => {
      const card = new Card(element, '.myTemplateCard', () => {
        const cardPreview = new PopupWithImage(element.name, element.link, '.popup_type_image');
        cardPreview.open();
      });
      const cardElement = card.generateCard();
      renderCard.addItem(cardElement);
    }}, '.photocard__items');

renderCard.rendererItems();

// добавляю класс с анимацией чтобы не было рывков при загрузке страницы
setTimeout(() => {
  popupEditProfile.classList.add("animation-transition");
  popupAddImage.classList.add("animation-transition");
  popupImage.classList.add("animation-transition");
}, 500);

// -------- Валидация форм -------------
const formEditProfile = new FormValidator(validationConfig, editProfileForm);
const formAddCard = new FormValidator(validationConfig, addImageForm);
formEditProfile.enableValidation();
formAddCard.enableValidation();
