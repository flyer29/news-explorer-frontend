export default class NewsCardList {
  constructor(array, template, element, defaultImage, container, cardsAmount) {
    this.container = container;
    this.amount = cardsAmount;
    this.preloader = document.querySelector('.loader');
    this.notFound = document.querySelector('.not-found');
    this.errorMessage = this.notFound.querySelector('.not-found__message');
    this.array = array;
    this.template = template;
    this.element = element;
    this.defaultImage = defaultImage;
    this.button = this.container.querySelector('.button_more');
    this.n = 0;
  }

  renderResults = () => {
    const articles = JSON.parse(localStorage.getItem('articles'));
    const part = articles.splice(3 * this.n, 3);
    console.log(part.length);
    if ((part.length < 3)  || (3 * this.n + 3 === articles.length)) {
      this._createCards(part);
      this.button.classList.add('hidden');
      this.n = 0;
    } else {
      this._createCards(part);
    }

    /* for (let i = 0 + this.n; i < this.amount + this.n; i++) {
      part.push(articles[i]);
      if ((articles.length - part.length) < this.amount) {
        this.n = articles.length - part.length;
      }
      if (articles.length === part.length) {
        this.button.classList.add('hidden');
      } */
  }

  _createCards = (array) => {
    array.forEach((item) => {
      const card = this.template.content.firstElementChild.cloneNode(true);
      card.setAttribute('href', `${item.url}`);
      if (item.urlToImage === null) {
        card.querySelector('.card__image').setAttribute('src', `${this.defaultImage}`);
      } else {
        card.querySelector('.card__image').setAttribute('src', `${item.urlToImage}`);
      }
      card.querySelector('.card__date').textContent = item.publishedAt;
      card.querySelector('.card__title').textContent = item.title;
      card.querySelector('.card__text').textContent = item.description;
      card.querySelector('.card__source').textContent = item.source.name;
      this._addCard(card);
      this.element.parentNode.classList.remove('hidden');
    });
  }

  clearContent = () => {
    this.notFound.classList.add('hidden');
    this.element.querySelectorAll('.card').forEach((item) => {
      item.remove();
    })
  }

  showButton = () => {
    /* console.log(this.button);
    if (this.button.calssList.contains('hidden')) { */
      this.button.classList.remove('hidden');
   /*  }; */
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

  _addCard = (card) => {
    this.element.appendChild(card);
  }

  setListener = () => {
    this.button.addEventListener('click', this._showMore);
  }
}
