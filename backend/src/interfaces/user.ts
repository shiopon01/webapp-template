// 「id」と「name」をプロパティに持つUser情報の型定義
export interface User {
  id: number;
  name: string;
}
// 「name」をプロパティに持つリクエスト情報の型定義
export interface RequestBody {
  name: string;
}
