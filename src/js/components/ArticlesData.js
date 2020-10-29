export default class ArticlesData {
  constructor(element, sortKeywords) {
    this.element = element;
    this.sortKeywords = sortKeywords;
  }

  renderUserInfo = () => {
    const userName = JSON.parse(localStorage.getItem('user')).name;
    const articlesKeywords = this.element.querySelector('.articles__keywords');
    const articlesAmount = this.element.querySelector('.articles__keywords-number');
    this.element.querySelector('.articles__user-name').textContent = userName;
    if (!localStorage.getItem('userArticles')) {
      this.element.querySelector('.articles__message').textContent = 'У вас пока нет сохранённых статей.';
      this.element.querySelector('.articles__keyword-message').classList.add('hidden');
    } else {
      const articles = JSON.parse(localStorage.getItem('userArticles'));
      this.element.querySelector('.articles__keyword-message').classList.remove('hidden');
      this.element.querySelector('.articles__amount').textContent = articles.length;
      const keywords = articles.map((item) => {
        return item.keyword;
      });
      const sortedKyewords = this.sortKeywords(keywords);
      if (sortedKyewords.length < 3) {
        articlesKeywords.textContent = [...new Set(sortedKyewords)].join(', ');
        articlesAmount.textContent = '0 другим';
      } else {
        articlesKeywords.textContent = [...new Set(sortedKyewords)].slice(0, 2).join(', ');
        articlesAmount.textContent = `${[...new Set(sortedKyewords)].slice(2).length} другим`;
      }
    }
  }
};
