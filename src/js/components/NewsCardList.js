export default class NewsCardList {
  constructor(createCardFunction, element, container, cardListConfig, card, preloader, notFound) {
    this.container = container;
    this.cardListConfig = cardListConfig;
    this.amount = this.cardListConfig.cardsAmount;
    this.iteration = this.cardListConfig.iteration;
    this.card = card;
    this.preloader = preloader;
    this.notFound = notFound;
    this.errorMessage = this.notFound.querySelector('.not-found__message');
    this.createCardFunction = createCardFunction;
    this.element = element;
    this.button = this.container.querySelector('.button_more');
  }

  renderResults = () => {
    if (JSON.parse(localStorage.getItem('articles')).length === 0) {
      return;
    } else {
      const articles = JSON.parse(localStorage.getItem('articles'));
      const part = articles.splice(this.amount * this.iteration, this.amount);
      if ((this.amount % part.length > 1) || (this.amount * this.iteration === articles.length)) {
        this._addCard(part);
        this.button.classList.add('hidden');
        this.iteration = 0;
      } else {
        this._addCard(part);
      }
      this.element.parentNode.classList.remove('hidden');
      this.card.renderIcon();
      this.setListener();
    }
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
    this.iteration += 1;
    this.renderResults();
  }

  _addCard = (array) => {
    array.forEach((item) => {
      this.element.appendChild(this.createCardFunction(item));
    })
  }

  setListener = () => {
    this.button.addEventListener('click', this._showMore);
  }
};
