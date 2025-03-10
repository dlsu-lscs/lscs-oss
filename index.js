import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import retrieveImage from "./controllers/retrieval.js";
import uploadImage from "./controllers/upload.js";
import path from "path";
import { mkdirp } from "mkdirp";
import fs from "fs";

const app = express();

app.use(cors());

app.post("/test", (req, res) => res.send("hello"));

app.use("/", retrieveImage);
app.post("/upload", uploadImage);

// mkdirp.sync(path.join(__dirname, '/uploads'));
if (!fs.existsSync(process.env.IMAGE_STORE_PATH)) {
  fs.mkdirSync(process.env.IMAGE_STORE_PATH, { recursive: true });
}

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log(`[LSCS-OSS] Database connection established.`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`[LSCS-OSS] Service listening on port: ${PORT}`);
});
