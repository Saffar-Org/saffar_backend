/// Error codes and messages
class Err {
  static code = {
    EMPTY_PARAM: "EMPTY_PARAM",
    INVALID_PHONE: "INVALID_PHONE",
    INVALID_EMAIL: "INVALID_EMAIL",
    INVALID_PASSWORD: "INVALID_PASSWORD",
    INVALID_NAME: "INVALID_NAME",
    INVALID_VEHICLE_NAME: "INVALID_VEHICLE_NAME",
    INVALID_VEHICLE_NUMBER: "INVALID_VEHICLE_NUMBER",
    PHONE_ALREADY_EXISTS: "PHONE_ALREADY_EXISTS",
    EMAIL_ALREADY_EXISTS: "EMAIL_ALREADY_EXISTS",
    SERVER_ERROR: "SERVER_ERROR",
    NO_USER_WITH_PHONE: "NO_USER_WITH_PHONE",
    NO_USER_WITH_EMAIL: "NO_USER_WITH_EMAIL",
    NO_DRIVER_WITH_PHONE: "NO_DRIVER_WITH_PHONE",
    NO_DRIVER_WITH_EMAIL: "NO_DRIVER_WITH_EMAIL",
    WRONG_PASSWORD: "WRONG_PASSWORD",
    AUTHORIZATION_HEADER_MISSING: "AUTHORIZATION_HEADER_MISSING",
    INCORRECT_BEARER_TOKEN_FORMAT: "INCORRECT_BEARER_TOKEN_FORMAT",
    INVALID_BEARER_TOKEN: "INVALID_BEARER_TOKEN",
    NO_USER_WITH_ID: "NO_USER_WITH_ID",
  };

  static message = {
    EMPTY_PARAM:
      "One or more params are not present in the body of the POST request.",
    INVALID_PHONE: "Invalid phone.",
    INVALID_EMAIL: "Invalid email.",
    INVALID_PASSWORD:
      "Invalid password. Password must be at least 8 characters long.",
    INVALID_NAME: "Invalid name. Name can not be empty.",
    INVALID_VEHICLE_NAME: "Invalid vehicle name. Vehicle name can not be empty.",
    INVALID_VEHICLE_NUMBER: "Invalid vehicle number.",
    PHONE_ALREADY_EXISTS: "An user with this phone number is already present.",
    EMAIL_ALREADY_EXISTS: "An user with this email is already present.",
    SERVER_ERROR: "There was some problem in the server.",
    NO_USER_WITH_PHONE: "There is no user with this phone.",
    NO_USER_WITH_EMAIL: "There is no user with this email.",
    NO_DRIVER_WITH_PHONE: "There is no driver with this phone.",
    NO_DRIVER_WITH_EMAIL: "There is no driver with this email.",
    WRONG_PASSWORD: "Password is wrong.",
    AUTHORIZATION_HEADER_MISSING: "There is no authorization header in the request",
    INCORRECT_BEARER_TOKEN_FORMAT: 'Bearer token format is incorrect. It shoule be like "Bearer <token>"',
    INVALID_BEARER_TOKEN: "Bearer token is either not active, expired or invalid",
    NO_USER_WITH_ID: "There is no user present with user id",
  };
}

export = Err;
