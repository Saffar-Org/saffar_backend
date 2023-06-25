import * as mongoose from "mongoose";
import Validator from "../utils/validator";

const driverSchema = new mongoose.Schema({
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
    sparse: true,
    index: true,
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
  vehicle_name: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 1000,
  },
  vehicle_number: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 1000,
  },
  image_url: {
    type: String,
    minLength: 1,
    maxLength: 1000,
  },
  active: {
    type: Boolean,
    default: true,
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

const driver = mongoose.model("Driver", driverSchema, "drivers");

export = driver;
