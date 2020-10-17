export default class BaseComponent {
  constructor(template) {
    this.template = template;
    this.closeButton = this.template.content.querySelector('.popup__close');
  }

  open() {
    this.element.classList.remove('hidden');
    this._setEventListeners();
  }

  _close() {
    this.element.classList.add('hidden');
    this._removeEventListeners();
  }

  _closeByEsc(event) {
    if (event.keyCode === 27) {
      this._close();
    }
  }

  _setEventListeners() {
    this.closeButton.addEventListener('click', this._close);
    window.addEventListener('keydown', this._closeByEsc);
  }

  _removeEventListeners() {
    this.closeButton.removeEventListener('click', this._close);
    window.removeEventListener('keydown', this._closeByEsc);
  }
}