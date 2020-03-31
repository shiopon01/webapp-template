import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as BearerStrategy } from "passport-http-bearer";

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
      // TODO: トークンを生成してRedisに保存
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
