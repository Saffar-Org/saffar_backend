import express from "express";
import signUp from "../controllers/sign_up_controller";
import driverSignUp from "../controllers/driver_sign_up_controller";
import signIn from "../controllers/sign_in_controller";
import driverSignIn from "../controllers/driver_sign_in_controller";

const router = express.Router();

router.post("/sign_up", (req: any, res: any) => {
  signUp(req, res);
});

router.post("/driver_sign_up", (req: any, res: any) => {
  driverSignUp(req, res);
});

router.post("/sign_in", (req: any, res: any) => {
  signIn(req, res);
});

router.post("/driver_sign_in", (req: any, res: any) => {
  driverSignIn(req, res);
});

export = router;
