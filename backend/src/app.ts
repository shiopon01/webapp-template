import * as express from "express";
import * as echo from "./echo";

export const app: express.Express = express();

/**
 * routes
 */
app.get("/echo", echo.echoApi);

// NOTE: supertestを動かす際にapp.listenするとテストが終わらなくなる
if (process.env.NODE_ENV !== "test") {
  const port = process.env.PORT ? process.env.PORT : 3001;
  app.listen(port, () => {
    console.log(`listen port: ${port}`);
  });
}
