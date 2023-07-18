import * as express from "express";
import getPreviousRidesOfUser from "../controllers/get_previous_rides_controller";
import addRideAndRideAddresses from "../controllers/add_ride_controller";
import tokenMiddleware from "../middlewares/token_middleware";
import getPriceInfoAndCalculateRidePrice from "../controllers/calculate_ride_price_controller";
import findRideDriver from "../controllers/find_ride_driver_controller";

const router = express.Router();

router.get(
  "/previous_rides",
  tokenMiddleware.validateBearerToken,
  getPreviousRidesOfUser
);

router.post("/add_ride", tokenMiddleware.validateBearerToken, addRideAndRideAddresses);

router.get(
  "/total_price",
  tokenMiddleware.validateBearerToken,
  getPriceInfoAndCalculateRidePrice
);

router.get(
  "/find_ride_driver",
  tokenMiddleware.validateBearerToken,
  findRideDriver,
);

export = router;
