import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as BearerStrategy } from "passport-http-bearer";
import redis from "redis";
import client from "../configs/redis";
import genToken from "./genToken";

const createError = require("http-errors");

const localOption = {
  // usernameField: 'email',
  // passwordField: 'password',
  session: false
};

// ログイン処理
passport.use(
  new LocalStrategy(localOption, (username, password, done) => {
    // TODO: DBを使った認証
    if (password === "password") {
      const userId = 1;

      const accessToken = genToken(350);
      const refreshToken = genToken(350);

      const redisClient = redis.createClient(client);
      const akey = `user:${userId}:access:${accessToken.slice(0, 10)}`;
      const rkey = `user:${userId}:refresh:${refreshToken.slice(0, 10)}`;

      redisClient
        .multi()
        .set(akey, accessToken)
        .expire(akey, 86400)
        .set(rkey, refreshToken)
        .expire(rkey, 2592000)
        .exec((err, replies) => {
          // console.log(replies);
        });
      redisClient.quit();

      done(null, { username });
    } else {
      done(createError(401, "login failed"));
    }
  })
);

// ログイン済チェック
passport.use(
  new BearerStrategy((token, done) => {
    if (token === "hogehoge") {
      done(null, { username: "hogehoge" });
    } else {
      done(createError(401, "login failed"));
    }
  })
);

export const passportInitialize = passport.initialize();
