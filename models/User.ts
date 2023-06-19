import mongoose from "mongoose";
import Validator from "../utils/validator";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 1000,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    minLength: 10,
    maxLength: 10,
    validate: {
      validator: (phone: string) => Validator.validatePhone(phone),
      message: (props: any) => `${props.value} is not a valid phone.`,
    },
  },
  email: {
    type: String,
    unique: true,
    minLength: 5,
    maxLength: 254,
    validate: {
      validator: (email: string) => Validator.validateEmail(email),
      message: (props: any) => `${props.value} is not a valid email.`,
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 1000,
    validate: {
      validator: (password: string) => Validator.validatePassword(password),
      message: (props: any) => `Password must be atleast 8 characters long.`,
    },
  },
  image_url: {
    type: String,
    minLength: 1,
    maxLength: 1000,
  },
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
  reviews: {
    type: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Review",
      },
    ],
    default: [],
  },
  rides: {
    type: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Ride",
      },
    ],
    default: [],
  },
});

const user = mongoose.model("User", userSchema, "users");

export = user;
