import express from "express";
import Image from "../model.js";
import upload from "../services/storage.js";
import accessValidation from "../middleware/accessValidation.js";
import path from "path";
import sharp from "sharp";
import fs from "fs";

const router = express.Router();

router.post("/upload", accessValidation, async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    try {
      const { file } = req;
      const uploadData = req.body;
      if (!file) {
        return res
          .status(400)
          .json({ success: false, message: "file not supplied" });
      }
      const mainFilePath = path.join(
        process.env.IMAGE_STORE_PATH,
        "M_" + file.filename,
      );
      const thumbFilePath = path.join(
        process.env.IMAGE_STORE_PATH,
        "T_" + file.filename,
      );

      await sharp(file.path)
        .resize()
        .jpeg({ quality: 70 })
        .toFile(mainFilePath);
      await sharp(file.path)
        .resize()
        .jpeg({ quality: 30 })
        .toFile(thumbFilePath);

      console.log(file);
      fs.unlinkSync(file.path);

      const data = req.body;

      await Image.create({
        type: data.type || "default",
        image: mainFilePath,
        thumbnail: thumbFilePath,
        metadata: {
          uploader: {
            id: req.user._id,
            username: req.user.info.username,
          },
          // owners: uploadData.metadata.owners
        },
      }).then((imageKey) => {
        res.status(201).json({
          status: "success",
          image: `${process.env.API_URL}/${imageKey._id}`,
          thumbnail: `${process.env.API_URL}/${imageKey._id}?type=thumbnail`,
        });
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  });
});

export default router;
