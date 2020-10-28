const getFrom = (number) => {
  const from = new Date().getTime() - (number * 24 * 3600 * 1000);
  return new Date(from).toISOString().slice(0, 10);
};

const getTo = () => new Date().toISOString().slice(0, 10);

const getKeyWord = () => {
  if (localStorage.getItem('keyword')) {
    return localStorage.getItem('keyword');
  }
  return document.querySelector('.search__input').value;
};

const createCardDate = (date) => {
  const months = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ];
  const cardDate = new Date(date);
  return `${cardDate.getDate()} ${months[cardDate.getMonth()]} ${cardDate.getFullYear()}`;
};

const checkSavedArticles = (card) => {
  if (localStorage.getItem('articles') && localStorage.getItem('userArticles')) {
    const userArticles = JSON.parse(localStorage.getItem('userArticles'));
    let data = false;
    userArticles.forEach((element) => {
      if (
        element.date.slice(0, 10) === card.publishedAt.slice(0, 10)
        && element.title === card.title
        && element.link === card.url
        && element.source === card.source.name
        && element.text === card.description
      ) {
        data = {
          id: element._id,
          keyword: element.keyword,
        };
      }
    });
    return data;
  }
};

const checkImage = (element) => {
  if (element === null) {
    return 'https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80';
  }
  return element;
};

const sortKeywords = (array) => {
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
};

export default {
  checkSavedArticles,
  createCardDate,
  sortKeywords,
  getKeyWord,
  checkImage,
  getFrom,
  getTo,
};
