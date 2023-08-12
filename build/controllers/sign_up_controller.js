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
const constant_1 = __importDefault(require("../constants/constant"));
const error_1 = __importDefault(require("../constants/error"));
const User_1 = __importDefault(require("../models/User"));
const validator_1 = __importDefault(require("../utils/validator"));
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Generating a random id
        const name = req.body.name;
        const phone = req.body.phone;
        const password = req.body.password;
        // If name, phone or password does not exist
        // then 400 response and error message and code
        // is returned.
        if (name === undefined || phone === undefined || password === undefined) {
            return res.status(400).json({
                error: {
                    code: error_1.default.code.EMPTY_PARAM,
                    message: error_1.default.message.EMPTY_PARAM,
                },
            });
        }
        // Checking if name is valid
        if (!validator_1.default.validateName(name)) {
            return res.status(400).json({
                error: {
                    code: error_1.default.code.INVALID_NAME,
                    message: error_1.default.message.INVALID_NAME,
                },
            });
        }
        // Checking if phone is valid
        if (!validator_1.default.validatePhone(phone)) {
            return res.status(400).json({
                error: {
                    code: error_1.default.code.INVALID_PHONE,
                    message: error_1.default.message.INVALID_PHONE,
                },
            });
        }
        // Checking if password is valid
        if (!validator_1.default.validatePassword(password)) {
            return res.status(400).json({
                error: {
                    code: error_1.default.code.INVALID_PASSWORD,
                    message: error_1.default.message.INVALID_PASSWORD,
                },
            });
        }
        // Find if there is already a user with this phone
        const oldUser = yield User_1.default.findOne({ phone: phone });
        // Returning phone already present error if user with same phone
        // already present
        if (oldUser) {
            return res.status(409).json({
                error: {
                    code: error_1.default.code.PHONE_ALREADY_EXISTS,
                    message: error_1.default.message.PHONE_ALREADY_EXISTS,
                },
            });
        }
        // Hashing password
        const hashedPassword = yield bcrypt.hash(password, constant_1.default.saltRounds);
        // Creating a user in MongoDB
        const user = yield User_1.default.create({
            name: name,
            phone: phone,
            password: hashedPassword,
        });
        // MongoDB object _id
        const id = user._id.toString();
        // Creating a token. Store this token and provide this token
        // when ever you want to get data for which authentication is required
        const token = jwt.sign({ id: id, phone: phone }, process.env.TOKEN_SECRET_KEY, {
            expiresIn: process.env.TOKEN_EXPIRY_TIME,
        });
        // Returning 200 response and user data after user is created in DB
        res.status(200).json({
            message: "Signed up and created user successfully",
            user: {
                id: id,
                name: name,
                phone: phone,
            },
            token: token,
        });
    }
    catch (error) {
        console.log(`Error in sign up: ${error}`);
        // Server error
        res.status(500).json({
            error: {
                code: error_1.default.code.SERVER_ERROR,
                message: error_1.default.message.SERVER_ERROR,
            },
        });
    }
});
module.exports = signUp;
