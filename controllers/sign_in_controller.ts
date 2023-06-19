import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import Err from "../constants/error";
import User from "../models/User";
import Validator from "../utils/validator";

const signIn = async (req: any, res: any, next?: Function) => {
  try {
    const phone: string = req.body.phone;
    const password: string = req.body.password;

    // Checks if phone and password is present
    if (!phone || !password) {
      // If phone and password not present then return a 400 response
      return res.status(400).json({
        error_code: Err.code.EMPTY_PARAM,
        message: Err.message.EMPTY_PARAM,
      });
    }

    // Checks if phone is valid
    if (!Validator.validatePhone(phone)) {
      // If phone is not valid return a 400 response
      return res.status(400).json({
        error_code: Err.code.INVALID_PHONE,
        message: Err.message.INVALID_PHONE,
      });
    }

    // Checks if password is valid
    if (!Validator.validatePassword(password)) {
      // If password is not valid return a 400 response
      return res.status(400).json({
        error_code: Err.code.INVALID_PASSWORD,
        message: Err.message.INVALID_PASSWORD,
      });
    }

    // Checking if a user with this phone is present in the DB
    const user = await User.findOne({ phone: phone });

    // If user not present return a 400 response
    if (!user) {
      return res.status(400).json({
        error_code: Err.code.NO_USER_WITH_PHONE,
        message: Err.message.NO_USER_WITH_PHONE,
      });
    }

    const id: string = user._id.toString() as string;
    const name: string = user.name as string;
    const encryptedPassword: string = user.password;

    // Compare password with encrypted password
    const passwordCorrect: boolean = await bcrypt.compare(password, encryptedPassword);

    // If password not correct then return 400 response
    if (!passwordCorrect) {
      return res.status(400).json({
        error_code: Err.code.WRONG_PASSWORD,
        message: Err.message.WRONG_PASSWORD,
      });
    }

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
      message: "User signed in successfully",
      user: {
        id: id,
        name: name,
        phone: phone,
        token: token,
      },
    });
  } catch (error) {
    console.log(`Error in sign in: ${error}`);

    res.status(500).json({
      error_code: Err.code.SERVER_ERROR,
      message: Err.message.SERVER_ERROR,
    });
  }
};

export = signIn;
