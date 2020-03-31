import express from "express";
import bodyParser from "body-parser";
import routes from "./routes";
import { passportInitialize } from "./utils/passport";

export const app: express.Express = express();

app.use(bodyParser.json());

const redis = require("redis");
const redisClient = redis.createClient({
  host: "localhost",
  port: 6379,
  prefix: "sid:"
});
redisClient.unref();
redisClient.on("error", console.log);

// Passport
app.use(passportInitialize);

/**
 * routes
 */
app.use("/", routes);

const createError = require("http-errors");

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err: any, req: any, res: any, _next: any) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500).json({ error: err });
});

// NOTE: supertestを動かす際にapp.listenするとテストが終わらなくなる
if (process.env.NODE_ENV !== "test") {
  const port = process.env.PORT ? process.env.PORT : 3001;
  app.listen(port, () => {
    console.log(`env : ${process.env.NODE_ENV}`);
    console.log(`port: ${port}`);
  });
}
