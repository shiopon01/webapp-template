const genToken = () => {
  const str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._~+/";
  const len = 133;

  let result = "";
  for (let i = 0; i < len; i++) {
    result += str.charAt(Math.floor(Math.random() * str.length));
  }
  return result;
};

export default genToken;
