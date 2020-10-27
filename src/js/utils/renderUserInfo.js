const renderUserInfo = () => {
  const articles = JSON.parse(localStorage.getItem('userArticles'));
  console.log(articles);

}

export default renderUserInfo;