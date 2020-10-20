import './pages/main/index.css';
import Popup from './js/components/Popup';
import Form from './js/utils/Form';
import MainApi from './js/api/MainApi';

(function () {
  const root = document.querySelector('.popup');

  const authorizationButton = document.querySelector('.button_authorization');
  const loginPopupTemplate = document.querySelector('#login');
  const signUpPopupTemplate = document.querySelector('#signup');

  const config = {
    baseUrl: 'http://localhost:3000',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const authApi = new MainApi(config);

  const login = new Form(loginPopupTemplate);
  const signUp = new Form(signUpPopupTemplate, authApi);
  const SignUpPopup = new Popup(root, signUp, login, authApi);

  // const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  authorizationButton.addEventListener('click', SignUpPopup.openMainPopup);
}());
