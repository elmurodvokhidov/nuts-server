const Video = require("../models/video");

const addNewVideo = async (req, res) => {
    try {
        const existingVideo = await Video.findOne({ type: req.body.type });
        if (existingVideo) {
            return res.status(400).json({ error: "Ushbu bo'limda allaqachon video mavjud." });
        }

        const video = new Video(req.body);
        await video.save();

        return res.status(201).json(video);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getAllVideos = async (req, res) => {
    try {
        const videos = await Video.find();
        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getVideosByType = async (req, res) => {
    try {
        const video = await Video.findOne({ type: req.params.type });
        if (!video) return res.status(404).json({ message: "Ma'lumot topilmadi." });
        res.status(200).json(video);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const updateVideo = async (req, res) => {
    try {
        const video = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!video) return res.status(404).json({ message: "Ma'lumot topilmadi." });
        res.status(200).json(video);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const deleteVideo = async (req, res) => {
    try {
        const video = await Video.findByIdAndDelete(req.params.id);
        if (!video) return res.status(404).json({ message: "Ma'lumot topilmadi." });
        return res.status(200).json({ message: "Muvaffaqiyatli o'chirildi." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addNewVideo,
    getAllVideos,
    getVideosByType,
    updateVideo,
    deleteVideo,
}