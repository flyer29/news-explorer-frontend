const getKeyWord = () => {
  if (localStorage.getItem('keyword')) {
    return localStorage.getItem('keyword');
  }
  return document.querySelector('.search__input').value;
};

export default getKeyWord;
