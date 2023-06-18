import * as bcrypt from "bcrypt";
import * as uuid from "uuid";
import User from "../models/User";
import Validator from "./validator_controller";

const signUp = async (req: any, res: any, next?: Function) => {
  try {
    // Generating a random id
    let id: string = uuid.v4();
    const name: string = req.body.name;
    const email: string = req.body.email;
    const password: string = req.body.password;

    // If name, email or password does not exist
    // then 400 response and error message and code
    // is returned.
    if (!name || !email || !password) {
      return res.status(400).json({
        error_code: "EMPTY_PARAM",
        message: "Name, Email and Password must not be empty.",
      });
    }

    // Checking if email is valid
    if (!Validator.validateEmail(email)) {
      return res.status(400).json({
        error_code: "INVALID_EMAIL",
        message: "Invalid email.",
      });
    }

    // Checking if password is valid
    if (!Validator.validatePassword(password)) {
      return res.status(400).json({
        error_code: "INVALID_PASSWORD",
        message:
          "Invalid password. Password must be at least 8 characters long.",
      });
    }

    // Hashing password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creating a user in MongoDB
    const user = await User.create({
      id: id,
      name: name,
      email: email,
      password: hashedPassword,
    });

    // Returning 200 response and user data after user is created in DB
    res.status(200).json({
      message: "Created user successfully",
      user: {
        id: id,
        name: name,
        email: email,
      },
    });

    if (next != undefined) {
      next();
    }
  } catch (error) {
    console.log(`SERVER ERROR: ${error}`);

    res
      .status(500)
      .json({
        error: "SERVER_ERROR",
        message: "There was some problem in the server.",
      });
  }
};

export = signUp;
