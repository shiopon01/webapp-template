const genToken = (len: number) => {
  const str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._~+/";
  let result = "";
  for (let i = 0; i < len; i++) {
    result += str.charAt(Math.floor(Math.random() * str.length));
  }
  return result;
};

export default genToken;
