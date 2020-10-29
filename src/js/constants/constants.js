const validatorMessages = {
  TEXT_NOT_VALID: 'Должно быть от 2 до 30 символов',
  EMAIL_NOT_VALID: 'Неправильный формат Email',
  VALUE_MISSING: 'Это обязательное поле',
  NAME_NOT_VALID: 'Необходимо ввести корректное имя',
  PASSWORD_NOT_VALID: 'Пароль должен содержать не менее восьми символов',
};
const popupMessages = {
  SIGNUP_SUCCESS: 'Пользователь успешно зарегистрирован!',
  SIGNUP: 'Регистрация',
  LOGIN: 'Вход',
  LINK_TO_SIGNUP: 'Зарегистрироваться',
  LINK_TO_LOGIN: 'Войти',
};
const searchErrorMessages = {
  N0T_FOUND: 'Ничего не найдено',
  SERVER_ERROR: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз',
};
const mainApiConfig = {
  baseUrl: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://api.mynewsapp.tk',
  headers: {
    'Content-Type': 'application/json',
  },
};
const newsApiConfig = {
  domen: process.env.NODE_ENV === 'development' ? 'http://newsapi.org/' : 'https://nomoreparties.co/news/',
  apiKey: 'a99a8e317b0f460593fb8974cb00701e',
  from: 7,
  to: new Date(),
  pageSize: process.env.NODE_ENV === 'development' ? 12 : 100,
};
const cardsListConfig = {
  iteration: 0,
  cardsAmount: 3,
};
const mainPageDOM = {
  root: document.querySelector('.popup'),
  loginPopupTemplate: document.querySelector('.login'),
  signUpPopupTemplate: document.querySelector('.signup'),
  cardTemplate: document.querySelector('.card'),
  searchElement: document.querySelector('.search'),
  headerElement: document.querySelector('.header'),
  logoutButton: document.querySelector('.button_logout'),
  headerBurger: document.querySelector('.header__button'),
  authorizationButton: document.querySelector('.button_authorization'),
  searchContainer: document.querySelector('.search__container'),
  formOfSearch: document.querySelector('.search__form'),
  searchResults: document.querySelector('.search-results'),
  cardsContainer: document.querySelector('.search-results__container'),
};
const articlesPageDOM = {
  header: document.querySelector('.header'),
  logoutButton: document.querySelector('.button_logout'),
  headerBurger: document.querySelector('.header__button'),
  cardTemplate: document.querySelector('.card-template'),
  cardsContainer: document.querySelector('.search-results__container'),
  articlesInfo: document.querySelector('.articles'),
};
const preloaderElement = document.querySelector('.loader');
const notFoundElement = document.querySelector('.not-found');
const defaultImage = '../../images/glass.png';

export default {
  validatorMessages,
  popupMessages,
  searchErrorMessages,
  preloaderElement,
  notFoundElement,
  cardsListConfig,
  defaultImage,
  mainApiConfig,
  newsApiConfig,
  mainPageDOM,
  articlesPageDOM,
};
