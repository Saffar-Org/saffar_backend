"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mongoose = __importStar(require("mongoose"));
const validator_1 = __importDefault(require("../utils/validator"));
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
    },
    email: {
        type: String,
        unique: true,
        sparse: true,
        index: true,
        minLength: 5,
        maxLength: 254,
        validate: {
            validator: (email) => validator_1.default.validateEmail(email),
            message: (props) => `${props.value} is not a valid email.`,
        },
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 1000,
        validate: {
            validator: (password) => validator_1.default.validatePassword(password),
            message: (props) => `Password must be atleast 8 characters long.`,
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
});
const driver = mongoose.model("Driver", driverSchema, "drivers");
module.exports = driver;
