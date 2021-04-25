class FormValidator {
  constructor(formData, formElement) {
    this._formElement = formElement;
    this._inputSelector = formData.inputSelector;
    this._submitButtonSelector = formData.submitButtonSelector;
    this._inactiveButtonClass = formData.inactiveButtonClass;
    this._inputErrorClass = formData.inputErrorClass;
    this._errorSelector = formData.errorSelector;
    this._errorVisible = formData.errorVisible;
  }

  _setEventListeners(form) {
    const inputList = Array.from(form.querySelectorAll(this._inputSelector));
    const buttonElement = form.querySelector(this._submitButtonSelector);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(form, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  _isValid(formElement, inputElement) {
    if(!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    if(this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute('disabled', true);
    }
  }

  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorVisible);
  }

  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorVisible);
    errorElement.textContent = '';
  }

  enableValidation() {
    const form = this._formElement;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
    });
    this._setEventListeners(this._formElement);
  }
}

export default FormValidator;