const bcrypt = require("bcrypt");

const CustomErrorHandler = require("../../services/CustomErrorHandler");

const User = require("../../models/user");

const JwtService = require("../../services/JwtService");

const registerController = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return next(CustomErrorHandler.alreadyExists());
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    const newUser = user.save();

    const token = JwtService.sign({
      _id: newUser._id,
    });

    res.json({ token, name, email });
  } catch (error) {
    console.log(error);
    return next(CustomErrorHandler.serverError());
  }
};

// const registerController = async (req, res, next) => {
//   const { name, email, password } = req.body;
//   try {
//     const exists = await User.exists({ email: email });

//     if (exists) {
//       return next(
//         CustomErrorHandler.alreadyExists("This email is already taken.")
//       );
//     }
//   } catch (error) {
//     console.log(error);
//     return next(error);
//   }
//   // Hash Password
//   const hashedPassword = await bcrypt.hash(password, 10);
//   const user = new User({
//     name,
//     email,
//     password: hashedPassword,
//   });
//   let access_token;
//   try {
//     const result = await user.save();
//     // Generate Token
//     access_token = JwtService.sign({
//       _id: result._id,
//     });
//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,

//       token: access_token,
//     });
//   } catch (error) {
//     // console.log(error);
//     return next(error);
//   }
// };

module.exports = { registerController };
