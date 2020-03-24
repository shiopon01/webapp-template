import expressPromiseRouter from "express-promise-router";
import * as echo from "./controllers/echo_controller";

const routes = expressPromiseRouter();

routes.get("/echo", echo.index);

export default routes;
