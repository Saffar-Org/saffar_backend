import * as express from "express";
import signIn from "../controllers/sign_in_controller";

const router = express.Router();

router.post('/', (req: any, res: any) => {
    signIn(req, res);
});

export = router;
