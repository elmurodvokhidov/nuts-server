const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Papkalarni avtomatik yaratish funksiyasi
const createDirectory = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

// Fayllarni vaqtincha xotirada ushlab turish
const storage = multer.memoryStorage();
const upload = multer({ storage });

const saveFile = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "Fayl yuklanmadi" });
        }

        // Rasm va videolarni alohida papkaga saqlash
        let folder = "./uploads/";
        if (req.file.mimetype.startsWith("image/")) {
            folder = "./uploads/images/";
        } else if (req.file.mimetype.startsWith("video/")) {
            folder = "./uploads/videos/";
        }

        createDirectory(folder);
        const filePath = path.join(folder, req.file.originalname);

        const writeStream = fs.createWriteStream(filePath);
        writeStream.write(req.file.buffer);
        writeStream.end();

        writeStream.on("finish", () => {
            req.fileName = req.file.originalname;
            next();
        });

        writeStream.on("error", (err) => {
            console.error("Fayl yozishda xatolik:", err);
            res.status(500).json({ error: "Faylni saqlashda xatolik yuz berdi" });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Faylni saqlashda xatolik yuz berdi" });
    }
};

module.exports = { upload, saveFile };