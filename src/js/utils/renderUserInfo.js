import sortKeywords from './sortKeywords';

const renderUserInfo = (element) => {
  const articles = JSON.parse(localStorage.getItem('userArticles'));
  const userName = JSON.parse(localStorage.getItem('user')).name;
  const articlesKeywords = element.querySelector('.articles__keywords');
  const articlesAmount = element.querySelector('.articles__keywords-number');
  element.querySelector('.articles__user-name').textContent = userName;
  element.querySelector('.articles__amount').textContent = articles.length;
  const keywords = articles.map((item) => {
    return item.keyword;
  });
  console.log(keywords);
  const sortedKyewords = sortKeywords(keywords);
  if (sortedKyewords.length < 3) {
    articlesKeywords.textContent = [...new Set(sortedKyewords)].join(', ');
    articlesAmount.textContent = '';
  } else {
    articlesKeywords.textContent = [...new Set(sortedKyewords)].slice(0, 2).join(', ');
    articlesAmount.textContent = `${[...new Set(sortedKyewords)].slice(2).length} другим`;
  }
};
export default renderUserInfo;
