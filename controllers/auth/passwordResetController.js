const bcrypt = require("bcrypt");

const CustomErrorHandler = require("../../services/CustomErrorHandler");

const User = require("../../models/user");

const JwtService = require("../../services/JwtService");

const { sendResetEmail } = require("../../services/nodemailer.config");

const forgotPass = async (req, res, next) => {
  const { email } = req.body;
  console.log("emai; | ", email);
  try {
    const user = await User.findOne({ email });
    console.log("user | ", user);
    if (!user) {
      return next(
        CustomErrorHandler.notFound(
          (message = "Account not found with this email address.")
        )
      );
    }

    const passwordResetToken = JwtService.sign(
      { email },
      process.env.RESET_PASS_KEY
    );
    await user.updateOne({ passwordResetToken });

    sendResetEmail(email, passwordResetToken, next);

    res.json({
      message: `Password reset link sent to ${email}. Check your inbox.`,
    });
  } catch (error) {
    console.log(error);

    return next(CustomErrorHandler.serverError());
  }
};

const resetPassword = async (req, res, next) => {
  console.log("req.body || ", req.body);
  const { password } = req.body;
  const passwordResetToken = req.params.passwordResetToken;

  try {
    const decodedData = JwtService.verify(
      passwordResetToken,
      process.env.RESET_PASS_KEY
    );

    try {
      const user = await User.findOne({ email: decodedData.email });

      if (!user) {
        return next(CustomErrorHandler.notFound());
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await user.updateOne({
        password: hashedPassword,
        passwordResetToken: "",
      });

      await user.save();
      res.json({ message: "Password updated successfully." });
    } catch (error) {
      console.log(error);
      return next(CustomErrorHandler.serverError());
    }

    res.json({ message: "OK" });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "Reset link is invalid or expired. Please try again.",
    });
  }
};

module.exports = { forgotPass, resetPassword };
