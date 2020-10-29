import '../pages/articles/index.css';
import HeaderArticles from '../js/components/HeaderArticles';
import MainApi from '../js/api/MainApi';
import SavedNewsCard from '../js/components/SavedNewsCard';
import SavedNewsCardList from '../js/components/SavedNewsCardList';
import ArticlesData from '../js/components/ArticlesData';
import sortedKyewords from '../js/utils/sortKeywords';
import constants from '../js/constants/constants';

(function () {
  const {
    mainApiConfig,
    articlesPageDOM,
  } = constants;
  const {
    header,
    logoutButton,
    headerBurger,
    cardTemplate,
    cardsContainer,
    articlesInfo,
  } = articlesPageDOM;

  const articlesData = new ArticlesData(articlesInfo, sortedKyewords);
  const mainApi = new MainApi(mainApiConfig);
  const headerArticles = new HeaderArticles(header, mainApi);
  const card = new SavedNewsCard(cardTemplate, cardsContainer, mainApi, articlesData);
  const createNewCard = (...arg) => new SavedNewsCard(
    cardTemplate,
    cardsContainer,
    mainApi,
    articlesData,
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
      throw err;
    });

  articlesData.renderUserInfo();
  headerBurger.addEventListener('click', headerArticles.openMenu);
  logoutButton.addEventListener('click', headerArticles.logout);
}());
