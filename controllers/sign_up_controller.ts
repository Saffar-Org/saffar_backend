import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import Constant from "../constants/constant";
import Err from "../constants/error";
import User from "../models/User";
import Validator from "../utils/validator";

const signUp = async (req: any, res: any, next?: Function) => {
  try {
    // Generating a random id
    const name: string = req.body.name;
    const phone: string = req.body.phone;
    const password: string = req.body.password;

    // If name, phone or password does not exist
    // then 400 response and error message and code
    // is returned.
    if (name === undefined || phone === undefined || password === undefined) {
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

    // Find if there is already a user with this phone
    const oldUser = await User.findOne({ phone: phone });

    // Returning phone already present error if user with same phone
    // already present
    if (oldUser) {
      return res.status(409).json({
        error: {
          code: Err.code.PHONE_ALREADY_EXISTS,
          message: Err.message.PHONE_ALREADY_EXISTS,
        },
      });
    }

    // Hashing password
    const hashedPassword = await bcrypt.hash(password, Constant.saltRounds);

    // Creating a user in MongoDB
    const user = await User.create({
      name: name,
      phone: phone,
      password: hashedPassword,
    });

    // MongoDB object _id
    const id: string = user._id.toString();

    // Creating a token. Store this token and provide this token
    // when ever you want to get data for which authentication is required
    const token: string = jwt.sign(
      { id: id, phone: phone },
      process.env.TOKEN_KEY!,
      {
        expiresIn: "1d",
      }
    );

    // Returning 200 response and user data after user is created in DB
    res.status(200).json({
      message: "Signed up and created user successfully",
      user: {
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

export = signUp;
