/// Gets Bearer token from request and returns the token.
/// If token does not exist or is not in the correct format

import Err from "../constants/error";

/// a 400 response is sent and [undefined] is returned
const getBearerTokenFromRequestAndSendErrorResponseIfTokenInvalid = (
  req: any,
  res: any
): string | undefined => {
  const bearerToken: string = req.headers.authorization;

  // If there is no bearer token then sent 400 response
  if (!bearerToken) {
    res.status(400).json({
      error: {
        code: Err.code.AUTHORIZATION_HEADER_MISSING,
        message: Err.message.AUTHORIZATION_HEADER_MISSING,
      },
    });

    return undefined;
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

    return undefined;
  }

  // The <token> in "Bearer <token>"
  const token = arr[1];

  return token;
};

const tokenMiddleware = {
  getBearerTokenFromRequestAndSendErrorResponseIfTokenInvalid,
};

export = tokenMiddleware;
