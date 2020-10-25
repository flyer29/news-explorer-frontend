const checkImage = (element) => {
  if (element === null) {
    return 'https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80';
  }
  return element;
};

export default checkImage;
