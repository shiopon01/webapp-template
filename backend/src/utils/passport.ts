import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as BearerStrategy } from "passport-http-bearer";
import IORedis from "ioredis";
import bcrypt from "bcrypt";
import options from "../configs/redis";
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
    // TODO: DBからユーザー取得
    const user = {
      id: 1,
      username: "admin",
      password: bcrypt.hashSync("password", 10)
    };

    if (bcrypt.compareSync(password, user.password)) {
      const accessToken = genToken(350);
      const akey = `token:access:${accessToken.slice(0, 20)}`;

      const redis = new IORedis(options);
      redis
        .multi()
        .hmset(akey, { token: accessToken, user: user.id })
        .expire(akey, 86400)
        .exec();
      redis.quit();

      done(null, { user });
    } else {
      done(createError(401, "login failed"));
    }
  })
);

// ログイン済チェック
passport.use(
  new BearerStrategy(async (token, done) => {
    const redis = new IORedis(options);
    const accessToken20 = token.slice(0, 20);
    const sessionToken = await redis.hget(`token:access:${accessToken20}`, "token");

    if (token === sessionToken) {
      const userId = await redis.hget(`token:access:${accessToken20}`, "user");
      redis.quit();

      // TODO: ユーザー情報取得

      done(null, { id: userId, accessToken20 });
    } else {
      redis.quit();
      done(createError(401, "login failed"));
    }
  })
);

export const passportInitialize = passport.initialize();
