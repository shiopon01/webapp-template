import express from "express";
import passport from "passport";

export const login = (req: express.Request, res: express.Response, next: any): void => {
  passport.authenticate("local", { session: false }, async (err: any, user: any, info: any) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).json({ message: "authentication failed" });
    }
    res.status(200).json({ user });
  })(req, res, next);
};

export const logout = (req: any, res: any) => {
  console.log("User", req.user);

  // TODO: セッション削除処理

  res.status(200).json({ message: "success" });
};
