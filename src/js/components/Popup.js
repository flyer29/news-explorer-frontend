export default class Popup {
  constructor(element, signUp, login, api, header) {
    this.element = element;
    this.header = header;
    this.title = this.element.querySelector('.popup__title');
    this.content = this.element.querySelector('.popup__content');
    this.signUp = signUp;
    this.login = login;
    this.api = api;
    this.container = this.element.querySelector('.popup__container');
    this.signUpForm = signUp.form;
    this.loginForm = login.form;
    this.formError =
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

  sendLoginForm = (event) => {
    event.preventDefault();
    this.api.signin(this.login._getInfo())
    .then((res) => {
      localStorage.setItem('user', `${JSON.stringify(res)}`)
      const props = {
        isLoggedIn: true,
        userName: JSON.parse(localStorage.getItem('user')).name,
        }
      this.header.render(props);
    })
    .then(() => {
      this.close();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  sendSignUpForm = (event) => {
    event.preventDefault();
    this.api.signup(this.signUp._getInfo())
    .then(() => this._openSuccessPopup())
    .catch((err) => {
      console.log(err);
    });
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
    this.signUpForm.addEventListener('submit', this.sendSignUpForm);
    this.open();
  }

  _openSuccessPopup = () => {
    this._clearContent();
    this.title.textContent = 'Пользователь успешно зарегистрирован!';
    this.popupLink.classList.add('popup__link_type_success');
  }

  openSecondPopup = () => {
    if (this.popupLink.classList.contains('popup__link_type_success')) {
      this.popupLink.classList.remove('popup__link_type_success');
    };
    this._clearContent();
    this.popupLink.removeEventListener('click', this.openSecondPopup);
    this._setContent(this.login.form);
    this.login.clear();
    this.login.setEventListeners();
    this.title.textContent = 'Вход';
    this.popupLink.textContent = 'Зарегистрироваться';
    this.popupLink.addEventListener('click',this.openMainPopup);
    this.loginForm.addEventListener('submit', this.sendLoginForm);
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
