const nodemailer = require("nodemailer");
const CustomErrorHandler = require("./CustomErrorHandler");

const user = process.env.MAIL;
const pass = process.env.PASS;

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: pass,
  },
});

exports.sendResetEmail = (email, passwordResetToken, next) => {
  console.log(`check`);
  transport
    .sendMail({
      from: user,
      to: email,
      subject: "Password reset request",
      html: `<div>
      <h1>Password reset </h1>
        <p> You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n Please click on the following link.\n\n</p>
        <a href=${process.env.FRONT_END_HOST}reset/${passwordResetToken}>Click Here</a>
        </div>`,
    })
    .catch((err) => {
      return next(CustomErrorHandler.serverError());
    });
};
