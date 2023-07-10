import * as express from "express";
import getPreviousRidesOfUser from "../controllers/get_previous_rides_controller";
import addRide from "../controllers/add_ride_controller";
import tokenMiddleware from "../middlewares/token_middleware";

const router = express.Router();

router.get(
  "/previous_rides",
  tokenMiddleware.validateBearerToken,
  getPreviousRidesOfUser
);

router.post("/add_ride", addRide);

export = router;
