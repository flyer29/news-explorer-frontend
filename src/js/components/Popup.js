export default class Popup {
  constructor(element, signUp, login) {
    this.element = element;
    this.title = this.element.querySelector('.popup__title');
    this.signUp = signUp;
    this.login = login;
    this.container = this.element.querySelector('.popup__container');
    this.signUpForm = signUp.form;
    this.loginForm = login.form;
    this.closeButton = this.element.querySelector('.popup__close');
    this.popupLink = this.element.querySelector('.popup__link');
    this._closeByEsc = this._closeByEsc.bind(this);
  }

  _setContent = (content) => {
    this.container.appendChild(content);
  }

  open = () => {
    this.element.classList.remove('hidden');
    this._setEventListeners();
  }

  close = () => {
    this.element.classList.add('hidden');
    this._removeEventListeners();
  }

  _closeByEsc(event) {
    if (event.keyCode === 27) {
      this.close();
    }
  }

  openMainPopup = () => {
    this._clearContent();
    this.popupLink.removeEventListener('click', this.openMainPopup);
    this._setContent(this.signUp.form);
    this.signUp.clear();
    this.signUp.setEventListeners();
    this.title.textContent = 'Регистрация';
    this.popupLink.textContent = 'Войти';
    this.popupLink.addEventListener('click',this.openSecondPopup);
    this.open();
  }

  openSecondPopup = () => {
    this._clearContent();
    this.popupLink.removeEventListener('click', this.openSecondPopup);
    this._setContent(this.login.form);
    this.login.clear();
    this.login.setEventListeners();
    this.title.textContent = 'Вход';
    this.popupLink.textContent = 'Зарегистрироваться';
    this.popupLink.addEventListener('click',this.openMainPopup);
    this.open();
  }

    _clearContent = () => {
    const form = this.container.querySelector('form');
    if(form) {
      form.remove();
    }
  }

  _setEventListeners = () => {
    window.addEventListener('keydown', this._closeByEsc);
    this.closeButton.addEventListener('click', this.close);
  }

  _removeEventListeners = () => {
    window.removeEventListener('keydown', this._closeByEsc);
    this.closeButton.removeEventListener('click', this.close);
  }
}
