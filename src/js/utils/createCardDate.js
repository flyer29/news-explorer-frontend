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

export default createCardDate;
