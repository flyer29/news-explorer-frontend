const getFrom = (number) => {
  const from = new Date().getTime() - (number * 24 * 3600 * 1000);
  return new Date(from).toISOString().slice(0, 10);
};

export default getFrom;
