import './pages/main/index.css';
import Popup from './js/components/Popup';
import Form from './js/utils/Form';
import MainApi from './js/api/MainApi';

(function () {
  const root = document.querySelector('.popup');

  const authorizationButton = document.querySelector('.button_authorization');
  const loginPopupTemplate = document.querySelector('#login');
  const signUpPopupTemplate = document.querySelector('#signup');
  const login = new Form(loginPopupTemplate);
  const signUp = new Form(signUpPopupTemplate);
  const SignUpPopup = new Popup(root, signUp, login);

  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  const config = {
    baseUrl: `${protocol}://api.mynewsapp.tk`,
    headers: {
      'Content-Type': 'application/jso',
    },
  };

  authorizationButton.addEventListener('click', SignUpPopup.openMainPopup);
}());
