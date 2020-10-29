export default class NewsApi {
  constructor(options, getFrom, getTo) {
    this.options = options;
    this.from = this.options.from;
    this.domen = options.domen;
    this.getFrom = getFrom;
    this.getTo = getTo;
  }

  getArticles = (data) => {
    return fetch(`${this.domen}v2/everything?q=${data.keyword}&from=${this.getFrom(this.from)}&to=${this.getTo()}&pageSize=${this.options.pageSize}&sortBy=publishedAt&apiKey=${this.options.apiKey}`, {
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
};
