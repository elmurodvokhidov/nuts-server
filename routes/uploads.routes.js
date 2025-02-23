const express = require("express");
const path = require("path");
const { upload, saveFile } = require("../lib/multer");

const router = express.Router();

// Rasm yuklash
router.post("/image", upload.single("image"), saveFile, (req, res) => {
    try {
        res.status(201).json(`${process.env.PRODUCTION}/uploads/images/${req.fileName}`);
    } catch (err) {
        res.status(500).json({ error: "Faylni yuklashda xatolik yuz berdi." });
    }
});

// Video yuklash
router.post("/video", upload.single("video"), saveFile, (req, res) => {
    try {
        res.status(201).json(`${process.env.PRODUCTION}/uploads/videos/${req.fileName}`);
    } catch (err) {
        res.status(500).json({ error: "Faylni yuklashda xatolik yuz berdi." });
    }
});

module.exports = router;