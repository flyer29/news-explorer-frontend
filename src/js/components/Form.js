export default class Form {
  constructor(template, api) {
    this.template = template;
    this.api = api;
    this.form = this.template.content.querySelector('.popup__form').cloneNode(true);
    this.button = this.form.querySelector('.popup__button');
    this.errorElement = this.form.querySelector('.popup__server-error');
    this.inputs = Array.from(this.form.querySelectorAll('input'));
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

  setServerError = (content) => {
    this.errorElement.textContent = content;
  }

  getInfo = () => {
    const data = {};
    this.form.elements.forEach((item) => {
      if (item.name !== 'button') {
         data[item.name] = item.value;
       };
    });
    return data;
  }

  clear = () => {
    this.form.reset();
    this.form.querySelectorAll('.popup__error').forEach((item) => {
      item.textContent = '';
    });
    this.errorElement.textContent = '';
  }

  _showMessage = (event) => {
    const errorElement = event.target.nextElementSibling;
    errorElement.textContent = this._validateInputElement(event.target);
  }

  setEventListeners() {
    this.inputs.forEach((item) => {
      item.addEventListener('input', this._showMessage);
    });
    this.form.addEventListener('input', this._validateForm);
    this.form.addEventListener('submit', this.signUp);
  }
}