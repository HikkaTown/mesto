// элементы для открытия попапа профиля и его редактирования
export const editProfileBtn = document.querySelector(".profile__edit-btn");
export const popupEditProfile = document.querySelector(".popup_type_edit-profile");
export const editProfileForm = document.querySelector(
  ".popup__container_type_edit-form"
);
export const popupAddCadrSelector = '.popup_type_add-card';
export const popupProfileSelector = ".popup_type_edit-profile";
export const photocardListSelector = '.photocard__items';
export const templateCardSelector = '.myTemplateCard';
export const profileNameSelector = '.profile__name';
export const profileJobSelector = '.profile__job';

export const nameInput = editProfileForm.querySelector(".popup__input_type_name");
export const jobInput = editProfileForm.querySelector(".popup__input_type_job");
// элементы для открытия попапа добавления картинки и его редактирования
export const addImageBtn = document.querySelector(".profile__add-btn");
export const popupAddImage = document.querySelector(".popup_type_add-card");
export const addImageForm = document.querySelector(".popup__container_type_add-form");
// попап с картинкой
export const popupImage = document.querySelector(".popup_type_image");
export const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorSelector: '.popup__error',
  errorVisible: 'popup__error_visible'
};