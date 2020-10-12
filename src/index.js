import './pages/main/index.css';

const headerButton = document.querySelector('.header__button');
const headerTitle = document.querySelector('.header__title');
const headerLinks = document.querySelectorAll('.header__link');
const overlay = document.querySelector('.header__overlay');
const headerNav = document.querySelector('.header__nav');
const logoutButton = document.querySelector('.button_logout');
const authorizationButton = document.querySelector('.button_authorization');
const loginPopup = document.querySelector('.popup_type_login');
const signUpButton = loginPopup.querySelector('.popup__link');
const signUpPopup = document.querySelector('.popup_type_signup');
const loginPopupCloseButton = loginPopup.querySelector('.popup__close');
const signUpPopupCloseButton = signUpPopup.querySelector('.popup__close');
const enterButton = signUpPopup.querySelector('.popup__link');
const successPopup = document.querySelector('.popup_type_success');
const successPopupEnterButton = successPopup.querySelector('.popup__link');
const successPopupClose = successPopup.querySelector('.popup__close');
const signUpMainButton = signUpPopup.querySelector('.popup__button');


headerButton.addEventListener('click', () => {
  headerNav.classList.toggle('show');
  logoutButton.classList.toggle('button_logout_menu');
  headerButton.classList.toggle('header__button_close');
  headerTitle.classList.toggle('header__title_menu');
  overlay.classList.toggle('hidden');
  headerLinks.forEach((item) => {
    item.classList.toggle('header__link_menu');
  });
});

const showSignUpPopup = () => {
  signUpPopup.classList.remove('hidden');
  enterButton.addEventListener('click', () => {
    signUpPopup.classList.add('hidden');
    loginPopup.classList.remove('hidden');
  });
};

const showLoginPopup = () => {
  loginPopup.classList.remove('hidden');
  signUpButton.addEventListener('click', () => {
    loginPopup.classList.add('hidden');
    showSignUpPopup();
  });
};

const showSuccessPopup = () => {
  successPopup.classList.remove('hidden');
  successPopupEnterButton.addEventListener('click', () => {
    successPopup.classList.add('hidden');
    showLoginPopup();
  });
  successPopupClose.addEventListener('click', () => {
    successPopup.classList.add('hidden');
  });
};

signUpMainButton.addEventListener('click', (event) => {
  event.preventDefault();
  signUpPopup.classList.add('hidden');
  showSuccessPopup();
});

authorizationButton.addEventListener('click', () => {
  showLoginPopup();
});

loginPopupCloseButton.addEventListener('click', () => {
  loginPopup.classList.add('hidden');
});

signUpPopupCloseButton.addEventListener('click', () => {
  signUpPopup.classList.add('hidden');
});
