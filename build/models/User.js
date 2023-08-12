"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("../utils/validator"));
const userSchema = new mongoose_1.default.Schema({
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
            validator: (phone) => validator_1.default.validatePhone(phone),
            message: (props) => `${props.value} is not a valid phone.`,
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
    image_url: {
        type: String,
        minLength: 1,
        maxLength: 1000,
    },
});
const user = mongoose_1.default.model("User", userSchema, "users");
module.exports = user;
