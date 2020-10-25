import createCardDate from '../utils/createCardDate';

export default class SavedNewsCard {
  constructor(element, container, api) {
    this.element = element;
    this.container = container;
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
    return container;
  }
}
