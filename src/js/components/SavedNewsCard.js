import createCardDate from '../utils/createCardDate';
/* import renderUserInfo from '../utils/renderUserInfo'; */

export default class SavedNewsCard {
  constructor(element, container, api, articlesData) {
    this.element = element;
    this.container = container;
    this.articlesData = articlesData;
    this.api = api;
  }

  create = (item) => {
    const container = this.element.content.firstElementChild.cloneNode(true);
    const card = container.firstElementChild;
    card.setAttribute('href', `${item.link}`);
    card.querySelector('.card__image').setAttribute('src', `${item.image}`);

    card.querySelector('.card__date').textContent = createCardDate(item.date);
    card.querySelector('.card__title').textContent = item.title;
    card.querySelector('.card__text').textContent = item.text;
    card.querySelector('.card__source').textContent = item.source;
    card.querySelector('.card__keyword').textContent = item.keyword;
    card.querySelector('.card__id').textContent = item._id;
    this.trashButton = container.querySelector('.card__trash-button');
    this._setListener();
    return container;
  }

  _deleteCard = () => {
    this.api.deleteArticle(this._getCardId())
    .then(() => {
      this.api.getAllUserArticles()
        .then((res) => {
            localStorage.setItem('userArticles', `${JSON.stringify(res.data)}`)
          this.trashButton.parentNode.remove();
        })
        .then(() => {
          this.articlesData.renderUserInfo();
        })
        .catch((err) => {
          if (err.message === 'У вас нет сохранённых статей') {
            this.trashButton.parentNode.remove();
          localStorage.removeItem('userArticles');
          this.articlesData.renderUserInfo();
          throw err.message;
          }
          throw err;
        });
    })
    .catch((err) => {
      throw err;
    });
  }

  _getCardId = () => {
    const data = {
      id: this.trashButton.parentNode.querySelector('.card__id').textContent,
    }
    return data;
  }

  _setListener = () => {
    this.trashButton.addEventListener('click', this._deleteCard);
  }
}
