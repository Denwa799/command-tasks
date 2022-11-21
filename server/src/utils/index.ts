export const stringReverse = (string: string) => {
  return string.split('').reverse().join('');
};

export const generateRandomString = () => {
  return (Math.random() + 1).toString(36).substring(4);
};
