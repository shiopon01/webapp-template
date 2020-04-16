import { User, RequestBody } from '../domains/user';

// ※Databaseとかに下記のようなデータ格納されているとする
const users: User[] = [
  {
    id: 1,
    name: 'Tanka',
  },
  {
    id: 2,
    name: 'Suzuki',
  },
];

// IDでユーザ情報を取得する関数
export const getUser = (id: number): User | {} => {
  return users.find((user) => user.id === id) || {};
};

// リクエストされた情報からユーザ情報を登録する関数
export const createUser = (body: RequestBody): void => {
  users.push({
    id: users.length + 1,
    name: body.name,
  });
};
