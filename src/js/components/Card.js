import createCardDate from '../utils/createCardDate';
import checkImage from '../utils/checkImage';
import getKeyWord from '../utils/getKeyword';

export default class Card {
  constructor(element, defaultImage, container, api) {
    this.element = element;
    this.container = container;
    this.defaultImage = defaultImage;
    this.api = api;
  }

  create = (item) => {
      const container = this.element.content.firstElementChild.cloneNode(true);
      const card = container.firstElementChild;
      card.setAttribute('href', `${item.url}`);
      if (item.urlToImage === null) {
        card.querySelector('.card__image').setAttribute('src', `${this.defaultImage}`);
      } else {
        card.querySelector('.card__image').setAttribute('src', `${item.urlToImage}`);
      }
      card.querySelector('.card__date').textContent = createCardDate(item.publishedAt);
      card.querySelector('.card__title').textContent = item.title;
      card.querySelector('.card__text').textContent = item.description;
      card.querySelector('.card__source').textContent = item.source.name;
      card.querySelector('.card__keyword').textContent = getKeyWord();
      this.saveButton = container.querySelector('.card__save-button');
      this.setListener();
      return container;
  }

  renderIcon = () => {
    const buttons = this.container.querySelectorAll('.card__save-button');
    buttons.forEach((item) => {
      if (!localStorage.getItem('user')) {
        this._setCardButtonDisable(item);
      } else {
      this._setCardButtonEnable(item);
      }
    });
  }

  _setCardButtonDisable = (element) => {
    element.classList.add('card__save-button_type_unauthorized');
    element.setAttribute('disabled', true);
  }

  _setCardButtonEnable = (element) => {
    element.classList.remove('card__save-button_type_unauthorized');
    element.removeAttribute('disabled');
  }

  _saveCard  = () => {
    this.api.createArticle(this._createData())
      .then((res) => {
        console.log(res);
        this.saveButton.parentNode.querySelector('.card__id').textContent = res.data._id;
        this.saveButton.classList.add('card__save-button_type_saved');
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  _saveOrDeleteCard = () => {
    if (this.saveButton.classList.contains('card__save-button_type_saved')) {
      this._deleteCard();
    } else {
     this._saveCard();
    }
  }

  _deleteCard = () => {
    this.api.deleteArticle(this._getCardId())
    .then((res) => {
      alert(res.message);
      this.saveButton.classList.remove('card__save-button_type_saved');
    })
    .catch((err) => {
      alert(err.message);
    });
  }

  _getCardId = () => {
    const data = {
      id: this.saveButton.parentNode.querySelector('.card__id').textContent,
    }
    return data;
  }

  _createData = () => {
    const article = this._findArticle();
    const data = {
      keyword: this._getCardKyeWord(),
      title: article.title,
      text: article.description,
      source: article.source.name,
      image: checkImage(article.urlToImage),
      link: article.url,
      date: new Date(),
    }
    return data;
  }

  setListener = () => {
    this.saveButton.addEventListener('click', this._saveOrDeleteCard);
  }

  _findArticle = () => {
    const articles = JSON.parse(localStorage.getItem('articles'));
    const buttons = [];
    this.container.querySelectorAll('.card__save-button').forEach((item) => {
      buttons.push(item);
    });
    const index = buttons.indexOf(this.saveButton);
    const article = articles[index];
    return article;
  }

  _getCardKyeWord = () => {
    const keyword = this.saveButton.parentNode.querySelector('.card__keyword').textContent;
    return keyword;
  }
}
