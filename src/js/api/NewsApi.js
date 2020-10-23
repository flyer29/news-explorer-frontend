export default class NewsApi {
  constructor(options) {
    this.options = options;
    this.from = this.options.from;
  }

  getArticles = (data) => {
    return fetch(`http://newsapi.org/v2/everything?q=${data.keyword}&from=${this._getFrom()}&to=${this._getTo()}&pageSize=${this.options.pageSize}&sortBy=publishedAt&apiKey=${this.options.apiKey}`, {
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

  _getFrom = () => {
    const from = new Date().getTime() - (this.from * 24 * 3600 * 1000);
    return new Date(from).toISOString().slice(0, 10);
  };

  _getTo = () => {
    return new Date().toISOString().slice(0, 10);
  }
}