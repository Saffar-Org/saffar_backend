import Err from "../constants/error";
import jwt from "jsonwebtoken";

/// Validates Bearer token from request.
/// If token does not exist or is not in the correct format
/// or is not valid
/// a 400 response is sent and [undefined] is returned
const validateBearerToken = (req: any, res: any, next?: Function): void => {
  const bearerToken: string = req.headers.authorization;

  // If there is no bearer token then sent 400 response
  if (!bearerToken) {
    res.status(400).json({
      error: {
        code: Err.code.AUTHORIZATION_HEADER_MISSING,
        message: Err.message.AUTHORIZATION_HEADER_MISSING,
      },
    });

    throw `Token error: ${Err.message.AUTHORIZATION_HEADER_MISSING}`;
  }

  // Splitting the "Bearer <token>"" in a Array as ["Bearer", "<token>"]
  const arr: Array<string> = bearerToken.split(" ");

  // If Bearer token format is not correct then send a 400 response
  if (arr.length < 2 || arr[0] !== "Bearer") {
    res.status(400).json({
      error: {
        code: Err.code.INCORRECT_BEARER_TOKEN_FORMAT,
        message: Err.code.INCORRECT_BEARER_TOKEN_FORMAT,
      },
    });

    throw `Token error: ${Err.message.INCORRECT_BEARER_TOKEN_FORMAT}`;
  }

  // The <token> in "Bearer <token>"
  const token = arr[1];

  // If token is not valid throw a 400 response
  jwt.verify(token, process.env.TOKEN_SECRET_KEY!, (error) => {
    if (error) {
      res.status(400).json({
        error: {
          code: Err.code.INVALID_BEARER_TOKEN,
          message: Err.message.INVALID_BEARER_TOKEN,
        },
      });

      throw `Token error: ${Err.message.INVALID_BEARER_TOKEN}`;
    }
  });

  if (next) {
    next();
  }
};

const tokenMiddleware = { validateBearerToken };

export = tokenMiddleware;
