const express = require("express");
const router = express.Router();

const {
  registerController,
} = require("../controllers/auth/registerController");
const { loginController } = require("../controllers/auth/loginController");
const {
  forgotPass,
  resetPassword,
} = require("../controllers/auth/passwordResetController");

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/forgot", forgotPass);
router.put("/reset/:passwordResetToken", resetPassword);

module.exports = router;
