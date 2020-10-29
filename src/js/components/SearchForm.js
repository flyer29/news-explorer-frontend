export default class SearchForm {
  constructor(element, messages) {
    this.element = element;
    this.messages = messages;
    this.form = element.querySelector('.search__form');
    this.error = element.querySelector('.search__error');
    this.inputs = Array.from(this.form.querySelectorAll('input'));
    this.button = element.querySelector('.button');
  }

  _validateInputElement = (input) => {
    if ((input.validity.tooShort || input.validity.tooLong) && input.type === 'text') {
      return this.messages.TEXT_NOT_VALID;
    }
    if (input.validity.valueMissing) {
      return this.messages.VALUE_MISSING;
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
