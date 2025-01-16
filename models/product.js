const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, minlength: 3, maxlength: 50 },
        description: { type: String, required: true },
        imgUrl: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);