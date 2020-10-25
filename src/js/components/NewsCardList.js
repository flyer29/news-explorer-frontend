export default class NewsCardList {
  constructor(createCardFunction, element, container, cardsAmount, card) {
    this.container = container;
    this.amount = cardsAmount;
    this.card = card;
    this.preloader = document.querySelector('.loader');
    this.notFound = document.querySelector('.not-found');
    this.errorMessage = this.notFound.querySelector('.not-found__message');
    this.createCardFunction = createCardFunction;
    this.element = element;
    this.button = this.container.querySelector('.button_more');
    this.n = 0;
  }

  renderResults = () => {
    const articles = JSON.parse(localStorage.getItem('articles'));
    const part = articles.splice(this.amount * this.n, this.amount);
    if ((part.length < this.amount)  || (this.amount * this.n + this.amount === articles.length)) {
      this._addCard(part);
      this.button.classList.add('hidden');
      this.n = 0;
    } else {
      this._addCard(part);
    }
    this.element.parentNode.classList.remove('hidden');
    this.card.renderIcon();
  }

  clearContent = () => {
    this.notFound.classList.add('hidden');
    this.element.querySelectorAll('.card-wrapper').forEach((item) => {
      item.remove();
    })
  }

  showButton = () => {
      this.button.classList.remove('hidden');
  }

  renderLoader = (isLoad) => {
    if (isLoad) {
      this.preloader.classList.remove('hidden');
    } else {
      this.preloader.classList.add('hidden');
    }
  }

  renderError = (message) => {
    this.container.classList.add('hidden');
    this.errorMessage.textContent = message;
    this.notFound.classList.remove('hidden');
  }

  _showMore = () => {
    this.n += 1;
    this.renderResults()
  }

  _addCard = (array) => {
    array.forEach((item) => {
      this.element.appendChild(this.createCardFunction(item));
    })
  }

  setListener = () => {
    this.button.addEventListener('click', this._showMore);
  }
}
