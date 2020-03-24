import Router from "express-promise-router";
import * as echo from "./controllers/echo_controller";

const router = Router();

router.get("/echo", echo.index);

export default router;
