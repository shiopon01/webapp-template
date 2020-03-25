import express from "express";
import passport from "passport";

/**
 * GET /echo
 * Return a string same as "say" query param.
 */
export const login = (req: express.Request, res: express.Response, next: any): void => {
  if (req.isAuthenticated()) return next();

  passport.authenticate("local", { session: false }, async (err: any, user: any, info: any) => {
    if (err) {
      return next(err); // will generate a 500 error
    }

    if (! user) {
      return res.status(400).json({ success : false, message : 'authentication failed' });
    }

    res.status(400).json({ say: "query param is required" });
  })(req, res, next);

  // 最終リクエストの10秒後にセッションが失効する
  // req.session.cookie.expires = new Date(Date.now() + 10 * 1000);

  // const query: { say: string } = <{ say: string }>req.query;
  // if (query.say !== undefined) {
  //   res.send(echo(query.say));
  // } else {
  //   res.status(400).send('"say" query param is required');
  // }
};

// export const logout = (req: any, res: any) => {
//   models.revoked_tokens
//     .create({
//       jwtid: req.jwtPayload.jti
//     })
//     .catch(err => {
//       console.error(err);
//       console.error("revoked_tokens.create() failed...");
//     });

//   req.logout();
//   res.status(200).json({ message: "Accepted" });
// };

/**
 * return a string same as input
 * @param say input (= output)
 */
export const echo = (say: string): string => {
  return say;
};
