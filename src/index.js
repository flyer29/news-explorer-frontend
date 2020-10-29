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
import getTo from './js/utils/getTo';
import getFrom from './js/utils/getFrom';
import constants from './js/constants/constants';

(function () {
  const {
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
  } = constants;

  const {
    root,
    loginPopupTemplate,
    signUpPopupTemplate,
    cardTemplate,
    searchElement,
    headerElement,
    logoutButton,
    headerBurger,
    authorizationButton,
    searchContainer,
    formOfSearch,
    searchResults,
    cardsContainer,
  } = mainPageDOM;

  const mainApi = new MainApi(mainApiConfig);
  const newsApi = new NewsApi(newsApiConfig, getFrom, getTo);
  const card = new NewsCard(
    cardTemplate,
    defaultImage,
    cardsContainer,
    mainApi,
    checkSavedArticles,
  );
  const createNewCard = (...arg) => new NewsCard(
    cardTemplate,
    defaultImage,
    cardsContainer,
    mainApi,
    checkSavedArticles,
  ).create(...arg);
  const newsCardList = new NewsCardList(
    createNewCard,
    cardsContainer,
    searchResults,
    cardsListConfig,
    card,
    preloaderElement,
    notFoundElement,
  );
  const searchForm = new SearchForm(searchContainer, validatorMessages);
  const loginForm = new Form(loginPopupTemplate, mainApi, validatorMessages);
  const signUpForm = new Form(signUpPopupTemplate, mainApi, validatorMessages);
  const search = new Search(searchElement, newsApi, newsCardList, searchErrorMessages, searchResults);
  const header = new Header(headerElement, mainApi, card);
  const popup = new Popup(root, signUpForm, loginForm, mainApi, header, card, popupMessages);

  mainApi.getUserData()
    .then((res) => {
      localStorage.setItem('user', `${JSON.stringify(res.data)}`);
      const props = {
        isLoggedIn: true,
        userName: JSON.parse(localStorage.getItem('user')).name,
      };
      header.render(props);
    })
    .catch((err) => err.message);

  mainApi.getAllUserArticles()
    .then((res) => {
      localStorage.setItem('userArticles', `${JSON.stringify(res.data)}`);
    })
    .then(() => {
      if (localStorage.getItem('articles')) {
        newsCardList.renderResults();
      }
    })
    .catch((err) => err.message);

  authorizationButton.addEventListener('click', popup.openMainPopup);
  headerBurger.addEventListener('click', header.openMenu);
  logoutButton.addEventListener('click', header.logout);
  searchForm.setEventListeners();
  formOfSearch.addEventListener('submit', search.getArticles);
}());
