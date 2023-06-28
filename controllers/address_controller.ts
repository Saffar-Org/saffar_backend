import Err from "../constants/error";
import Ride from "../models/Ride";
import User from "../models/User";
import Address from "../models/Address";
import Validator from "../utils/validator";
import tokenMiddleware from "../middlewares/token_middleware";

/// Gets and validates Bearer token then gets all the 
/// previous rides destination address of the user.
/// If token is not valid, user id is not present, user 
/// is not present then returns a 400 response. Else 
/// returns a list of all the addresses.
const getAllAddressOfUserWithId = async (
  req: any,
  res: any,
  next?: Function
) => {
  try {
    const token: string | undefined =
      tokenMiddleware.getBearerTokenFromRequestAndSendErrorResponseIfTokenInvalid(
        req,
        res,
      );

    // If token is not present then return undefined
    if (!token) {
      return undefined;
    }

    const validToken: boolean = Validator.validateToken(token);

    // If token is not valid return a 400 response
    if (!validToken) {
      return res.status(400).json({
        error: {
          code: Err.code.INVALID_BEARER_TOKEN,
          message: Err.message.INVALID_BEARER_TOKEN,
        },
      });
    }

    const userId = req.body.user_id;

    // If user id not present return a 400 response
    if (!userId) {
      return res.status(400).json({
        error: {
          code: Err.code.EMPTY_PARAM,
          message: Err.message.EMPTY_PARAM,
        },
      });
    }

    await Ride.findOne({});
    await Address.findOne({});

    // Find a user with user id in MongoDB
    const user = await User.findById(userId);

    // If user is not present then return a 400 response
    if (!user) {
      return res.status(400).json({
        error: {
          code: Err.code.NO_USER_WITH_ID,
          message: Err.message.NO_USER_WITH_ID,
        },
      });
    }

    const rides = [];

    // Getting all rides info of the user from MongoDB.
    for (let index = 0; index < user.rides.length; index++) {
      const rideId = user.rides[index]._id;

      const ride = await Ride.findById(rideId);

      if (ride) {
        rides.push(ride);
      }
    }

    const previousRideAddresses = [];

    // Getting all destination address info from MongoDB.
    for (let index = 0; index < rides.length; index++) {
      const addressId = rides[index].destination_address._id;

      const destinationAddress = await Address.findById(addressId);

      if (destinationAddress) {
        previousRideAddresses.push(destinationAddress);
      }
    }

    // Sending a 200 response with all the previous rides
    // destination address to the user.
    res.status(200).json({
      message: "All destination addresses of the user fetched successfully.",
      addresses: previousRideAddresses,
    });
  } catch (error) {
    console.log(`Error in getAllAddressOfUserWithId: ${error}`);
  }
};

export = getAllAddressOfUserWithId;
