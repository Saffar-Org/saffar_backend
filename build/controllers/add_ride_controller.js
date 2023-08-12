"use strict";
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
const error_1 = __importDefault(require("../constants/error"));
const Ride_1 = __importDefault(require("../models/Ride"));
const Address_1 = __importDefault(require("../models/Address"));
/// Creates a Ride document and the source and destination document
/// in MongoDB
const addRideAndRideAddresses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = req.body.user_id;
        const driverId = req.body.driver_id;
        const sourceAddress = req.body.source_address;
        const destinationAddress = req.body.destination_address;
        const startTimeString = req.body.start_time;
        const endTimeString = req.body.end_time;
        const cancelled = (_a = req.body.cancelled) !== null && _a !== void 0 ? _a : false;
        const price = req.body.price;
        const discountPrice = req.body.discount_price;
        // If required params are not present then return 400 response
        if (userId === undefined ||
            driverId === undefined ||
            sourceAddress === undefined ||
            destinationAddress === undefined ||
            startTimeString === undefined ||
            price === undefined) {
            return res.status(400).json({
                error: {
                    code: error_1.default.code.EMPTY_PARAM,
                    message: error_1.default.message.EMPTY_PARAM,
                },
            });
        }
        // Date and Time from string
        const startTime = new Date(startTimeString);
        const endTime = new Date(endTimeString);
        // Creating the source address in MongoDB
        const sourceAddressDoc = yield Address_1.default.create({
            place: sourceAddress["place"],
            street: sourceAddress["street"],
            state: sourceAddress["state"],
            country: sourceAddress["country"],
            lat: sourceAddress["lat"],
            lon: sourceAddress["lon"],
            pincode: sourceAddress["pincode"],
        });
        // Creating the destination address in MongoDB
        const destinationAddressDoc = yield Address_1.default.create({
            place: destinationAddress["place"],
            street: destinationAddress["street"],
            state: destinationAddress["state"],
            country: destinationAddress["country"],
            lat: destinationAddress["lat"],
            lon: destinationAddress["lon"],
            pincode: destinationAddress["pincode"],
        });
        const sourceAddressId = sourceAddressDoc._id.toString();
        const destinationAddressId = destinationAddressDoc._id.toString();
        // Creating a ride in MongoDB
        yield Ride_1.default.create({
            user: userId,
            driver: driverId,
            source_address: sourceAddressId,
            destination_address: destinationAddressId,
            start_time: startTime,
            end_time: endTime,
            cancelled: cancelled,
            price: price,
            discount_price: discountPrice,
        });
        // Successful response after ride is created
        res.status(400).json({
            message: "Ride created successfully.",
        });
    }
    catch (error) {
        console.log(`Error in addRideAndRideAddresses: ${error}`);
        // Server error
        res.status(500).json({
            error: {
                code: error_1.default.code.SERVER_ERROR,
                message: error_1.default.message.SERVER_ERROR,
            },
        });
    }
});
module.exports = addRideAndRideAddresses;
