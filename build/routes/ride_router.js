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
const express = __importStar(require("express"));
const get_previous_rides_controller_1 = __importDefault(require("../controllers/get_previous_rides_controller"));
const add_ride_controller_1 = __importDefault(require("../controllers/add_ride_controller"));
const token_middleware_1 = __importDefault(require("../middlewares/token_middleware"));
const calculate_ride_price_controller_1 = __importDefault(require("../controllers/calculate_ride_price_controller"));
const find_ride_driver_controller_1 = __importDefault(require("../controllers/find_ride_driver_controller"));
const router = express.Router();
router.get("/previous_rides", token_middleware_1.default.validateBearerToken, get_previous_rides_controller_1.default);
router.post("/add_ride", token_middleware_1.default.validateBearerToken, add_ride_controller_1.default);
router.get("/total_price", token_middleware_1.default.validateBearerToken, calculate_ride_price_controller_1.default);
router.get("/find_ride_driver", token_middleware_1.default.validateBearerToken, find_ride_driver_controller_1.default);
module.exports = router;
