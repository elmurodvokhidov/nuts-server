const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
    {
        type: { type: String, required: true, minlength: 3, maxlength: 50 },
        videoUrl: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Video", videoSchema);