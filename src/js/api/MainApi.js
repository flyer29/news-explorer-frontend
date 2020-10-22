export default class MainApi {
  constructor(options) {
    this.options = options;
    this.url = this.options.baseUrl;
    this.headers = this.options.headers;
  }

  getUserData = () => {
    return fetch(`${this.url}/users/me`, {
      method: 'GET',
      headers: this.headers,
      credentials: 'include',
    })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
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
          const json = res.json();
          return json.then(Promise.reject.bind(Promise))
        })
        .catch((err) => {
          throw err;
        });
      };

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
        const json = res.json();
        return json.then(Promise.reject.bind(Promise))
      })
      .catch((err) => {
        throw err;
      });
  }
}
