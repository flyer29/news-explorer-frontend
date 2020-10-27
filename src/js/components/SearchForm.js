export default class SearchForm {
  constructor(element) {
    this.element = element;
    this.form = element.querySelector('.search__form');
    this.error = element.querySelector('.search__error');
    this.inputs = Array.from(this.form.querySelectorAll('input'));
    this.button = element.querySelector('.button');
  }

  _validateInputElement = (input) => {
    if ((input.validity.tooShort || input.validity.tooLong) && input.type === 'text') {
      return 'Должно быть от 2 до 30 символов';
    }
    if (input.validity.valueMissing) {
      return 'Это обязательное поле';
    }
    if (input.type === 'email' && input.validity.typeMismatch) {
      return 'Неправильный формат Email';
    }
    if(input.name === 'name' && input.validity.patternMismatch) {
      return 'Необходимо ввести корректное имя';
    }
    if(input.type == 'password' && input.validity.tooShort) {
      return 'Пароль должен содержать не менее восьми символов';
    }
    return '';
  }

  _makeButtonEnable = () => {
    this.button.removeAttribute('disabled');
  }

  _makeButtonDisable = () => {
    this.button.setAttribute('disabled', true);
  }

  _validateForm = () => {
    this.isValid = true;
  this.inputs.forEach((item) => {
    if (this._validateInputElement(item) !== '') {
      this.isValid = false;
    }
    if(this.isValid) {
      this._makeButtonEnable()
    } else {
      this._makeButtonDisable();
    }
  });
}

  _showMessage = (event) => {
    this.error.textContent = this._validateInputElement(event.target);
  }

  setEventListeners() {
    this.inputs.forEach((item) => {
      item.addEventListener('input', this._showMessage);
    });
    this.form.addEventListener('input', this._validateForm);
  }
}
