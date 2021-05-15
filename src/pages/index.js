const addIcon = new URL('../images/add-icon.svg', import.meta.url);
const closeIconSmall = new URL('../images/close-icon_small.svg', import.meta.url);
const closeIcon = new URL('../images/close-icon.svg', import.meta.url);
const deleteIcon = new URL('../images/delete-icon.svg', import.meta.url);
const editIcon = new URL('../images/edit-icon.svg', import.meta.url);
const likeIconActive = new URL('../images/like-icon_active.svg', import.meta.url);
const likeIcon = new URL('../images/like-icon.svg', import.meta.url);

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
  validationConfig,
  popupProfileSelector,
  popupAddCadrSelector,
  photocardListSelector,
  templateCardSelector,
  profileNameSelector,
  profileJobSelector
} from '../utils/constant.js';
// Работаем с профилем
const userInfo = new UserInfo({nameSelector: profileNameSelector, descriptionSelctor: profileJobSelector});
const popupUser = new PopupWithForm((formsInput) => {
  userInfo.setUserInfo(formsInput['nameProfile'], formsInput.['jobProfile']);
  popupUser.close();
  },
  popupProfileSelector
);
// слушатель открытия
editProfileBtn.addEventListener('click', () => {
  formEditProfile.resetValidation(true);
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.userName;
  jobInput.value = userData.userDescription;
  popupUser.open();
});
// работаем с добавлением карточки
const handleAddCardFormSubmit = ({name, link}) => {
  renderCard.addItem(createCard(name, link));
  popupAddCard.close();
};
const popupAddCard = new PopupWithForm(handleAddCardFormSubmit, popupAddCadrSelector);

addImageBtn.addEventListener('click', () => {
  formAddCard.resetValidation(false);
  popupAddCard.open();
});
// рендерю карточки
const renderCard = new Section({items: initialCards,
    renderer: (element) => {
      const cardElement = createCard(element.name, element.link);
      renderCard.addItem(cardElement);
    }}, photocardListSelector);
renderCard.rendererItems();
// открытие попапа с картинкой
const openPreview = new PopupWithImage();
// Функция создания карточки отдельно
function createCard(name, link) {
  const card = new Card({name, link}, templateCardSelector, () => {
    openPreview.open({name, link});
  });
  return card.generateCard();
}
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
