import IORedis from 'ioredis';
import express from 'express';
import { ProvideSingleton } from '../ioc';
import options from '../redis';
import passport from 'passport';

@ProvideSingleton(AuthService)
export class AuthService {
  constructor() {}

  async login(request: express.Request): Promise<any> {
    let result;
    try {
      result = await new Promise((resolve, reject) => {
        passport.authenticate(
          'local',
          { session: false },
          async (err: any, user: any, _info: any) => {
            if (err) {
              if (err.status === 401) {
                // 認証情報が違う理由で不正な場合
                reject({
                  authenticated: false,
                  status: 401,
                  message: 'invalid token',
                });
              }
            }
            if (!user) {
              // username, passwordどちらかが不足している場合
              reject({
                authenticated: false,
                status: 400,
                message: 'username and password required',
              });
            }
            resolve({ authenticated: true, user });
          }
        )(request, request.res, request.next);
      });
    } catch (err) {
      return err;
    }
    return result;
  }

  isLogin(accessToken: string): boolean {
    // passport.authenticate(
    //   'bearer',
    //   { session: false },
    //   async (err: any, user: any, _info: any) => {
    //     if (err) {
    //       if (err.status === 401) {
    //         // トークンが失効や破損などの理由で不正な場合
    //         res.set('www-authenticate', 'Bearer error="invalid_token"');
    //         return res.status(err.status).json({ message: 'invalid token' });
    //       }
    //       return next(err);
    //     }
    //     if (!user) {
    //       // bearerが不足している場合
    //       res.set('www-authenticate', 'Bearer realm="token_required"');
    //       return res.status(401).json({ message: 'token required' });
    //     }
    //     req.user = user;
    //     next();
    //   }
    // )(req, res, next);

    const redis = new IORedis(options);
    redis.del(`token:access:${accessToken}`);
    redis.quit();
    return true;
  }

  logout(accessToken: string): boolean {
    const redis = new IORedis(options);
    redis.del(`token:access:${accessToken}`);
    redis.quit();
    return true;
  }
}
