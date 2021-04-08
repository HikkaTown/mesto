const settings = {
  formSelector: 'form.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorSelector: '.popup__error',
  errorVisible: 'popup__error_visible'
}

function enableValidation(formData) {
  const formList = Array.from(document.querySelectorAll(formData.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (e) => {
      e.preventDefault();
    });
    setEventListeners(formElement);
  });

  function isValid(formElement, inputElement) {
    if(!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  }

  function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  
  function toggleButtonState(inputList, buttonElement) {
    if(hasInvalidInput(inputList)) {
      buttonElement.classList.add(formData.inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(formData.inactiveButtonClass);
      buttonElement.removeAttribute('disabled', true);
    }
  }

  function showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(formData.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(formData.errorVisible);
  }
  
  function hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(formData.inputErrorClass);
    errorElement.classList.remove(formData.errorVisible);
    errorElement.textContent = '';
  }
  
  function setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(formData.inputSelector));
    const buttonElement = formElement.querySelector('.popup__submit');
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  }

}

enableValidation(settings);