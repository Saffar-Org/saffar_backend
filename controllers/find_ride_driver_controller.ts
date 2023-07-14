import * as bcrypt from "bcrypt";
import axios, { AxiosResponse } from "axios";
import Err from "../constants/error";
import Driver from "../models/Driver";
import Helper from "../utils/helper";
import Constant from "../constants/constant";

/// Finds a driver near the users location who is active.
/// If no driver is available then a new driver is created
/// and then the drive info is sent to the user.
const findRideDriver = async (req: any, res: any) => {
  try {
    const latitude: number = req.body.latitude;
    const longitude: number = req.body.longitude;
    const mapApiKey: string = req.body.map_api_key;

    // If latitude, longitude and map api key
    // are not present in req body
    // then send a 400 response
    if (!latitude || !longitude || !mapApiKey) {
      return res.status(400).json({
        error: {
          code: Err.code.EMPTY_PARAM,
          message: Err.message.EMPTY_PARAM,
        },
      });
    }

    const changeLatitude: boolean = Math.random() <= 0.5;
    const sign: number = Math.random() <= 0.5 ? 1 : -1;

    // Adding or Subtracting 2 km from user latitude if [changeLatitude] is [true]
    const pointLatitude: number =
      latitude + (changeLatitude ? sign * 0.018 : 0); // 0.018 degree is 2 km

    // Adding or Subtracting 2 km from user longitude if [changeLatitude] is [false]
    const pointLongitude: number =
      longitude + (!changeLatitude ? sign * 0.018 : 0); // 0.018 degree is 2 km

    // Get the route info from point to user location
    const response: AxiosResponse = await axios.get(
      `https://api.tomtom.com/routing/1/calculateRoute/${pointLatitude},${pointLongitude}:${latitude},${longitude}/json?key=${mapApiKey}`
    );

    // Route points
    const points = response.data["routes"][0]["legs"][0]["points"];
    const driverSourceLatLon = points[0];
    const driverDestinationLatLon = points[points.length - 1];

    const driverSourceLatitude: number = Number.parseFloat(
      driverSourceLatLon["latitude"]
    );
    const driverSourceLongitude: number = Number.parseFloat(
      driverSourceLatLon["longitude"]
    );

    const driverDestinationLatitude: number = Number.parseFloat(
      driverDestinationLatLon["latitude"]
    );
    const driverDestinationLongitude: number = Number.parseFloat(
      driverDestinationLatLon["longitude"]
    );

    // Find a driver who is active
    let driver = await Driver.findOne({ active: true });

    // If no driver is active then create a new Driver
    if (!driver) {
      const index: number = Helper.getRandomInt(Constant.names.length);

      const name: string = Constant.names[index];
      const phone: string = Helper.generatePhone();
      const password: string = Date.now.toString();
      const vehicleName: string = Constant.vehicleNames[index];
      const vehicleNumber: string = Constant.vehicleNumbers[index];

      // Hashing password
      const hashedPassword = await bcrypt.hash(password, Constant.saltRounds);

      // Creating a driver in MongoDB
      driver = await Driver.create({
        name: name,
        phone: phone,
        password: hashedPassword,
        vehicle_name: vehicleName,
        vehicle_number: vehicleNumber,
      });
    }

    // Getting a driver field without the _id and __v fields
    const driverWithIdField = Helper.getObjectWithIdInsteadOf_idAnd__v(driver);

    // Responding with a driver object and the source and destination 
    // position of the driver
    res.json({
      driver: driverWithIdField,
      source_position: {
        latitude: driverSourceLatitude,
        longitude: driverSourceLongitude,
      },
      destination_position: {
        latitude: driverDestinationLatitude,
        longitude: driverDestinationLongitude,
      },
    });
  } catch (error) {
    console.log(`Error in createRideDriver: ${error}`);

    // Server error
    res.status(500).json({
      error: {
        code: Err.code.SERVER_ERROR,
        message: Err.message.SERVER_ERROR,
      },
    });
  }
};

export = findRideDriver;
