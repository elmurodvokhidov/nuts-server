const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
require("dotenv").config();

// middleware
app.use(cors());
app.use(express.json());

// static files route
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// routes
app.get("/", (_, res) => res.send("Hello world!"));
app.use("/api/products", require("./routes/products.routes"));
app.use("/api/videos", require("./routes/videos.routes"));
app.use("/api/upload", require("./routes/uploads.routes"));
app.use("/api/email", require("./routes/email.routes"));

// mongodb connection
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("mongodb successfully connected!");
        app.listen(PORT, () => console.log(`server running on port ${PORT}`));
    })
    .catch(error => {
        console.log("mongodb connection error: ", error.message);
        process.exit(1);
    })