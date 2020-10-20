xport default class MainApi {
  constructor(options) {
    this.options = options;
    this.url = this.options.baseUrl;
    this.headers = this.options.headers;
  }

  getUserData = () => {

  }

  signup = (data) => {
    return fetch(`${this.url}/signup`, {
        method: 'POST',
        headers: this.headers,
        credentials: 'include',
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      })
      .then((res) => {
        if (res.ok) {
        return res.json();
      }
      console.log(res);
      return Promise.reject(`Что-то пошло не так... Код ошибки: ${res.status}`);
    });
  }

  signin = (data) => {
    return fetch(`${this.url}/signin`, {
      method: 'POST',
      headers: this.headers,
      credentials: 'include',
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    })
    .then((res) => {
      if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так... Код ошибки: ${res.status}`);
  });
  }
}
