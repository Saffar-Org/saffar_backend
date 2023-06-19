import * as express from "express";
import driverSignUp from "../controllers/driver_sign_up_controller";

const router = express.Router();

router.post("/", (req: any, res: any) => {
    driverSignUp(req, res);
});

export = router;
