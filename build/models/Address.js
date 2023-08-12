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
const mongoose = __importStar(require("mongoose"));
const addressSchema = new mongoose.Schema({
    place: {
        type: String,
    },
    street: {
        type: String,
        default: "Unnamed Road",
    },
    state: {
        type: String,
    },
    country: {
        type: String,
    },
    lat: {
        type: Number,
        required: true,
    },
    lon: {
        type: Number,
        required: true,
    },
    pincode: {
        type: String,
    },
});
const address = mongoose.model("Address", addressSchema, "addresses");
module.exports = address;
