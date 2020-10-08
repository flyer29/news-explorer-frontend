import './index.css';

const headerButton = document.querySelector('.header__button');
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
  });
});
