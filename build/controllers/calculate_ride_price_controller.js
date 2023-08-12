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
const Price_1 = __importDefault(require("../models/Price"));
const error_1 = __importDefault(require("../constants/error"));
/// Gets price info from DB then calculates total ride price
const getPriceInfoAndCalculateRidePrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rideDistanceInKm = req.body.distance_in_km;
        // If ride's distance is not given by user then
        // return 400 response
        if (!rideDistanceInKm) {
            return res.status(400).json({
                error: {
                    code: error_1.default.code.EMPTY_PARAM,
                    message: error_1.default.message.EMPTY_PARAM,
                },
            });
        }
        // Getting the first Price from MongoDB
        const price = yield Price_1.default.findOne();
        // If price is not present in MongoDB then return 400 response
        if (!price) {
            return res.status(400).json({
                error: {
                    code: error_1.default.code.NO_PRICE_IN_DB,
                    message: error_1.default.message.NO_PRICE_IN_DB,
                },
            });
        }
        const basePrice = price.base_price;
        const pricePerKm = price.price_per_km;
        // Calculate ride price
        const totalRideidePrice = basePrice + rideDistanceInKm * pricePerKm;
        // Return total ride price
        res.json({
            total_price: totalRideidePrice,
        });
    }
    catch (error) {
        console.log(`Error in getPriceInfoAndCalculateRidePrice: ${error}`);
        // Server error
        res.status(500).json({
            error: {
                code: error_1.default.code.SERVER_ERROR,
                message: error_1.default.message.SERVER_ERROR,
            },
        });
    }
});
module.exports = getPriceInfoAndCalculateRidePrice;
