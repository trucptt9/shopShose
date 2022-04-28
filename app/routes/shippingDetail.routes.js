const express = require("express");
//const { router } = require("../../app");
const shipping = require("../controllers/shippingDetail.controller");

module.exports = (app) =>{
    const router = express.Router();
    router.post("/create",shipping.createShipping);
    
    app.use("/api/shipping",router);
}