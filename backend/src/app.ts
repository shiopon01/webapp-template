import * as express from "express";
import routes from "./routes";

export const app: express.Express = express();

/**
 * routes
 */
app.use("/", routes);

console.log("ENV", process.env.NODE_ENV);

// NOTE: supertestを動かす際にapp.listenするとテストが終わらなくなる
if (process.env.NODE_ENV !== "test") {
  const port = process.env.PORT ? process.env.PORT : 3001;
  app.listen(port, () => {
    console.log(`listen port: ${port}`);
  });
}
