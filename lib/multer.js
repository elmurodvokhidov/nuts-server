const multer = require("multer");
const path = require("path");
const fs = require("fs").promises;

// Papkalarni avtomatik yaratish funksiyasi
const createDirectory = async (dir) => {
    try {
        await fs.mkdir(dir, { recursive: true });
    } catch (err) {
        console.error("Papkani yaratishda xatolik:", err);
    }
};

// Fayl saqlash konfiguratsiyasi
const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        let folder = "./uploads/";
        if (file.mimetype.startsWith("image/")) {
            folder = "./uploads/images/";
        } else if (file.mimetype.startsWith("video/")) {
            folder = "./uploads/videos/";
        }

        await createDirectory(folder);
        cb(null, folder);
    },
    filename: (_, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    },
});

// Fayl filtrini aniqlash
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "video/mp4", "video/mov", "video/mkv"];
    cb(null, allowedTypes.includes(file.mimetype));
};

// Multer konfiguratsiyasi
module.exports = multer({ storage, fileFilter });