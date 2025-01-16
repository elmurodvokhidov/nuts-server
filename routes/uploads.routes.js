const express = require("express");
const router = express.Router();
const upload = require("../lib/multer");

// Rasm yuklash
router.post("/image", upload.single('image'), (req, res) => {
    res.status(201).json(`${process.env.PRODUCTION}/images/uploads/${req.file.filename}`);
});

// Video yuklash
router.post("/video", upload.single('video'), (req, res) => {
    res.status(201).json(`${process.env.PRODUCTION}/uploads/videos/${req.file.filename}`);
});

module.exports = router;