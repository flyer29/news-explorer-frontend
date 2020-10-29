export default class HeaderArticles {
  constructor(element, api) {
    this.element = element;
    this.api = api;
    this.headerTitle = this.element.querySelector('.header__title');
    this.logoutButton = this.element.querySelector('.button_logout_articles');
    this.overlay = this.element.querySelector('.header__overlay');
    this.headerNav = this.element.querySelector('.header__nav');
    this.link = this.element.querySelector('.header__link_type_articles');
    this.burger = this.element.querySelector('.header__button');
    this.linkMenu = this.element.querySelectorAll('.header__link');
  }

  render = (props) => {
    this.logoutButton.textContent = props.userName;
  }

  logout = () => {
    this.api.logout()
      .then(() => {
        this.render(false);
      })
      .then(() => {
        localStorage.removeItem('user')
        localStorage.removeItem('userArticles');
      })
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        return err;
      })
  }

  openMenu = () => {
    this.headerTitle.classList.remove('header__title_articles');
    this.logoutButton.classList.add('button_logout_menu');
    this.burger.classList.add('header__button_close');
    this.overlay.classList.remove('hidden');
    this.headerNav.classList.add('show');
    this.linkMenu.forEach((item) => {
      item.classList.add('header__link_menu');
    });
    this._setListener();
  }

  closeMenu = () => {
    this.headerTitle.classList.add('header__title_articles');
    this.logoutButton.classList.remove('button_logout_menu');
    this.burger.classList.remove('header__button_close');
    this.overlay.classList.add('hidden');
    this.headerNav.classList.remove('show');
    this.linkMenu.forEach((item) => {
      item.classList.remove('header__link_menu');
    });
    this._removeListener();
  }

  _setListener = () => {
    this.burger.addEventListener('click', this.closeMenu);
  }

  _removeListener = () => {
    this.burger.removeEventListener('click', this.closeMenu);
  }
};
