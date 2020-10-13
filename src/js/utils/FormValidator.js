export default class FormValidator {
  constructor(element) {
    this.element = element;
    this.button = this.element.querySelector('.popup__button');
    this.form = this.element.querySelector('.popup__form');
    this.inputs = Array.from(this.form.querySelectorAll('input'));
  }

  _checkInputValidity = (input) => {
    if ((input.validity.tooShort || input.validity.tooLong) && input.type === 'text') {
      return 'Должно быть от 2 до 30 символов';
    }
    if (input.validity.valueMissing) {
      return 'Это обязательное поле';
    }
    if (input.type === 'email' && input.validity.typeMismatch) {
      return 'Здесь должен быть адрес электронной почты';
    }
    if(input.name === 'name' && input.validity.patternMismatch) {
      return 'Необходимо ввести корректное имя';
    }
    if(input.name == 'password' && input.validity.tooShort) {
      return 'Пароль должен содержать не менее восьми символов';
    }
    return '';
  }

  makeButtonEnable = () => {
    this.button.removeAttribute('disabled');
  }

  makeButtonDisable = () => {
    this.button.setAttribute('disabled', true);
  }

  setSubmitButtonState = () => {
    let isValidForm = true;
    this.inputs.forEach((item) => {
      if (this._checkInputValidity(item) !== '') {
        isValidForm = false;
      }
    });
    if (isValidForm) {
      this.makeButtonEnable();
    } else {
      this.makeButtonDisable();
    }
  }

  _showMessage = (event) => {
    const errorElement = event.target.nextElementSibling;
    errorElement.textContent = this._checkInputValidity(event.target);
  }

  setEventListeners() {
    this.inputs.forEach((item) => {
      item.addEventListener('input', this._showMessage);
    });
  }
}