import express from "express";
import signUp from "../controllers/sign_up_controller";

const router = express.Router();

router.post("/", (req: any, res: any) => {
    signUp(req, res);
});

export = router;
