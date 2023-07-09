import Err from "../constants/error";
import TokenMiddleware from "../middlewares/token_middleware";
import Ride from "../models/Ride";

/// Creates a Ride document in MongoDB
const addRide = async (req: any, res: any) => {
  try {
    // Validates Bearer token
    TokenMiddleware.validateBearerToken(req, res);

    const userId: string = req.body.user_id;
    const driverId: string = req.body.driver_id;
    const sourceAddressId: string = req.body.source_address_id;
    const destinationAddressId: string = req.body.destination_address_id;
    const startTimeString: string = req.body.start_time;
    const endTimeString: string = req.body.end_time;
    const cancelled: boolean = req.body.cancelled ?? false;
    const price: number = req.body.price;
    const discountPrice: number = req.body.discount_price;

    // If required params are not present then return 400 response
    if (
      userId === undefined ||
      driverId === undefined ||
      sourceAddressId === undefined ||
      destinationAddressId === undefined ||
      startTimeString === undefined ||
      price === undefined
    ) {
      return res.status(400).json({
        error: {
          code: Err.code.EMPTY_PARAM,
          message: Err.message.EMPTY_PARAM,
        },
      });
    }

    // Date and Time from string
    const startTime = new Date(startTimeString);
    const endTime = new Date(endTimeString);

    // Creating a ride in MongoDB
    await Ride.create({
      user: userId,
      driver: driverId,
      source_address: sourceAddressId,
      destination_address: destinationAddressId,
      start_time: startTime,
      end_time: endTime,
      cancelled: cancelled,
      price: price,
      discount_price: discountPrice,
    });

    // Successful response after ride is created
    res.status(400).json({
      message: "Ride created successfully.",
    });
  } catch (error) {
    console.log(`Error in addRide: ${error}`);

    // Server error 
    res.status(500).json({
      error: {
        code: Err.code.SERVER_ERROR,
        message: Err.message.SERVER_ERROR,
      },
    });
  }
};

export = addRide;
