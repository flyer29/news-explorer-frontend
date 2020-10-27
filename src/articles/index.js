import '../pages/articles/index.css';
import HeaderArticles from '../js/components/HeaderArticles';
import MainApi from '../js/api/MainApi';
import SavedNewsCard from '../js/components/SavedNewsCard';
import SavedNewsCardList from '../js/components/SavedNewsCardList';
import renderUserInfo from '../js/utils/renderUserInfo';

const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://api.mynewsapp.tk';
const config = {
  baseUrl: `${baseUrl}`,
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
    localStorage.setItem('userArticles', `${JSON.stringify(res.data)}`);
  })
  .then(() => {
    cardList.renderArticles();
  })
  .catch((err) => {
    console.log(err.message);
  });

renderUserInfo();

headerBurger.addEventListener('click', headerArticles.openMenu);
logoutButton.addEventListener('click', headerArticles.logout);
