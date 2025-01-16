const express = require('express');
const {
    addNewProduct,
    getAllProducts,
    updateProduct,
    deleteProduct
} = require('../controller/products.controller');
const router = express.Router();

router.post('/', addNewProduct);
router.get('/', getAllProducts);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;