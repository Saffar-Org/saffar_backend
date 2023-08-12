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
const User_1 = __importDefault(require("../models/User"));
const Driver_1 = __importDefault(require("../models/Driver"));
const Address_1 = __importDefault(require("../models/Address"));
const helper_1 = __importDefault(require("../utils/helper"));
/// Validates Bearer token then sends a response 
/// with all the previous rides of the user.
/// If token is not valid, user id is not present, user
/// is not present then returns a 400 response. Else
/// returns a list of all the previous rides of the user.
const getPreviousRidesOfUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.user_id;
        // If user id not present return a 400 response
        if (!userId) {
            return res.status(400).json({
                error: {
                    code: error_1.default.code.EMPTY_PARAM,
                    message: error_1.default.message.EMPTY_PARAM,
                },
            });
        }
        const currentDateTime = new Date();
        // Finding a list of Rides ridden by the user then delete
        // the '__v' field and replace
        // the '_id' field to 'id' field.
        let allPreviousRidesByUser = (yield Ride_1.default.find({
            user: userId,
            $or: [
                { end_time: { $exists: false } },
                { end_time: { $lt: currentDateTime } },
            ],
        })).map((previousRide) => {
            return helper_1.default.getObjectWithIdInsteadOf_idAnd__v(previousRide);
        });
        // Getting user, driver, source address, destination address and
        // deleting the '__v' field and replacing the '_id' field to 'id'.
        for (let index = 0; index < allPreviousRidesByUser.length; index++) {
            const userId = allPreviousRidesByUser[index].user;
            const user = yield User_1.default.findById(userId);
            const userWithIdField = helper_1.default.getObjectWithIdInsteadOf_idAnd__v(user);
            allPreviousRidesByUser[index].user = userWithIdField;
            const driverId = allPreviousRidesByUser[index].driver;
            const driver = yield Driver_1.default.findById(driverId);
            const driverWithIdField = helper_1.default.getObjectWithIdInsteadOf_idAnd__v(driver);
            allPreviousRidesByUser[index].driver = driverWithIdField;
            const sourceAddressId = allPreviousRidesByUser[index].source_address;
            const sourceAddress = yield Address_1.default.findById(sourceAddressId);
            const sourceAddressWithIdField = helper_1.default.getObjectWithIdInsteadOf_idAnd__v(sourceAddress);
            allPreviousRidesByUser[index].source_address = sourceAddressWithIdField;
            const destinationAddressId = allPreviousRidesByUser[index].destination_address;
            const destinationAddress = yield Address_1.default.findById(destinationAddressId);
            const destinationAddressWithIdField = helper_1.default.getObjectWithIdInsteadOf_idAnd__v(destinationAddress);
            allPreviousRidesByUser[index].destination_address =
                destinationAddressWithIdField;
        }
        // Sending a 200 response with all the previous rides
        // destination address to the user.
        res.status(200).json({
            message: "All previous rides of the user fetched successfully.",
            previous_rides: allPreviousRidesByUser,
        });
    }
    catch (error) {
        console.log(`Error in getPreviousRidesOfUser: ${error}`);
        // Server error
        res.status(500).json({
            error: {
                code: error_1.default.code.SERVER_ERROR,
                message: error_1.default.message.SERVER_ERROR,
            },
        });
    }
});
module.exports = getPreviousRidesOfUser;
