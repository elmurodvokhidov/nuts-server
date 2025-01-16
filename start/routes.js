const express = require("express");
const cors = require("cors");

module.exports = (app) => {
    // middleware
    app.use(cors());
    app.use(express.json());

    // static files route
    app.use("/uploads", express.static("uploads"));

    // routes
    app.get("/", (_, res) => res.send("Hello world!"));
    app.use("/api/products", require("../routes/products.routes"));
    app.use("/api/videos", require("../routes/videos.routes"));
    app.use("/api/upload", require("../routes/uploads.routes"));
    app.use("/api/email", require("../routes/email.routes"));
};