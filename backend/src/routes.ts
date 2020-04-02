import expressPromiseRouter from "express-promise-router";
import passport from "passport";
import * as auth from "./controllers/auth_controller";
import * as echo from "./controllers/echo_controller";

// Passportのlocal認証を行うミドルウェア。Passportに帰依するエラーはHTTPレスポンスを返し、通常のエラーはnext(err)
// NOTE: username, passwordどちらかが不足している場合にStrategyが勝手に返す401 Unauthorizedをキャッチ
const local = (req: any, res: any, next: any): void => {
  passport.authenticate("local", { session: false }, async (err: any, user: any, _info: any) => {
    if (err) {
      if (err.status === 401) {
        // 認証情報が違う理由で不正な場合
        return res.status(err.status).json({ message: "invalid token" });
      }
      return next(err);
    }
    if (!user) {
      // username, passwordどちらかが不足している場合
      return res.status(400).json({ message: "username and password required" });
    }
    req.user = user;
    next();
  })(req, res, next);
};

// passportのbearer認証を行うミドルウェア。Passportに帰依するエラーはHTTPレスポンスを返し、通常のエラーはnext(err)
// NOTE: bearerが不足している場合にStrategyが勝手に返す401 Unauthorizedをキャッチ
// NOTE: https://qiita.com/uasi/items/cfb60588daa18c2ec6f5
const bearer = (req: any, res: any, next: any): void => {
  passport.authenticate("bearer", { session: false }, async (err: any, user: any, _info: any) => {
    if (err) {
      if (err.status === 401) {
        // トークンが失効や破損などの理由で不正な場合
        res.set("www-authenticate", 'Bearer error="invalid_token"');
        return res.status(err.status).json({ message: "invalid token" });
      }
      return next(err);
    }
    if (!user) {
      // bearerが不足している場合
      res.set("www-authenticate", 'Bearer realm="token_required"');
      return res.status(401).json({ message: "token required" });
    }
    req.user = user;
    next();
  })(req, res, next);
};

const routes = expressPromiseRouter();

routes.post("/login", local, auth.login);
routes.get("/logout", bearer, auth.logout);

routes.get("/echo", echo.index);

export default routes;
