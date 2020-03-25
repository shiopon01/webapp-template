import express from "express";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import routes from "./routes";

export const app: express.Express = express();

// redisとexpress-sessionの関連付け
const redis = require("redis");
const session = require("express-session");

let RedisStore = require("connect-redis")(session);
let redisClient = redis.createClient({
  host: "localhost",
  port: 6379,
  prefix: "sid:"
});

redisClient.unref();
redisClient.on("error", console.log);

// TODO: オプションを考える
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {
      path: "/"
    }
  })
);

// Passportの設定を行う(ユーザID、パスワード認証)
const createError = require("http-errors");

passport.use(
  new LocalStrategy((username, password, done) => {
    // 仮の認証ロジック。目的に合わせてデータベースに問い合わせたりする。
    if (username === "hogehoge") {
      done(null, username);
    } else {
      done(createError(401, "username: hogehogeさん以外はログインできません。"));
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());
// 認証したタイミングで呼ばれる。コールバック関数のuserにはStrategy上で実行したdone()の第二引数が入る。
// コールバック関数上のdone()の第二引数の値が任意のエンドポイント上のreq.userで取れるようになる。
passport.serializeUser((user: any, done: any) => {
  done(null, user);
});
// セッションが有効であれば、任意のエンドポイント上にアクセスしたタイミングで呼ばれる。
passport.deserializeUser((user: any, done: any) => {
  done(null, user);
});

/**
 * routes
 */
app.use("/", routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});
// error handler
app.use((err: any, req: any, res: any, _next: any) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// NOTE: supertestを動かす際にapp.listenするとテストが終わらなくなる
if (process.env.NODE_ENV !== "test") {
  const port = process.env.PORT ? process.env.PORT : 3001;
  app.listen(port, () => {
    console.log(`env : ${process.env.NODE_ENV}`);
    console.log(`port: ${port}`);
  });
}
