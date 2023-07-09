import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import Err from "../constants/error";
import Driver from "../models/Driver";
import Validator from "../utils/validator";

const driverSignIn = async (req: any, res: any) => {
  try {
    const phone: string = req.body.phone;
    const password: string = req.body.password;

    // Checks if phone and password is present
    if (phone === undefined || password === undefined) {
      // If phone and password not present then return a 400 response
      return res.status(400).json({
        error: {
          code: Err.code.EMPTY_PARAM,
          message: Err.message.EMPTY_PARAM,
        },
      });
    }

    // Checks if phone is valid
    if (!Validator.validatePhone(phone)) {
      // If phone is not valid return a 400 response
      return res.status(400).json({
        error: {
          code: Err.code.INVALID_PHONE,
          message: Err.message.INVALID_PHONE,
        },
      });
    }

    // Checks if password is valid
    if (!Validator.validatePassword(password)) {
      // If password is not valid return a 400 response
      return res.status(400).json({
        error: {
          code: Err.code.INVALID_PASSWORD,
          message: Err.message.INVALID_PASSWORD,
        },
      });
    }

    // Checking if a driver with this phone is present in the DB
    const driver = await Driver.findOne({ phone: phone });

    // If driver not present return a 400 response
    if (!driver) {
      return res.status(400).json({
        error: {
          code: Err.code.NO_DRIVER_WITH_PHONE,
          message: Err.message.NO_DRIVER_WITH_PHONE,
        },
      });
    }

    const id: string = driver._id.toString() as string;
    const name: string = driver.name as string;
    const email: string | undefined = driver.email;
    const imageUrl: string | undefined = driver.image_url;
    const active: boolean = driver.active;
    const encryptedPassword: string = driver.password;
    const vehicleName: string = driver.vehicle_name;
    const vehicleNumber: string = driver.vehicle_number;

    // Compare password with encrypted password
    const passwordCorrect: boolean = await bcrypt.compare(
      password,
      encryptedPassword
    );

    // If password not correct then return 400 response
    if (!passwordCorrect) {
      return res.status(400).json({
        error: {
          code: Err.code.WRONG_PASSWORD,
          message: Err.message.WRONG_PASSWORD,
        },
      });
    }

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
      message: "Driver signed in successfully",
      driver: {
        id: id,
        name: name,
        phone: phone,
        email: email,
        image_url: imageUrl,
        active: active,
        vehicle_name: vehicleName,
        vehicle_number: vehicleNumber,
      },
      token: token,
    });
  } catch (error) {
    console.log(`Error in sign in: ${error}`);

    res.status(500).json({
      error: {
        code: Err.code.SERVER_ERROR,
        message: Err.message.SERVER_ERROR,
      },
    });
  }
};

export = driverSignIn;
