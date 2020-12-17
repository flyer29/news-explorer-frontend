export default class Popup {
  constructor(element, signUp, login, api, header, card, messages) {
    this.element = element;
    this.header = header;
    this.title = this.element.querySelector('.popup__title');
    this.content = this.element.querySelector('.popup__content');
    this.signUp = signUp;
    this.login = login;
    this.api = api;
    this.card = card;
    this.messages = messages;
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

  _closeByClickEveryWhere = (event) => {
    event.target.classList.contains('popup') && this.close();
  }

  _closeByEsc(event) {
    if (event.keyCode === 27) {
      this.close();
    }
  }

  sendLoginForm = (event) => {
    event.preventDefault();
    this._makeSubmitButtonDisabled(this.loginForm);
    this.api.signin(this.login.getInfo())
      .then((res) => {
        localStorage.setItem('user', `${JSON.stringify(res)}`)
        const props = {
          isLoggedIn: true,
          userName: JSON.parse(localStorage.getItem('user')).name,
        }
        this.header.render(props);
        this.card.renderIcon();
      })
      .then(() => {
        this.close();
      })
      .then(() => {
        this.api.getAllUserArticles()
          .then((res) => {
            localStorage.setItem('userArticles', `${JSON.stringify(res.data)}`)
          })
          .catch((err) => {
            throw err.message;
          });
      })
      .catch((err) => {
        this.login.setServerError(err.message);
      });
  }

  sendSignUpForm = (event) => {
    event.preventDefault();
    this._makeSubmitButtonDisabled(this.signUpForm);
    this.api.signup(this.signUp.getInfo())
      .then(() => this._openSuccessPopup())
      .catch((err) => {
        this.signUp.setServerError(err.message);
      });
  }

  openMainPopup = () => {
    this._clearContent();
    this.popupLink.removeEventListener('click', this.openMainPopup);
    this._setContent(this.signUpForm);
    this._makeSubmitButtonDisabled(this.signUpForm);
    this.signUp.clear();
    this.signUp.setEventListeners();
    this.title.textContent = this.messages.SIGNUP;
    this.popupLink.textContent = this.messages.LINK_TO_LOGIN;
    this.popupLink.addEventListener('click', this.openSecondPopup);
    this.signUpForm.addEventListener('submit', this.sendSignUpForm);
    this.open();
  }

  _openSuccessPopup = () => {
    this._clearContent();
    this.title.textContent = this.messages.SIGNUP_SUCCESS;
    this.popupLink.classList.add('popup__link_type_success');
  }

  openSecondPopup = () => {
    if (this.popupLink.classList.contains('popup__link_type_success')) {
      this.popupLink.classList.remove('popup__link_type_success');
    };
    this._clearContent();
    this.popupLink.removeEventListener('click', this.openSecondPopup);
    this._setContent(this.loginForm);
    this._makeSubmitButtonDisabled(this.loginForm);
    this.login.clear();
    this.login.setEventListeners();
    this.title.textContent = this.messages.LOGIN;
    this.popupLink.textContent = this.messages.LINK_TO_SIGNUP;
    this.popupLink.addEventListener('click', this.openMainPopup);
    this.loginForm.addEventListener('submit', this.sendLoginForm);
    this.open();
  }

  _clearContent = () => {
    const form = this.container.querySelector('form');
    if (form) {
      form.remove();
    }
  }

  _setEventListeners = () => {
    window.addEventListener('keydown', this._closeByEsc);
    this.element.addEventListener('click', this._closeByClickEveryWhere);
    this.closeButton.addEventListener('click', this.close);
  }

  _removeEventListeners = () => {
    window.removeEventListener('keydown', this._closeByEsc);
    this.element.removeEventListener('click', this._closeByClickEveryWhere);
    this.closeButton.removeEventListener('click', this.close);
  }

  _makeSubmitButtonDisabled = (form) => {
    form.querySelector('.popup__button').setAttribute('disabled', 'true');
  }
};
