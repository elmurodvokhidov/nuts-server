const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Papkalarni avtomatik yaratish funksiyasi
const createDirectory = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

// Faylni diskka oqim orqali yozish
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = "./uploads/";
        if (file.mimetype.startsWith("image/")) {
            folder = "./uploads/images/";
        } else if (file.mimetype.startsWith("video/")) {
            folder = "./uploads/videos/";
        }
        createDirectory(folder);
        cb(null, folder);
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

module.exports = { upload };