import * as express from "express";
import getAllAddressOfUserWithId from "../controllers/address_controller";

const router = express.Router();

router.get("/", (req: any, res: any) => {
    getAllAddressOfUserWithId(req, res);
});

export = router;
