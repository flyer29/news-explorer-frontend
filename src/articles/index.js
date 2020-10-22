import '../pages/articles/index.css';
import HeaderArticles from '../js/components/HeaderArticles';
import MainApi from '../js/api/MainApi';

const config = {
  baseUrl: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
};

const header = new HeaderArticles(document.querySelector('.header'));

const mainApi = new MainApi(config);
mainApi.getUserData()
  .then((res) => {
    localStorage.setItem('user', `${JSON.stringify(res.data)}`);
    const props = {
      isLoggedIn: true,
      userName: JSON.parse(localStorage.getItem('user')).name,
    };
    console.log(props);
    header.render(props);
  })
  .catch((err) => {
    console.log(err);
  });



const props = {
  isLoggedIn: true,
  userName: JSON.parse(localStorage.getItem('user')).name,
};
header.render(props);

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

