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
const Redis = __importStar(require("redis"));
const error_1 = __importDefault(require("../constants/error"));
const User_1 = __importDefault(require("../models/User"));
const helper_1 = __importDefault(require("../utils/helper"));
/// Gets user info from Redis server if present else gets user info
/// from MongoDB
const getUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.id;
        // If no id i.e. user id is present then return a 400
        // response
        if (!id) {
            return res.status(400).json({
                error: {
                    code: error_1.default.code.EMPTY_PARAM,
                    message: error_1.default.message.EMPTY_PARAM,
                },
            });
        }
        // Create a redis client
        const redisClient = Redis.createClient();
        // Get user info from redis server
        const userInfo = yield redisClient.get(id);
        // If user info present in redis server then return user info
        if (userInfo) {
            return res.json({
                user: userInfo,
            });
        }
        // Find user info in MongoDB by using user id
        const user = yield User_1.default.findById(id);
        // If user not found in MongoDB then return a 400 response
        if (!user) {
            return res.status(400).json({
                error: {
                    code: error_1.default.code.NO_USER_WITH_ID,
                    message: error_1.default.message.NO_USER_WITH_ID,
                },
            });
        }
        // Get user object without `_id` and `_v`
        const userWithout_idAnd_v = helper_1.default.getObjectWithIdInsteadOf_idAnd__v(user);
        // Set the user info value to the key id for 3600 seconds
        yield redisClient.setEx(id, 3600, JSON.stringify(userWithout_idAnd_v));
        // Return the user info
        res.json({
            user: userWithout_idAnd_v,
        });
    }
    catch (error) {
        console.log(`Error in getUserInfo: ${error}`);
        // Server error
        res.status(500).json({
            error: {
                code: error_1.default.code.SERVER_ERROR,
                message: error_1.default.message.SERVER_ERROR,
            },
        });
    }
});
module.exports = getUserInfo;
