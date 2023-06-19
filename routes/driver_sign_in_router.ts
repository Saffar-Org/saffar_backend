import * as express from "express";
import driverSignIn from "../controllers/driver_sign_in_controller";

const router = express.Router();

router.post("/", (req: any, res: any) => {
  driverSignIn(req, res);
});

export = router;
