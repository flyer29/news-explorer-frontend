import './pages/main/index.css';
import Popup from './js/components/Popup';
import Header from './js/components/Header';
import Form from './js/utils/Form';
import MainApi from './js/api/MainApi';
import Search from './js/components/Search';
import NewsApi from './js/api/NewsApi';
import NewsCardList from './js/components/NewsCardList';

(function () {
  const root = document.querySelector('.popup');
  const authorizationButton = document.querySelector('.button_authorization');
  const loginPopupTemplate = document.querySelector('#login');
  const signUpPopupTemplate = document.querySelector('#signup');
  const cardTemplate = document.querySelector('#card');
  const searchElement = document.querySelector('.search');
  const headerElement = document.querySelector('.header');
  const searchForm = document.querySelector('.search__form');
  const searchResults = document.querySelector('.search-results');
  const cardsContainer = document.querySelector('.search-results__container');
  const defaultImage = './images/glass.png';
  const config = {
    baseUrl: 'http://localhost:3000',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const newsApiConfig = {
    apiKey: 'a99a8e317b0f460593fb8974cb00701e',
  };
  const newsCardList = new NewsCardList([], cardTemplate, cardsContainer, defaultImage, searchResults);
  const newsApi = new NewsApi(newsApiConfig);
  const search = new Search(searchElement, newsApi, newsCardList);
  const authApi = new MainApi(config);
  const header = new Header(headerElement);
  const loginForm = new Form(loginPopupTemplate);
  const signUpForm = new Form(signUpPopupTemplate, authApi);
  const popup = new Popup(root, signUpForm, loginForm, authApi, header);

  authApi.getUserData()
    .then((res) => {
      localStorage.setItem('user', `${JSON.stringify(res.data)}`);
      const props = {
        isLoggedIn: true,
        userName: JSON.parse(localStorage.getItem('user')).name,
      };
      header.render(props);
    })
    .catch((err) => {
      console.log(err);
    });
  // const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  authorizationButton.addEventListener('click', popup.openMainPopup);
  searchForm.addEventListener('submit', search.getArticles);
}());
