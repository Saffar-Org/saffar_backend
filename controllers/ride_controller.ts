import Err from "../constants/error";
import Ride from "../models/Ride";
import User from "../models/User";
import Driver from "../models/Driver";
import Address from "../models/Address";
import Validator from "../utils/validator";
import tokenMiddleware from "../middlewares/token_middleware";
import Helper from "../utils/helper";

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

    const currentDateTime: Date = new Date();

    // Finding a list of Rides ridden by the user then delete 
    // the '__v' field and replace
    // the '_id' field to 'id' field.
    let allPreviousRidesByUser: any[] = (await Ride.find({
      user: userId,
      $or: [
        { end_time: { $exists: false } },
        { end_time: { $lt: currentDateTime } },
      ],
    })).map((previousRide) => {
      return Helper.getObjectWithIdInsteadOf_idAnd__v(previousRide);
    }); 

    // Getting user, driver, source address, destination address and 
    // deleting the '__v' field and replacing the '_id' field to 'id'.
    for (let index = 0; index < allPreviousRidesByUser.length; index++) {
      const userId = allPreviousRidesByUser[index].user;
      const user = await User.findById(userId);
      const userWithIdField = Helper.getObjectWithIdInsteadOf_idAnd__v(user);
      allPreviousRidesByUser[index].user = userWithIdField;

      const driverId = allPreviousRidesByUser[index].driver;
      const driver = await Driver.findById(driverId);
      const driverWithIdField = Helper.getObjectWithIdInsteadOf_idAnd__v(driver);
      allPreviousRidesByUser[index].driver = driverWithIdField;

      const sourceAddressId = allPreviousRidesByUser[index].source_address;
      const sourceAddress = await Address.findById(sourceAddressId);
      const sourceAddressWithIdField = Helper.getObjectWithIdInsteadOf_idAnd__v(sourceAddress);
      allPreviousRidesByUser[index].source_address = sourceAddressWithIdField;

      const destinationAddressId = allPreviousRidesByUser[index].destination_address;
      const destinationAddress = await Address.findById(destinationAddressId);
      const destinationAddressWithIdField = Helper.getObjectWithIdInsteadOf_idAnd__v(destinationAddress);
      allPreviousRidesByUser[index].destination_address = destinationAddressWithIdField;
    }

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
