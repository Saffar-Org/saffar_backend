class Validator {
  // Email Regular Expressing
  private static emailRegex: RegExp =
    /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

  /// Validates Email address
  static validateEmail(email: string) {
    // Checks if email is present or not
    if (!email) {
      return false;
    }

    // Checks if length of email is not more then 254
    if (email.length > 254) {
      return false;
    }

    // Checks if email matches the email RegExp
    const valid: boolean = this.emailRegex.test(email);
    if (!valid) {
      return false;
    }

    // Checks if part of email before '@' is not more then 64
    const emailParts: string[] = email.split("@");
    if (emailParts[0].length > 64) {
      return false;
    }

    // Checks if each part of email after '@' which is separated by a '.'
    // is not more then 63
    const domainParts: string[] = emailParts[1].split(".");
    if (
      domainParts.some((part: string) => {
        return part.length > 63;
      })
    ) {
      return false;
    }

    return true;
  }

  // Validates is password is more then or equal to 8 characters or not
  static validatePassword(password: string) {
    if (!password) {
        return false;
    }

    return password.length >= 8;
  }
}

export = Validator;

