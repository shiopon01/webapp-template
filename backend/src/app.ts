import 'reflect-metadata';

import bodyParser from 'body-parser';
import express from 'express';
import swaggerUI from 'swagger-ui-express';

import swaggerDocument from '../docs/swagger.json';
import { RegisterRoutes } from './routes';
import { passportInitialize } from './passport';

export const app: express.Express = express();

/**
 * settings
 */
app.use(bodyParser.json());
app.use(passportInitialize);

/**
 * routes
 */
// app.use('/', routes);
RegisterRoutes(app);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

/**
 * error handlers
 */
const createError = require('http-errors');

app.use((_req, _res, next) => {
  next(createError(404));
});

app.use((err: any, req: any, res: any, _next: any) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500).json({ error: err });
});

/**
 * listen
 *
 * NOTE: supertestを動かす際にapp.listenするとテストが終わらなくなるためtestは除く
 */
if (process.env.NODE_ENV !== 'test') {
  const port = process.env.PORT ? process.env.PORT : 3001;
  app.listen(port, async () => {
    console.log(`env : ${process.env.NODE_ENV}`);
    console.log(`port: ${port}`);
  });
}
