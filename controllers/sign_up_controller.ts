import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import * as uuid from "uuid";
import Constant from "../constants/constant";
import Err from "../constants/error";
import User from "../models/User";
import Validator from "../utils/validator";

const signUp = async (req: any, res: any, next?: Function) => {
  try {
    // Generating a random id
    const id: string = uuid.v4();
    const name: string = req.body.name;
    const email: string = req.body.email;
    const password: string = req.body.password;

    // If name, email or password does not exist
    // then 400 response and error message and code
    // is returned.
    if (!name || !email || !password) {
      return res.status(400).json({
        error_code: Err.code.EMPTY_PARAM,
        message: Err.message.EMPTY_PARAM,
      });
    }

    // Checking if name is valid
    if (!Validator.validateName(name)) {
      return res.status(400).json({
        error_code: Err.code.INVALID_NAME,
        message: Err.message.INVALID_NAME,
      });
    }

    // Checking if email is valid
    if (!Validator.validateEmail(email)) {
      return res.status(400).json({
        error_code: Err.code.INVALID_EMAIL,
        message: Err.message.INVALID_EMAIL,
      });
    }

    // Checking if password is valid
    if (!Validator.validatePassword(password)) {
      return res.status(400).json({
        error_code: Err.code.INVALID_PASSWORD,
        message: Err.message.INVALID_PASSWORD,
      });
    }

    // Find if there is already a user with this email
    const oldUser = await User.findOne({ email: email });

    // Returning email already present error if user with same email
    // already present
    if (oldUser) {
      return res.status(409).json({
        error_code: Err.code.EMAIL_ALREADY_EXISTS,
        message: Err.message.EMAIL_ALREADY_EXISTS,
      });
    }

    // Hashing password
    const hashedPassword = await bcrypt.hash(password, Constant.saltRounds);

    // Creating a user in MongoDB
    await User.create({
      _id: id,
      id: id,
      name: name,
      email: email,
      password: hashedPassword,
    });

    // Creating a token. Store this token and provide this token
    // when ever you want to get data for which authentication is required
    const token: string = jwt.sign(
      { id: id, email: email },
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
        email: email,
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
      error_code: Err.code.SERVER_ERROR,
      message: Err.message.SERVER_ERROR,
    });
  }
};

export = signUp;
