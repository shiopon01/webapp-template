import expressPromiseRouter from "express-promise-router";
import * as auth from "./controllers/auth_controller";
import * as echo from "./controllers/echo_controller";

const routes = expressPromiseRouter();

routes.post("/login", auth.login);
routes.get("/echo", echo.index);

export default routes;
