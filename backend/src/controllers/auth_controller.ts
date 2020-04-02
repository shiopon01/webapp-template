import IORedis from "ioredis";
import options from "../configs/redis";

export const login = (req: any, res: any) => {
  // ミドルウェアでログイン処理までしているため、ログイン成功済みのリクエストだけたどり着く
  res.status(200).json({ message: "success", user: req.user });
};

export const logout = (req: any, res: any) => {
  const redis = new IORedis(options);
  redis.del(`token:access:${req.user.accessToken20}`);
  redis.quit();

  res.status(200).json({ message: "success" });
};
