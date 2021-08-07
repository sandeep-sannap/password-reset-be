const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const { LOCAL_DB, DB_URL } = require("./config");

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log(`databse connected succesfully`);
  })
  .catch((err) => {
    console.log(err);
    process.exit();
  });

app.use(express.json());
app.use(cors());

app.use("/api/auth", require("./routes/authRoute"));
app.use(require("./middlewares/errorHandler"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, (req, res) => {
  console.log(`::::Server running on port : ${PORT}`);
});
