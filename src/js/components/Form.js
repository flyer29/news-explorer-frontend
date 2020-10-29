export default class Form {
  constructor(template, api, messages) {
    this.template = template;
    this.api = api;
    this.messages = messages;
    this.form = this.template.content.querySelector('.popup__form').cloneNode(true);
    this.button = this.form.querySelector('.popup__button');
    this.errorElement = this.form.querySelector('.popup__server-error');
    this.inputs = Array.from(this.form.querySelectorAll('input'));
  }

  _validateInputElement = (input) => {
    if ((input.validity.tooShort || input.validity.tooLong) && input.type === 'text') {
      return this.messages.TEXT_NOT_VALID;
    }
    if (input.validity.valueMissing) {
      return this.messages.VALUE_MISSING;
    }
    if (input.type === 'email' && input.validity.typeMismatch) {
      return this.messages.EMAIL_NOT_VALID;
    }
    if (input.name === 'name' && input.validity.patternMismatch) {
      return this.messages.NAME_NOT_VALID;
    }
    if (input.type == 'password' && input.validity.tooShort) {
      return this.messages.PASSWORD_NOT_VALID;
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
      if (this.isValid) {
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
};
