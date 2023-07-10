import express from "express";
import signUp from "../controllers/sign_up_controller";
import driverSignUp from "../controllers/driver_sign_up_controller";
import signIn from "../controllers/sign_in_controller";
import driverSignIn from "../controllers/driver_sign_in_controller";

const router = express.Router();

router.post("/sign_up", signUp);

router.post("/driver_sign_up", driverSignUp);

router.post("/sign_in", signIn);

router.post("/driver_sign_in", driverSignIn);

export = router;
