const express = require("express");

const products = require("../controllers/product.controller");

module.exports = (app) =>{
    const router = express.Router();
    router.get('/',products.findAll);
    router.get('/:id',products.findOne);
    router.delete('/:id',products.delete)
    app.use("/api/products",router);
}