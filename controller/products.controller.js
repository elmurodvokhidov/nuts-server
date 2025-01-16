const Product = require("../models/product");

const addNewProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        return res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) return res.status(404).json({ message: "Ma'lumot topilmadi." });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: "Ma'lumot topilmadi." });
        return res.status(200).json({ message: "Muvaffaqiyatli o'chirildi." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addNewProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
}