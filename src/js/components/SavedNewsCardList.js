export default class SavedNewsCardList {
  constructor(element, createCardFunction ,card) {
    this.element = element;
    this.createCardFunction = createCardFunction;
    this.card = card;
  }

  renderArticles = () => {
    const articles = JSON.parse(localStorage.getItem('userArticles'));
    if (articles.length !== 0) {
      this._addCard(articles);
      return;
    }
  }

  _addCard = (array) => {
    array.forEach((item) => {
      this.element.appendChild(this.createCardFunction(item));
    })
  }
}
