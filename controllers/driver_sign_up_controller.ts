import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import Constant from "../constants/constant";
import Err from "../constants/error";
import Driver from "../models/Driver";
import Validator from "../utils/validator";

const driverSignUp = async (req: any, res: any, next?: Function) => {
  try {
    // Generating a random id
    const name: string = req.body.name;
    const phone: string = req.body.phone;
    const password: string = req.body.password;
    const vehicleName: string = req.body.vehicle_name;
    const vehicleNumber: string = req.body.vehicle_number;

    // If name, phone, password, vehicle name or vehicle number
    // does not exist
    // then 400 response and error message and code
    // is returned.
    if (
      name === undefined ||
      phone === undefined ||
      password === undefined ||
      vehicleName == undefined ||
      vehicleNumber === undefined
    ) {
      return res.status(400).json({
        error: {
          code: Err.code.EMPTY_PARAM,
          message: Err.message.EMPTY_PARAM,
        },
      });
    }

    // Checking if name is valid
    if (!Validator.validateName(name)) {
      return res.status(400).json({
        error: {
          code: Err.code.INVALID_NAME,
          message: Err.message.INVALID_NAME,
        },
      });
    }

    // Checking if phone is valid
    if (!Validator.validatePhone(phone)) {
      return res.status(400).json({
        error: {
          code: Err.code.INVALID_PHONE,
          message: Err.message.INVALID_PHONE,
        },
      });
    }

    // Checking if password is valid
    if (!Validator.validatePassword(password)) {
      return res.status(400).json({
        error: {
          code: Err.code.INVALID_PASSWORD,
          message: Err.message.INVALID_PASSWORD,
        },
      });
    }

    // Checkinf if vehicle name is valid
    if (!Validator.validateName(vehicleName)) {
      return res.status(400).json({
        error: {
          code: Err.code.INVALID_VEHICLE_NAME,
          message: Err.message.INVALID_VEHICLE_NAME,
        },
      });
    }

    // Checkinf if vehicle number plate number is valid
    if (!Validator.validateVehicleNumber(vehicleNumber)) {
      return res.status(400).json({
        error: {
          code: Err.code.INVALID_VEHICLE_NUMBER,
          message: Err.message.INVALID_VEHICLE_NUMBER,
        },
      });
    }

    // Find if there is already a driver with this phone
    const oldDriver = await Driver.findOne({ phone: phone });

    // Returning phone already present error if driver with same phone
    // already present
    if (oldDriver) {
      return res.status(409).json({
        error: {
          code: Err.code.PHONE_ALREADY_EXISTS,
          message: Err.message.PHONE_ALREADY_EXISTS,
        },
      });
    }

    // Hashing password
    const hashedPassword = await bcrypt.hash(password, Constant.saltRounds);

    // Creating a driver in MongoDB
    const driver = await Driver.create({
      name: name,
      phone: phone,
      password: hashedPassword,
      vehicle_name: vehicleName,
      vehicle_number: vehicleNumber,
    });

    // MongoDB object _id
    const id: string = driver._id.toString();

    // Creating a token. Store this token and provide this token
    // when ever you want to get data for which authentication is required
    const token: string = jwt.sign(
      { id: id, phone: phone },
      process.env.TOKEN_SECRET_KEY!,
      {
        expiresIn: "1d",
      }
    );

    // Returning 200 response and driver data after driver is created in DB
    res.status(200).json({
      message: "Signed up and created driver successfully",
      driver: {
        id: id,
        name: name,
        phone: phone,
        token: token,
      },
    });

    if (next != undefined) {
      next();
    }
  } catch (error) {
    console.log(`Error in sign up: ${error}`);

    // Returning server error
    res.status(500).json({
      error: {
        code: Err.code.SERVER_ERROR,
        message: Err.message.SERVER_ERROR,
      },
    });
  }
};

export = driverSignUp;
