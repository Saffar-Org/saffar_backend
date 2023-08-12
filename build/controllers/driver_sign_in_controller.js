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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const bcrypt = __importStar(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
const error_1 = __importDefault(require("../constants/error"));
const Driver_1 = __importDefault(require("../models/Driver"));
const validator_1 = __importDefault(require("../utils/validator"));
const driverSignIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const phone = req.body.phone;
        const password = req.body.password;
        // Checks if phone and password is present
        if (phone === undefined || password === undefined) {
            // If phone and password not present then return a 400 response
            return res.status(400).json({
                error: {
                    code: error_1.default.code.EMPTY_PARAM,
                    message: error_1.default.message.EMPTY_PARAM,
                },
            });
        }
        // Checks if phone is valid
        if (!validator_1.default.validatePhone(phone)) {
            // If phone is not valid return a 400 response
            return res.status(400).json({
                error: {
                    code: error_1.default.code.INVALID_PHONE,
                    message: error_1.default.message.INVALID_PHONE,
                },
            });
        }
        // Checks if password is valid
        if (!validator_1.default.validatePassword(password)) {
            // If password is not valid return a 400 response
            return res.status(400).json({
                error: {
                    code: error_1.default.code.INVALID_PASSWORD,
                    message: error_1.default.message.INVALID_PASSWORD,
                },
            });
        }
        // Checking if a driver with this phone is present in the DB
        const driver = yield Driver_1.default.findOne({ phone: phone });
        // If driver not present return a 400 response
        if (!driver) {
            return res.status(400).json({
                error: {
                    code: error_1.default.code.NO_DRIVER_WITH_PHONE,
                    message: error_1.default.message.NO_DRIVER_WITH_PHONE,
                },
            });
        }
        const id = driver._id.toString();
        const name = driver.name;
        const email = driver.email;
        const imageUrl = driver.image_url;
        const active = driver.active;
        const encryptedPassword = driver.password;
        const vehicleName = driver.vehicle_name;
        const vehicleNumber = driver.vehicle_number;
        // Compare password with encrypted password
        const passwordCorrect = yield bcrypt.compare(password, encryptedPassword);
        // If password not correct then return 400 response
        if (!passwordCorrect) {
            return res.status(400).json({
                error: {
                    code: error_1.default.code.WRONG_PASSWORD,
                    message: error_1.default.message.WRONG_PASSWORD,
                },
            });
        }
        // Creating a token. Store this token and provide this token
        // when ever you want to get data for which authentication is required
        const token = jwt.sign({ id: id, phone: phone }, process.env.TOKEN_SECRET_KEY, {
            expiresIn: "1d",
        });
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
    }
    catch (error) {
        console.log(`Error in sign in: ${error}`);
        // Server error
        res.status(500).json({
            error: {
                code: error_1.default.code.SERVER_ERROR,
                message: error_1.default.message.SERVER_ERROR,
            },
        });
    }
});
module.exports = driverSignIn;
