/// Error codes and messages
class Err {
  static code = {
    EMPTY_PARAM: "EMPTY_PARAM",
    INVALID_EMAIL: "INVALID_EMAIL",
    INVALID_PASSWORD: "INVALID_PASSWORD",
    INVALID_NAME: "INVALID_NAME",
    EMAIL_ALREADY_EXISTS: "EMAIL_ALREADY_EXISTS",
    SERVER_ERROR: "SERVER_ERROR",
    NO_USER_WITH_EMAIL: "NO_USER_WITH_EMAIL",
    WRONG_PASSWORD: "WRONG_PASSWORD",
  };

  static message = {
    EMPTY_PARAM:
      "One or more params are not present in the body of the POST request.",
    INVALID_EMAIL: "Invalid email.",
    INVALID_PASSWORD:
      "Invalid password. Password must be at least 8 characters long.",
    INVALID_NAME: "Invalid name. Name can not be empty.",
    EMAIL_ALREADY_EXISTS: "An user with this email is already present.",
    SERVER_ERROR: "There was some problem in the server.",
    NO_USER_WITH_EMAIL: "There is no user with this email.",
    WRONG_PASSWORD: "Password is wrong.",
  };
}

export = Err;
