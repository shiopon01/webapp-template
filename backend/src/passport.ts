import bcrypt from 'bcrypt';
import crypto from 'crypto';
import IORedis from 'ioredis';
import passport from 'passport';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import { Strategy as LocalStrategy } from 'passport-local';

import options from './redis';
import { UserService } from './services/user.service';
import genToken from './utils/genToken';

const createError = require('http-errors');

const localOption = {
  // usernameField: 'email',
  // passwordField: 'password',
  session: false,
};

// ログイン処理
passport.use(
  new LocalStrategy(localOption, (username, password, done) => {
    // TODO: DBからユーザー取得
    const user = {
      id: 1,
      username: 'admin',
      password: bcrypt.hashSync('password', 10),
      token: '',
    };

    if (
      username === user.username &&
      bcrypt.compareSync(password, user.password)
    ) {
      const accessToken = genToken(350);
      const akey = `token:access:${accessToken.slice(0, 20)}`;

      const redis = new IORedis(options);
      redis
        .multi()
        .hmset(akey, { token: accessToken, user: user.id })
        .expire(akey, 86400)
        .exec();
      redis.quit();

      user.token = accessToken;
      done(null, user);
    } else {
      done(createError(401, 'login failed'));
    }
  })
);

// ログイン済チェック
passport.use(
  new BearerStrategy(async (token, done) => {
    const redis = new IORedis(options);
    const accessToken20 = token.slice(0, 20);
    const sessionToken = await redis.hget(
      `token:access:${accessToken20}`,
      'token'
    );

    try {
      if (
        token.length === (sessionToken !== null && sessionToken.length) &&
        crypto.timingSafeEqual(
          Buffer.from(token),
          Buffer.from(sessionToken || '')
        )
      ) {
        const userId = await redis.hget(
          `token:access:${accessToken20}`,
          'user'
        );

        // TODO: ユーザー情報取得 mock
        const userService = new UserService();
        const user = userService.find(Number(userId) || 0);

        done(null, user);
      } else {
        done(createError(401, 'login failed'));
      }
    } catch (err) {
      done(err);
    } finally {
      redis.quit();
    }
  })
);

export const passportInitialize = passport.initialize();
