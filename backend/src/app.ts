import * as express from "express";
import router from "./routes";

export const app: express.Express = express();

/**
 * routes
 */
app.use("/", router);

// NOTE: supertestを動かす際にapp.listenするとテストが終わらなくなる
if (process.env.NODE_ENV !== "test") {
  const port = process.env.PORT ? process.env.PORT : 3001;
  app.listen(port, () => {
    console.log(`listen port: ${port}`);
  });
}
