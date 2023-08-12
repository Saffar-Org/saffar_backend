"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const error_1 = __importDefault(require("../constants/error"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/// Validates Bearer token from request.
/// If token does not exist or is not in the correct format
/// or is not valid
/// a 400 response is sent and [undefined] is returned
const validateBearerToken = (req, res, next) => {
    const bearerToken = req.headers.authorization;
    // If there is no bearer token then sent 400 response
    if (!bearerToken) {
        res.status(400).json({
            error: {
                code: error_1.default.code.AUTHORIZATION_HEADER_MISSING,
                message: error_1.default.message.AUTHORIZATION_HEADER_MISSING,
            },
        });
        throw `Token error: ${error_1.default.message.AUTHORIZATION_HEADER_MISSING}`;
    }
    // Splitting the "Bearer <token>"" in a Array as ["Bearer", "<token>"]
    const arr = bearerToken.split(" ");
    // If Bearer token format is not correct then send a 400 response
    if (arr.length < 2 || arr[0] !== "Bearer") {
        res.status(400).json({
            error: {
                code: error_1.default.code.INCORRECT_BEARER_TOKEN_FORMAT,
                message: error_1.default.code.INCORRECT_BEARER_TOKEN_FORMAT,
            },
        });
        throw `Token error: ${error_1.default.message.INCORRECT_BEARER_TOKEN_FORMAT}`;
    }
    // The <token> in "Bearer <token>"
    const token = arr[1];
    // If token is not valid throw a 400 response
    jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET_KEY, (error) => {
        if (error) {
            res.status(400).json({
                error: {
                    code: error_1.default.code.INVALID_BEARER_TOKEN,
                    message: error_1.default.message.INVALID_BEARER_TOKEN,
                },
            });
            throw `Token error: ${error_1.default.message.INVALID_BEARER_TOKEN}`;
        }
    });
    if (next) {
        next();
    }
};
const tokenMiddleware = { validateBearerToken };
module.exports = tokenMiddleware;
