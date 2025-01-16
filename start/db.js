const mongoose = require("mongoose");

module.exports = async (app) => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("mongodb successfully connected!");
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`server running on port ${PORT}`));
    } catch (error) {
        console.error("mongodb connection error: ", error.message);
        process.exit(1);
    }
}