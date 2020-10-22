import Popup from './Popup';

export default class LoginPopup extends Popup {
  constructor(element, form, api, header) {
    super(element);
    this.form = form;
    this.api = api;
    this.header = header;
  }
}
