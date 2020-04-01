import express from "express";
import passport from "passport";
import IORedis from "ioredis";
import options from "../configs/redis";

export const login = (req: express.Request, res: express.Response, next: any): void => {
  passport.authenticate("local", { session: false }, async (err: any, user: any, _info: any) => {
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
  console.log("User", req.user.accessToken20);

  const redis = new IORedis(options);
  redis.del(`token:access:${req.user.accessToken20}`)
  redis.quit();

  res.status(200).json({ message: "success" });
};
