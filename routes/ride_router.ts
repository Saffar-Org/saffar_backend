import * as express from "express";
import getAllPreviousRidesOfUser from "../controllers/ride_controller";

const router = express.Router();

router.get("/previous_rides", (req: any, res: any) => {
    getAllPreviousRidesOfUser(req, res);
});

export = router;
