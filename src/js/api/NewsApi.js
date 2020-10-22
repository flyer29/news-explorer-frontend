export default class NewsApi {
  constructor(options) {
    this.options = options;
  }

  getArticles = (data) => {
    return fetch(`http://newsapi.org/v2/everything?q=${data.keyword}&from=2020-10-21&pageSize=10&sortBy=publishedAt&apiKey=${this.options.apiKey}`, {
        method: 'GET',
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