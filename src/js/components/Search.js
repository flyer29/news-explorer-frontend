export default class Search {
  constructor(element, api, cardList, messages, searchResults) {
    this.element = element;
    this.api = api;
    this.cardList = cardList;
    this.messages = messages;
    this.searchResults = searchResults;
    this.input = this.element.querySelector('.search__input');
  }

  getArticles = (event) => {
    event.preventDefault();
    this.cardList.renderLoader(true);
    this.cardList.clearContent();
    this.cardList.showButton();
    this.api.getArticles(this._createData())
      .then((res) => {
        if (res.totalResults === 0) {
          this.cardList.clearContent();
          localStorage.setItem('articles', '[]');
          this.cardList.renderError(this.messages.N0T_FOUND);
          this.searchResults.classList.add('hidden');
        } else {
          localStorage.setItem('articles', `${JSON.stringify(res.articles)}`);
          localStorage.setItem('keyword', `${document.querySelector('.search__input').value}`)
        }
      })
      .then(() => {
        this.cardList.renderResults();
      })
      .catch(() => {
        this.cardList.renderError(this.messages.SERVER_ERROR);
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
};
