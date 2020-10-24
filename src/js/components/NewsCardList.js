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
    const part = articles.splice(this.amount * this.n, this.amount);
    if ((part.length < this.amount)  || (this.amount * this.n + this.amount === articles.length)) {
      this._createCards(part);
      this.button.classList.add('hidden');
      this.n = 0;
    } else {
      this._createCards(part);
    }
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
      card.querySelector('.card__date').textContent = this.createCardDate(item.publishedAt);
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

  _addCard = (card) => {
    this.element.appendChild(card);
  }

  setListener = () => {
    this.button.addEventListener('click', this._showMore);
  }

  createCardDate = (date) => {
    const months = {
      '0': 'января',
      '1': 'февраля',
      '2': 'марта',
      '3': 'апреля',
      '4': 'мая',
      '5': 'июня',
      '6': 'июля',
      '7': 'августа',
      '8': 'сентября',
      '9': 'октября',
      '10': 'ноября',
      '11': 'декабря',
    }
    const cardDate = new Date(date);
    return `${cardDate.getDate()} ${months[cardDate.getMonth()]} ${cardDate.getFullYear()}`;
  }

}
