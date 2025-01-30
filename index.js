require("dotenv").config()
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.use("/", retrieveImage);
app.use("/upload", uploadImage);

app.listen(process.env.PORT, () => {
  console.log("[LSCS-OSS] Service listening on port: ", process.env.PORT);
});
