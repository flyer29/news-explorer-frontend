import './pages/main/index.css';
import Popup from './js/components/Popup';
import Header from './js/components/Header';
import Form from './js/components/Form';
import MainApi from './js/api/MainApi';
import Card from './js/components/Card';
import SearchForm from './js/components/SearchForm';
import Search from './js/components/Search';
import NewsApi from './js/api/NewsApi';
import NewsCardList from './js/components/NewsCardList';
import checkSavedArticles from './js/utils/checkSavedArticles';

(function () {
  const root = document.querySelector('.popup');
  const loginPopupTemplate = document.querySelector('#login');
  const signUpPopupTemplate = document.querySelector('#signup');
  const cardTemplate = document.querySelector('#card');
  const searchElement = document.querySelector('.search');
  const headerElement = document.querySelector('.header');
  const logoutButton = headerElement.querySelector('.button_logout');
  const headerBurger = headerElement.querySelector('.header__button');
  const authorizationButton = headerElement.querySelector('.button_authorization');
  const searchContainer = document.querySelector('.search__container');
  const formOfSearch = document.querySelector('.search__form');
  const searchResults = document.querySelector('.search-results');
  const cardsContainer = document.querySelector('.search-results__container');
  const cardsAmount = 3;
  const defaultImage = './images/glass.png';

  const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://api.mynewsapp.tk';
  const config = {
    baseUrl: `${baseUrl}`,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const newsApiConfig = {
    apiKey: 'a99a8e317b0f460593fb8974cb00701e',
    from: 7,
    to: new Date(),
    pageSize: 12,
  };

  const mainApi = new MainApi(config);
  const newsApi = new NewsApi(newsApiConfig);
  const card = new Card(cardTemplate, defaultImage, cardsContainer, mainApi);
  const createNewCard = (...arg) => new Card(cardTemplate, defaultImage, cardsContainer, mainApi, checkSavedArticles).create(...arg);
  const newsCardList = new NewsCardList(createNewCard, cardsContainer, searchResults, cardsAmount, card);
  const searchForm = new SearchForm(searchContainer);
  const loginForm = new Form(loginPopupTemplate);
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
    .then(() => {
      if (localStorage.getItem('articles')) {
        newsCardList.renderResults();
      }
    })
    .catch((err) => {
      localStorage.removeItem('user');
      localStorage.removeItem('userArticles');
      console.log(err.message);
    });

  /* mainApi.getAllUserArticles()
    .then((res) => {
      localStorage.setItem('userArticles', JSON.stringify(res.data));
    })
    .catch((err) => {
      console.log(err.message);
      localStorage.removeItem('articles');
    }); */


  /* checkSavedArticles(); */
  // const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  authorizationButton.addEventListener('click', popup.openMainPopup);
  headerBurger.addEventListener('click', header.openMenu);
  logoutButton.addEventListener('click', header.logout);
  searchForm.setEventListeners();
  formOfSearch.addEventListener('submit', search.getArticles);
}());
