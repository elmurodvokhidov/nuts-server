const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Papkalarni avtomatik yaratish funksiyasi
const createDirectory = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

// Fayl saqlash konfiguratsiyasi
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = './uploads/';
        if (file.mimetype.startsWith('image/')) {
            folder = './uploads/images/';
        } else if (file.mimetype.startsWith('video/')) {
            folder = './uploads/videos/';
        }
        createDirectory(folder);
        cb(null, folder);
    },
    filename: (_, file, cb) => {
        // Fayl original nomi saqlanadi, overwrite qilishni ta'minlaydi
        cb(null, file.originalname);
    }
});

// Fayl filtrini aniqlash
const fileFilter = (req, file, cb) => {
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const allowedVideoTypes = ['video/mp4', 'video/mov', 'video/mkv'];

    if (allowedImageTypes.includes(file.mimetype) || allowedVideoTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Faqat rasm va video yuklashga ruxsat berilgan'), false);
    }
};

// Fayl yuklash cheklovlari
const limits = {
    fileSize: 50 * 1024 * 1024 // Maksimal fayl hajmi: 50 MB
};

module.exports = multer({ storage, fileFilter, limits });