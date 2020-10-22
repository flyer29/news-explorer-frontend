export default class Header {
  constructor(element) {
    this.element = element;
    this.logoutButton = this.element.querySelector('.button_logout');
    this.link = this.element.querySelector('.header__link_type_passive');
    this.authorizeButton = this.element.querySelector('.button_authorization');
  }


  render = (props) => {
    if (props.isLoggedIn) {
      this.logoutButton.textContent = props.userName;
      this.logoutButton.classList.remove('hidden');
      this.link.classList.remove('hidden');
      this.authorizeButton.classList.add('hidden');
    } else {
      this.logoutButton.classList.add('hidden');
      this.link.classList.add('hidden');
      this.authorizeButton.classList.remove('hidden');
    }
  }

}