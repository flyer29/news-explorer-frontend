const checkSavedArticles = (card) => {
  if (localStorage.getItem('articles') && localStorage.getItem('userArticles')) {
    const userArticles = JSON.parse(localStorage.getItem('userArticles'));
    let isSaved = false;
    userArticles.forEach((element) => {
      if (
        element.date.slice(0, 10) === card.publishedAt.slice(0, 10)
        && element.title === card.title
        && element.link === card.url
        && element.source === card.source.name
        && element.text === card.description
      ) {
        isSaved = true;
      }
    });
    return isSaved;
  }
};

export default checkSavedArticles;
