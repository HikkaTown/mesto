import './index.css';
import Api from '../components/Api.js';
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
  profileJobSelector,
  profileAvatarOverlay,
  editAvatarForm,
  popupEditAvatarSelector,
  popupEditAvatar,
  profileAvatar

} from '../utils/constant.js';
// добавляю класс с анимацией чтобы не было рывков при загрузке страницы
setTimeout(() => {
  popupEditProfile.classList.add("animation-transition");
  popupAddImage.classList.add("animation-transition");
  popupImage.classList.add("animation-transition");
  profileAvatarOverlay.classList.add("animation-transition");
  popupEditAvatar.classList.add("animation-transition");
}, 500);
// -------- Валидация форм -------------
const formEditProfile = new FormValidator(validationConfig, editProfileForm);
const formAddCard = new FormValidator(validationConfig, addImageForm);
const formEditAvatar = new FormValidator(validationConfig, editAvatarForm);
// активация валидации
formEditProfile.enableValidation();
formAddCard.enableValidation();
formEditAvatar.enableValidation();
// Работаем с профилем
const userInfo = new UserInfo({nameSelector: profileNameSelector, descriptionSelctor: profileJobSelector});
const popupUser = new PopupWithForm((formsInput) => {
  popupUser.renderLoading(true);
  api.setUserData(formsInput['nameProfile'], formsInput['jobProfile'])
    .then(function () {
      userInfo.setUserInfo(formsInput['nameProfile'], formsInput['jobProfile']);
      popupUser.close();
    })
    .catch(e => console.log(`Ошибка - ${e}`))
    .finally(() => {popupUser.renderLoading(false)});
  },
  popupProfileSelector
);
// слушатель открытия формы редактирования профиля
editProfileBtn.addEventListener('click', () => {
  formEditProfile.resetValidation(true);
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.userName;
  jobInput.value = userData.userDescription;
  popupUser.open();
});
// работа с загрузкой аватара
const editAvatar = new PopupWithForm((formsInput) => {
  editAvatar.renderLoading(true);
  // тут нужно сделать запрос на сервер для смены аватарки
  api.setUserAvatar(formsInput.link)
    .then(function () {
      profileAvatar.src = formsInput.link;
      editAvatar.close();
    })
    .catch(e => console.log(`Ошибка - ${e}`))
    .finally(() => {editAvatar.renderLoading(false)});
}, popupEditAvatarSelector);
profileAvatarOverlay.addEventListener('click', () => {
  editAvatar.open();
  formEditAvatar.resetValidation(false);
});
// открытие попапа просмотра изображения карточки
const openPreview = new PopupWithImage();
// Функция создания карточки отдельно
function createCard(name, link, likes, cardId, userId, ownerId) {
  const card = new Card({name, link, likes, cardId, userId, ownerId}, templateCardSelector, () => {
    openPreview.open({name, link});
  }, (element) => {
    const confirm = new PopupWithForm(() => {
      confirm.renderLoading(true);
      api.removeCard(card.getCardId())
        .then(function () {
          element.remove();
          confirm.close();
        })
        .catch(e => console.log(`Ошибка - ${e}`))
        .finally(() => {confirm.renderLoading(false)});
    }, '.popup_type_confirm');
    confirm.open();
  }, (likeBtn, cardId, likeCount) => {
    if(likeBtn.classList.contains('photocard__like-btn_active')) {
      api.deletLike(cardId)
        .then((e) => {
          likeCount.textContent = +likeCount.textContent ? +likeCount.textContent-1 : '0';
          likeBtn.classList.remove('photocard__like-btn_active')
        })
        .catch(e => console.log(`Ошибка - ${e}`))
        .finally();
    } else {
      api.setLike(cardId)
        .then(() => {
          likeCount.textContent = +likeCount.textContent+1;
          likeBtn.classList.add('photocard__like-btn_active')
        })
        .catch(e => console.log(`Ошибка - ${e}`))
        .finally();
    }
  });
  return card.generateCard();
}
// работа с апи
const api = new Api({baseUrl: "https://mesto.nomoreparties.co/v1/cohort-24", headers: {
  authorization: '175aa685-14cc-4995-ab2c-72df36e470f5',
  'Content-Type': 'application/json'
  }}
);
// рендер
const renderCard = new Section({items: {},
  renderer: (element) => {
    const cardElement = createCard(element.name, element.link, element.likes);
    renderCard.addItem(cardElement);
  }}, photocardListSelector);


// слушатель сабмита добавления карточки
const handleAddCardFormSubmit = ({name, link}) => {
  popupAddCard.renderLoading(true);
  api.addCard(name, link)
    .then(data => {
      const userId = userInfo.getUserId();
      renderCard.addItem(createCard(data.name, data.link, data.likes, data._id, data['owner']['_id'], userId));
      popupAddCard.close();
    })
    .catch(e => console.log(`Ошибка - ${e}`))
    .finally(() => {popupAddCard.renderLoading(false)});
};
// попап добавления карточки.
const popupAddCard = new PopupWithForm(handleAddCardFormSubmit, popupAddCadrSelector);
addImageBtn.addEventListener('click', () => {
  formAddCard.resetValidation(false);
  popupAddCard.open();
});
// промис для двух основных запросов при загрузке странциы
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    const user = userData;
    userInfo.setUserInfo(user.name, user.about, user._id);
    profileAvatar.src = user.avatar;
    initialCards.reverse().forEach((element) => {
      renderCard.addItem(createCard(element.name, element.link, element.likes, element._id, user._id, element['owner']['_id']));
    });
  })
  .catch(e => console.log(`Ошибка - ${e}`))
  .finally();
