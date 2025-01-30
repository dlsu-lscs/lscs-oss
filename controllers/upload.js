const express = require('express');
const router = express.Router();
const multer = require('multer');
const Image = require("./model");
const accessValidation = require("./middleware/accessValidation");

const upload = multer({ dest: process.env.IMAGE_STORE_PATH });

router.get("/:key", accessValidation, upload.array('photos', 4), async (req, res) => {
  const metadata = req.body.metadata;


});

module.exports = router
