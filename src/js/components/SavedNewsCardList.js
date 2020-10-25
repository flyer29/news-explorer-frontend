export default class SavedNewsCardList {
  constructor(element, createCardFunction ,card) {
    this.element = element;
    this.createCardFunction = createCardFunction;
    this.card = card;
  }

  renderArticles = () => {
    const articles = JSON.parse(localStorage.getItem('userArticles'));
    console.log(articles);
    if (articles.length !== 0) {
      this._addCard(articles);
      return;
    } alert('У вас пока нет сохранённых статей.');
  }

  _addCard = (array) => {
    array.forEach((item) => {
      console.log(this.createCardFunction);
      this.element.appendChild(this.createCardFunction(item));
    })
  }
}
