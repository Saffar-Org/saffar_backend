import * as express from "express";
import tokenMiddleware from "../middlewares/token_middleware";
import getUserInfo from "../controllers/get_user_info_controller";

const router = express.Router();

router.get("/", tokenMiddleware.validateBearerToken, getUserInfo);

export = router;
