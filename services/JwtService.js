const jwt = require("jsonwebtoken");
//

class JwtService {
  static sign(payload, secret = process.env.JWT_KEY, expiry = "1d") {
    return jwt.sign(payload, secret, { expiresIn: expiry });
  }
  static verify(token, secret = process.env.JWT_KEY) {
    return jwt.verify(token, secret);
  }
}

module.exports = JwtService;
