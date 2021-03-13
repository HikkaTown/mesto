"use strict"

let editProfileBtn = document.querySelector('.profile__edit-btn');

let popupBlock = document.querySelector('.popup');
let popupForm = document.querySelector('.popup__container');
let nameInput = popupForm.querySelector('.popup__input_type_name');
let jobInput = popupForm.querySelector('.popup__input_type_job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

const popupCloseBtn = document.querySelector('.popup__close');
editProfileBtn.addEventListener('click', () => {
  popupVisible();
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
})

popupCloseBtn.addEventListener('click', () => {
  popupVisible();
})

popupForm.addEventListener('submit', formSubmitHandler);

function popupVisible() {
  popupBlock.classList.toggle('popup_opened');
  document.querySelector('.page').classList.toggle('overflow-hidden');
}

function formSubmitHandler(e) {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popupVisible();
}
