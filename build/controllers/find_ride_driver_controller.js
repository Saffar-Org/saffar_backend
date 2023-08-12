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
const axios_1 = __importDefault(require("axios"));
const error_1 = __importDefault(require("../constants/error"));
const Driver_1 = __importDefault(require("../models/Driver"));
const helper_1 = __importDefault(require("../utils/helper"));
const constant_1 = __importDefault(require("../constants/constant"));
/// Finds a driver near the users location who is active.
/// If no driver is available then a new driver is created
/// and then the drive info is sent to the user.
const findRideDriver = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const latitude = req.body.latitude;
        const longitude = req.body.longitude;
        const mapApiKey = req.body.map_api_key;
        // If latitude, longitude and map api key
        // are not present in req body
        // then send a 400 response
        if (!latitude || !longitude || !mapApiKey) {
            return res.status(400).json({
                error: {
                    code: error_1.default.code.EMPTY_PARAM,
                    message: error_1.default.message.EMPTY_PARAM,
                },
            });
        }
        const changeLatitude = Math.random() <= 0.5;
        const sign = Math.random() <= 0.5 ? 1 : -1;
        // Adding or Subtracting 2 km from user latitude if [changeLatitude] is [true]
        const pointLatitude = latitude + (changeLatitude ? sign * 0.018 : 0); // 0.018 degree is 2 km
        // Adding or Subtracting 2 km from user longitude if [changeLatitude] is [false]
        const pointLongitude = longitude + (!changeLatitude ? sign * 0.018 : 0); // 0.018 degree is 2 km
        // Get the route info from point to user location
        const response = yield axios_1.default.get(`https://api.tomtom.com/routing/1/calculateRoute/${pointLatitude},${pointLongitude}:${latitude},${longitude}/json?key=${mapApiKey}`);
        // Route points
        const points = response.data["routes"][0]["legs"][0]["points"];
        const driverSourceLatLon = points[0];
        const driverDestinationLatLon = points[points.length - 1];
        const driverSourceLatitude = Number.parseFloat(driverSourceLatLon["latitude"]);
        const driverSourceLongitude = Number.parseFloat(driverSourceLatLon["longitude"]);
        const driverDestinationLatitude = Number.parseFloat(driverDestinationLatLon["latitude"]);
        const driverDestinationLongitude = Number.parseFloat(driverDestinationLatLon["longitude"]);
        // Find a driver who is active
        let driver = yield Driver_1.default.findOne({ active: true });
        // If no driver is active then create a new Driver
        if (!driver) {
            const index = helper_1.default.getRandomInt(constant_1.default.names.length);
            const name = constant_1.default.names[index];
            const phone = helper_1.default.generatePhone();
            const password = Date.now.toString();
            const vehicleName = constant_1.default.vehicleNames[index];
            const vehicleNumber = constant_1.default.vehicleNumbers[index];
            // Hashing password
            const hashedPassword = yield bcrypt.hash(password, constant_1.default.saltRounds);
            // Creating a driver in MongoDB
            driver = yield Driver_1.default.create({
                name: name,
                phone: phone,
                password: hashedPassword,
                vehicle_name: vehicleName,
                vehicle_number: vehicleNumber,
            });
        }
        // Getting a driver field without the _id and __v fields
        const driverWithIdField = helper_1.default.getObjectWithIdInsteadOf_idAnd__v(driver);
        // Responding with a driver object and the source and destination 
        // position of the driver
        res.json({
            driver: driverWithIdField,
            source_position: {
                latitude: driverSourceLatitude,
                longitude: driverSourceLongitude,
            },
            destination_position: {
                latitude: driverDestinationLatitude,
                longitude: driverDestinationLongitude,
            },
        });
    }
    catch (error) {
        console.log(`Error in createRideDriver: ${error}`);
        // Server error
        res.status(500).json({
            error: {
                code: error_1.default.code.SERVER_ERROR,
                message: error_1.default.message.SERVER_ERROR,
            },
        });
    }
});
module.exports = findRideDriver;
