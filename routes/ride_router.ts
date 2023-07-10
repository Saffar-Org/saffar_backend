import * as express from "express";
import getPreviousRidesOfUser from "../controllers/get_previous_rides_controller";
import addRide from "../controllers/add_ride_controller";
import tokenMiddleware from "../middlewares/token_middleware";
import getPriceInfoAndCalculateRidePrice from "../controllers/calculate_ride_price_controller";

const router = express.Router();

router.get(
  "/previous_rides",
  tokenMiddleware.validateBearerToken,
  getPreviousRidesOfUser
);

router.post("/add_ride", tokenMiddleware.validateBearerToken, addRide);

router.get(
  "/total_price",
  tokenMiddleware.validateBearerToken,
  getPriceInfoAndCalculateRidePrice
);

export = router;
