const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { processClaim } = require("./agent");

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "application/pdf" ||
      file.mimetype === "text/plain"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF and TXT files are allowed."));
    }
  },
});

app.post("/process-claim", upload.single("document"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    const result = await processClaim(req.file.path);

    fs.unlink(req.file.path, () => {});

    return res.json(result);
  } catch (error) {
    console.error("Processing error:", error.message);

    return res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
});

module.exports = app;
    