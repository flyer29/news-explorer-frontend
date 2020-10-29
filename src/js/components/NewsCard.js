export default class NewsCard {
  constructor(element, defaultImage, container, api, checkSavedArticles) {
    this.element = element;
    this.container = container;
    this.defaultImage = defaultImage;
    this.api = api;
    this.checkSavedArticles = checkSavedArticles;
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
    card.querySelector('.card__date').textContent = this._createCardDate(item.publishedAt);
    card.querySelector('.card__title').textContent = item.title;
    card.querySelector('.card__text').textContent = item.description;
    card.querySelector('.card__source').textContent = item.source.name;
    card.querySelector('.card__keyword').textContent = this._getKeyWord();
    this.saveButton = container.querySelector('.card__save-button');
    if (this.checkSavedArticles(item)) {
      card.querySelector('.card__id').textContent = this.checkSavedArticles(item).id;
      card.querySelector('.card__keyword').textContent = this.checkSavedArticles(item).keyword;
      this.saveButton.classList.add('card__save-button_type_saved');
    };
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

  _saveCard = () => {
    this.api.createArticle(this._createData())
      .then((res) => {
        this.saveButton.parentNode.querySelector('.card__id').textContent = res.data._id;
        this.saveButton.classList.add('card__save-button_type_saved');
      })
      .then(() => {
        this.api.getAllUserArticles()
          .then((res) => {
            localStorage.setItem('userArticles', `${JSON.stringify(res.data)}`);
          })
          .catch((err) => {
            alert(err.message);
          })
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
      .then(() => {
        this.api.getAllUserArticles()
          .then((res) => {
            localStorage.setItem('userArticles', `${JSON.stringify(res.data)}`)
          })
          .catch((err) => {
            if (err.message === 'У вас нет сохранённых статей') {
              localStorage.removeItem('userArticles');
              throw err.message;
            }
            throw err;
          })
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
      image: this._checkImage(article.urlToImage),
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

  _createCardDate = (date) => {
    const months = [
      'января',
      'февраля',
      'марта',
      'апреля',
      'мая',
      'июня',
      'июля',
      'августа',
      'сентября',
      'октября',
      'ноября',
      'декабря',
    ];
    const cardDate = new Date(date);
    return `${cardDate.getDate()} ${months[cardDate.getMonth()]} ${cardDate.getFullYear()}`;
  }

  _getKeyWord = () => {
    if (localStorage.getItem('keyword')) {
      return localStorage.getItem('keyword');
    }
    return document.querySelector('.search__input').value;
  }

  _checkImage = (element) => {
    if (element === null) {
      return 'https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80';
    }
    return element;
  }
}
