/**
 * 指定の長さのトークンを生成
 *
 * @param {number} len
 * @returns
 */
const genToken = (len: number): string => {
  const str =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._~+/';
  let result = '';
  for (let i = 0; i < len; i++) {
    // tslint:disable-next-line: insecure-random
    result += str.charAt(Math.floor(Math.random() * str.length));
  }
  return result;
};

export default genToken;
