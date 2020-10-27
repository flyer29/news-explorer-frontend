export default class Search {
  constructor(element, api, cardList) {
    this.element = element;
    this.api = api;
    this.cardList = cardList;
    this.input = this.element.querySelector('.search__input');
  }

  getArticles = (event) => {
    event.preventDefault();
    this.cardList.renderLoader(true);
    this.cardList.clearContent();
    this.cardList.showButton();
    this.api.getArticles(this._createData())
    .then((res) => {
      if(res.totalResults === 0) {
        this.cardList.clearContent();
        localStorage.setItem('articles', '[]');
        this.cardList.renderError('Ничего не найдено');
        return;
      } else {
        localStorage.setItem('articles', `${JSON.stringify(res.articles)}`);
        localStorage.setItem('keyword', `${document.querySelector('.search__input').value}`)
      }
    })
    .then(() => {
      this.cardList.renderResults();
    })
    .then(() => {
      this.cardList.setListener();
      this.element.classList.remove('hidden');
    })
    .catch(() => {
      this.cardList.renderError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
    })
    .finally(() => {
      this.cardList.renderLoader(false);
    })
  }

  getKeyWord = () => {
    return this.input.value;
  }

  _createData = () => {
    return {
      keyword: this.getKeyWord(),
    }
  }
}
