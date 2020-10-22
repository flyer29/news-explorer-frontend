export default class HeaderArticles {
  constructor(element) {
    this.element = element;
    this.logoutButton = this.element.querySelector('.button_logout_articles');
    this.link = this.element.querySelector('.header__link_type_articles');
  }

  render = (props) => {
      this.logoutButton.textContent = props.userName;
  }
}
