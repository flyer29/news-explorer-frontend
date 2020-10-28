export default class ArticlesData {
  constructor(element) {
    this.element = element;
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

  sortKeywords = (array) => {
    const repeats = array.map((element) => {
      return array.filter((item) => item === element).length;
    });

    const items = [];
    for (let i = 0; i < array.length; i++) {
      items.push({
        word: `${array[i]}`,
        repeats: repeats[i],
      });
    }

    items.sort((a, b) => {
      if (a.repeats > b.repeats) {
        return -1;
      }
      if (a.repeats < b.repeats) {
        return 1;
      }
      return 0;
    });

    const result = [];
    for (let i = 0; i < items.length; i++) {
      result.push(items[i].word);
    }
    return result;
  }
}
