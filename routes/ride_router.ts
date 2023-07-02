import * as express from "express";
import getPreviousRidesOfUser from "../controllers/get_previous_rides_controller";
import addRide from "../controllers/add_ride_controller";

const router = express.Router();

router.get("/previous_rides", (req: any, res: any) => {
  getPreviousRidesOfUser(req, res);
});

router.post("/add_ride", (req: any, res: any) => {
  addRide(req, res);
});

export = router;
