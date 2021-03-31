// элементы которые нужны
// popup__container popup__container_type_edit-form - имя формы
// popup__input popup__input_type_name - имя инпута 1 
// popup__error_type_name-profile - имя ошибки для инпута 1
// popup__input popup__input_type_job - имя инпута 2
// popup__error popup__error_type_job-profile - имя ошибки для инпута 2

// popup__container popup__container_type_add-form - имя формы 
// popup__input popup__input_type_name-card - имя инпута 1
// popup__error popup__error_type_name-card - имя ошибки для инпута 1
// popup__input popup__input_type_url-img - имя инпута 2
// popup__error popup__error_type_url-image - имя ошибки инпута 2
// 
// popup__submit - кнопка сохранить
// popup__submit_disabled - неактивное сост для сохранить
// popup__error_visible - выводит ошибку под инпутом
// popup__input_type_error - показывает что поле недопустимое

let settings = {
  formSelector: 'form.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorSelector: '.popup__error',
  errorVisible: 'popup__error_visible'
}

function enableValidation(sett) {
  const forms = document.querySelectorAll(sett.formSelector);
  // это форма с редактированием профиля
  forms[0].addEventListener('keyup', (e) => {
    const inputs = forms[0].querySelectorAll(sett.inputSelector);
    const errorsContent = forms[0].querySelectorAll(sett.errorSelector);
    const submitButton = forms[0].querySelector(sett.submitButtonSelector);
    let flag = true;
    if(inputs[0].value.length < 2 || inputs[0].value.length > 40) {
      flag = false ;
      errorsContent[0].classList.add(sett.errorVisible);
      inputs[0].classList.add(sett.inputErrorClass);
    } else {
      errorsContent[0].classList.remove(sett.errorVisible);
      inputs[0].classList.remove(sett.inputErrorClass);
      flag = flag ? true : false;
    }
    if(inputs[1].value.length < 2 || inputs[1].value.length > 200) {
      flag = false ;
      errorsContent[1].classList.add(sett.errorVisible);
      inputs[1].classList.add(sett.inputErrorClass);
    } else {
      errorsContent[1].classList.remove(sett.errorVisible);
      inputs[1].classList.remove(sett.inputErrorClass);
      flag = flag ? true : false;
    }
    if(!flag) {
      submitButton.classList.add(sett.inactiveButtonClass);
      submitButton.disabled = true;
    } else {
      submitButton.classList.remove(sett.inactiveButtonClass);
      submitButton.disabled = false;
    }
  });
  // тут форма с добавлением карточки
  forms[1].addEventListener('input', () => {
    const inputs = forms[1].querySelectorAll(sett.inputSelector);
    const errorsContent = forms[1].querySelectorAll(sett.errorSelector);
    const submitButton = forms[1].querySelector(sett.submitButtonSelector);
    let flag = true;
    if(inputs[0].value.length < 2 || inputs[0].value.length > 30) {
      flag = false ;
      errorsContent[0].classList.add(sett.errorVisible);
      inputs[0].classList.add(sett.inputErrorClass);
    } else {
      errorsContent[0].classList.remove(sett.errorVisible);
      inputs[0].classList.remove(sett.inputErrorClass);
      flag = flag ? true : false;
    }
    if(inputs[1].validity.valid) {
      flag = flag ? true : false;
      errorsContent[1].classList.remove(sett.errorVisible);
      inputs[1].classList.remove(sett.inputErrorClass);
    } else {
      errorsContent[1].classList.add(sett.errorVisible);
      inputs[1].classList.add(sett.inputErrorClass);
      flag = false ;
    }
    if(!flag) {
      submitButton.classList.add(sett.inactiveButtonClass);
      submitButton.disabled = true;
    } else {
      submitButton.classList.remove(sett.inactiveButtonClass);
      submitButton.disabled = false;
    }
  });
}

enableValidation(settings);