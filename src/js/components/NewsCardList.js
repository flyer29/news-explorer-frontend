export default class NewsCardList {
  constructor(array, template, element, defaultImage, container) {
    this.container = container;
    this.preloader = document.querySelector('.loader');
    this.notFound = document.querySelector('.not-found');
    this.errorMessage = this.notFound.querySelector('.not-found__message');
    this.array = array;
    this.template = template;
    this.element = element;
    this.defaultImage = defaultImage;
  }

  renderResults = () => {
    const articles = JSON.parse(localStorage.getItem('articles'));
    articles.forEach((item) => {
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

  showMore = () => {

  }

  _addCard = (card) => {
    this.element.appendChild(card);
  }
}
