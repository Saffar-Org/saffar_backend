import mongoose from "mongoose";
import Validator from "../utils/validator";

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 1000,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (email: string) => Validator.validateEmail(email),
      message: (props: any) => `${props.value} is not a valid email.`,
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: (password: string) => Validator.validatePassword(password),
      message: (props: any) => `Password must be atleast 8 characters long.`,
    },
  },
});

const user = mongoose.model("User", userSchema, "users");

export = user;
