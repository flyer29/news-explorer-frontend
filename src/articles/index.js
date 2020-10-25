import '../pages/articles/index.css';
import HeaderArticles from '../js/components/HeaderArticles';
import MainApi from '../js/api/MainApi';
import SavedNewsCard from '../js/components/SavedNewsCard';
import SavedNewsCardList from '../js/components/SavedNewsCardList';

const config = {
  baseUrl: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
};

const header = document.querySelector('.header');
const logoutButton = header.querySelector('.button_logout');
const headerBurger = header.querySelector('.header__button');
const cardTemplate = document.querySelector('.card-template');
const cardsContainer = document.querySelector('.search-results__container');

const mainApi = new MainApi(config);
const headerArticles = new HeaderArticles(header, mainApi);
const card = new SavedNewsCard(cardTemplate, cardsContainer, mainApi);
const createNewCard = (...arg) => new SavedNewsCard(
  cardTemplate,
  cardsContainer,
  mainApi,
).create(...arg);
const cardList = new SavedNewsCardList(cardsContainer, createNewCard, card);


mainApi.getUserData()
  .then((res) => {
    localStorage.setItem('user', `${JSON.stringify(res.data)}`);
    const props = {
      isLoggedIn: true,
      userName: JSON.parse(localStorage.getItem('user')).name,
    };
    headerArticles.render(props);
  })
  .catch(() => {
    window.location.href = '../index.html';
  });

mainApi.getAllUserArticles()
  .then((res) => {
    localStorage.setItem('userArticles', JSON.stringify(res.data));
  })
  .then(() => {
    cardList.renderArticles();
  })
  .catch((err) => {
    console.log(err.message);
  });



/* const headerButton = document.querySelector('.header__button');
const headerTitle = document.querySelector('.header__title');
const headerLinks = document.querySelectorAll('.header__link');
const overlay = document.querySelector('.header__overlay');
const headerNav = document.querySelector('.header__nav');
const logoutButton = document.querySelector('.button_logout_articles');

headerButton.addEventListener('click', () => {
  headerNav.classList.toggle('show');
  logoutButton.classList.toggle('button_logout_menu');
  headerButton.classList.toggle('header__button_close');
  headerTitle.classList.toggle('header__title_menu');
  overlay.classList.toggle('hidden');
  headerLinks.forEach((item) => {
    item.classList.toggle('header__link_menu');
  }); */


headerBurger.addEventListener('click', headerArticles.openMenu);
logoutButton.addEventListener('click', headerArticles.logout);
