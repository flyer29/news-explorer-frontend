import Popup from './Popup';

export default class SignUpPopup extends Popup {
  constructor(element, form, api) {
    super(element);
    this.form = form;
    this.api = api;
  }
}
