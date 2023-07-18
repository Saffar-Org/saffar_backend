import Err from "../constants/error";
import Ride from "../models/Ride";
import Address from "../models/Address";

/// Creates a Ride document and the source and destination document
/// in MongoDB
const addRideAndRideAddresses = async (req: any, res: any) => {
  try {
    const userId: string = req.body.user_id;
    const driverId: string = req.body.driver_id;
    const sourceAddress: any = req.body.source_address;
    const destinationAddress: any = req.body.destination_address;
    const startTimeString: string = req.body.start_time;
    const endTimeString: string = req.body.end_time;
    const cancelled: boolean = req.body.cancelled ?? false;
    const price: number = req.body.price;
    const discountPrice: number = req.body.discount_price;

    // If required params are not present then return 400 response
    if (
      userId === undefined ||
      driverId === undefined ||
      sourceAddress === undefined ||
      destinationAddress === undefined ||
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

    // Creating the source address in MongoDB
    const sourceAddressDoc = await Address.create({
      place: sourceAddress["place"],
      street: sourceAddress["street"],
      state: sourceAddress["state"],
      country: sourceAddress["country"],
      lat: sourceAddress["lat"],
      lon: sourceAddress["lon"],
      pincode: sourceAddress["pincode"],
    });

    // Creating the destination address in MongoDB
    const destinationAddressDoc = await Address.create({
      place: destinationAddress["place"],
      street: destinationAddress["street"],
      state: destinationAddress["state"],
      country: destinationAddress["country"],
      lat: destinationAddress["lat"],
      lon: destinationAddress["lon"],
      pincode: destinationAddress["pincode"],
    });

    const sourceAddressId: string = sourceAddressDoc._id.toString();
    const destinationAddressId: string = destinationAddressDoc._id.toString();

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
    console.log(`Error in addRideAndRideAddresses: ${error}`);

    // Server error
    res.status(500).json({
      error: {
        code: Err.code.SERVER_ERROR,
        message: Err.message.SERVER_ERROR,
      },
    });
  }
};

export = addRideAndRideAddresses;
