const express = require('express');
const router = express.Router();
const Image = require("./model");
const accessValidation = require("./middleware/accessValidation");

router.get("/:key", accessValidation, async (req, res) => {
  const type = response.query.type || "main";

  const img = await Image.find({ key: response.query.key }).exec();

  if (!img) {
    return res.status(400).send({ status: "error", msg: "Image not found." });
  }

  // NOTE: Only one check, if not a message type, automatically assume global access.
  if (img.type == "message" && !img.parties.includes(user.id)) {
    return res.status(400).send({ status: "error", msg: "Unauthorized access. " });
  }

  if (type == "thumbnail") {
    return res.sendFile(process.env.IMAGE_STORE_PATH, img.imagePath.thumbnail);
  } else {
    return res.sendFile(process.env.IMAGE_STORE_PATH, img.imagePath.main);
  }
});

module.exports = router;
