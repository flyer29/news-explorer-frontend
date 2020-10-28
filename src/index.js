import './pages/main/index.css';
import Popup from './js/components/Popup';
import Header from './js/components/Header';
import Form from './js/components/Form';
import MainApi from './js/api/MainApi';
import NewsCard from './js/components/NewsCard';
import SearchForm from './js/components/SearchForm';
import Search from './js/components/Search';
import NewsApi from './js/api/NewsApi';
import NewsCardList from './js/components/NewsCardList';
import checkSavedArticles from './js/utils/checkSavedArticles';
import utils from './js/utils/utils';

(function () {
  const root = document.querySelector('.popup');
  const loginPopupTemplate = document.querySelector('.login');
  const signUpPopupTemplate = document.querySelector('.signup');
  const cardTemplate = document.querySelector('.card');
  const searchElement = document.querySelector('.search');
  const headerElement = document.querySelector('.header');
  const logoutButton = headerElement.querySelector('.button_logout');
  const headerBurger = headerElement.querySelector('.header__button');
  const authorizationButton = headerElement.querySelector('.button_authorization');
  const searchContainer = document.querySelector('.search__container');
  const formOfSearch = document.querySelector('.search__form');
  const searchResults = document.querySelector('.search-results');
  const cardsContainer = document.querySelector('.search-results__container');
  const { getFrom, getTo } = utils;


  const cardsAmount = 3;
  const defaultImage = './images/glass.png';

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

  const mainApi = new MainApi(mainApiConfig);
  const newsApi = new NewsApi(newsApiConfig, getFrom, getTo);
  const card = new NewsCard(cardTemplate, defaultImage, cardsContainer, mainApi);
  const createNewCard = (...arg) => new NewsCard(cardTemplate, defaultImage, cardsContainer, mainApi, checkSavedArticles).create(...arg);
  const newsCardList = new NewsCardList(createNewCard, cardsContainer, searchResults, cardsAmount, card);
  const searchForm = new SearchForm(searchContainer, mainApi);
  const loginForm = new Form(loginPopupTemplate, mainApi);
  const signUpForm = new Form(signUpPopupTemplate, mainApi);
  const search = new Search(searchElement, newsApi, newsCardList);
  const header = new Header(headerElement, mainApi, card);

  const popup = new Popup(root, signUpForm, loginForm, mainApi, header, card);

  mainApi.getUserData()
    .then((res) => {

      localStorage.setItem('user', `${JSON.stringify(res.data)}`);
      const props = {
        isLoggedIn: true,
        userName: JSON.parse(localStorage.getItem('user')).name,
      };
      header.render(props);
    })
    /* if (localStorage.getItem('articles')) {
        newsCardList.renderResults();
    } */
    .catch((err) => {
      /* localStorage.removeItem('user');
      localStorage.removeItem('userArticles'); */
      return err;
    });

  mainApi.getAllUserArticles()
    .then((res) => {
      localStorage.setItem('userArticles', `${JSON.stringify(res.data)}`);
    })
    .then(() => {
      newsCardList.renderResults();
    })
    .catch((err) => {
      console.log(err.message);
      // localStorage.removeItem('userArticles');
    });


  /* checkSavedArticles(); */
  // const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  authorizationButton.addEventListener('click', popup.openMainPopup);
  headerBurger.addEventListener('click', header.openMenu);
  logoutButton.addEventListener('click', header.logout);
  searchForm.setEventListeners();
  formOfSearch.addEventListener('submit', search.getArticles);
}());
