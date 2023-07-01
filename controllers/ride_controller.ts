import Err from "../constants/error";
import Ride from "../models/Ride";
import Address from "../models/Address";
import Validator from "../utils/validator";
import tokenMiddleware from "../middlewares/token_middleware";

/// Gets and validates Bearer token then gets all the
/// previous rides of the user.
/// If token is not valid, user id is not present, user
/// is not present then returns a 400 response. Else
/// returns a list of all the previous rides of the user.
const getAllPreviousRidesOfUser = async (
  req: any,
  res: any,
  next?: Function
) => {
  try {
    const token: string | undefined =
      tokenMiddleware.getBearerTokenFromRequestAndSendErrorResponseIfTokenInvalid(
        req,
        res
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

    Address.findOne();

    const currentDateTime: Date = new Date();

    // Finding a list of Rides ridden by the user
    const allPreviousRidesByUser = await Ride.find({
      user: userId,
      $or: [
        { end_time: { $exists: false } },
        { end_time: { $lt: currentDateTime } },
      ],
    }).populate(["user", "driver", "source_address", "destination_address"]);

    // Sending a 200 response with all the previous rides
    // destination address to the user.
    res.status(200).json({
      message: "All previous rides of the user fetched successfully.",
      previous_rides: allPreviousRidesByUser,
    });
  } catch (error) {
    console.log(`Error in getAllPreviousRidesOfUser: ${error}`);
  }
};

export = getAllPreviousRidesOfUser;
