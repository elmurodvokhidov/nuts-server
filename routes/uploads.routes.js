const express = require("express");
const path = require("path");
const { upload } = require("../lib/multer");

const router = express.Router();

// Rasm yuklash
router.post("/image", upload.single("image"), (req, res) => {
    try {
        res.status(201).json(`${process.env.PRODUCTION}/uploads/images/${req.file.filename}`);
    } catch (err) {
        res.status(500).json({ error: "Faylni yuklashda xatolik yuz berdi." });
    }
});

// Video yuklash
router.post("/video", upload.single("video"), (req, res) => {
    try {
        res.status(201).json(`${process.env.PRODUCTION}/uploads/videos/${req.file.filename}`);
    } catch (err) {
        res.status(500).json({ error: "Faylni yuklashda xatolik yuz berdi." });
    }
});

module.exports = router;