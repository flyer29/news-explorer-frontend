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

export default sortKeywords;
