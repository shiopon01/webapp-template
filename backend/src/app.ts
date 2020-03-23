import * as express from "express";
import * as echo from "./echo";

export const app: express.Express = express();

/**
 * routes
 */
app.get("/echo", echo.echoApi);

app.listen(3001, () => {
  console.log("listen port: 3001");
});
