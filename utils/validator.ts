class Validator {
  // Email Regular Expressing
  private static emailRegex: RegExp =
    /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

  /// Checks if name length is between 1 and 1000
  static validateName(name: string) {
    if (!name) {
      return false;
    }

    if (name.length < 0 || name.length > 1000) {
      return false;
    }

    return true;
  }

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

  /// Checkinf if phone number length 10 and is numeric
  static validatePhone(phone: string) {
    if (!phone) {
      return false;
    }

    if (phone.length != 10) {
      return false;
    }

    return !isNaN(Number(phone));
  }

  /// Validates if password length is between 8 and 1000
  static validatePassword(password: string) {
    if (!password) {
      return false;
    }

    return password.length >= 8;
  }

  /// Validates vehicle number plate number 
  static validateVehicleNumber(vehicleNumber: string) {
    if (!vehicleNumber) {
      return false;
    }

    const numberPlateRegex: RegExp = /^[A-Z]{2}[0-9]{2}[A-HJ-NP-Z]{1,2}[0-9]{4}$/;
    return numberPlateRegex.test(vehicleNumber);
  }
}

export = Validator;
