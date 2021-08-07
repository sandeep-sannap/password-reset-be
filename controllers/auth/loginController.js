const User = require("../../models/user");
const bcrypt = require("bcrypt");
const CustomErrorHandler = require("../../services/CustomErrorHandler");
const JwtService = require("../../services/JwtService");

const loginController = async (req, res, next) => {
  try {
    //  Check email exists
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return next(CustomErrorHandler.wrongCredential());
    }

    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) {
      return next(CustomErrorHandler.wrongCredential());
    }

    const access_token = JwtService.sign({
      _id: user._id,
    });
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: access_token,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

module.exports = { loginController };
