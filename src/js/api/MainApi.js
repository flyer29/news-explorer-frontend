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
        const json = res.json();
        return json.then(Promise.reject.bind(Promise))
      })
      .catch((err) => {
        throw err;
      });
  }

  logout = () => {
    return fetch(`${this.url}/logout`, {
        method: 'POST',
        headers: this.headers,
        credentials: 'include',
      })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        throw err;
      });
  }

  createArticle = (data) => {
    return fetch(`${this.url}/articles`, {
        method: 'POST',
        headers: this.headers,
        credentials: 'include',
        body: JSON.stringify({
          keyword: data.keyword,
          title: data.title,
          text: data.text,
          source: data.source,
          image: data.image,
          link: data.link,
          date: data.date,
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

  deleteArticle = (data) => {
    return fetch(`${this.url}/articles/${data.id}`, {
        method: 'DELETE',
        headers: this.headers,
        credentials: 'include',
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

   getAllUserArticles = () =>  {
    return fetch(`${this.url}/articles`, {
        method: 'GET',
        headers: this.headers,
        credentials: 'include',
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



