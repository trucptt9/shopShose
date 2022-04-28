const express = require("express");
//const { router } = require("../../app");
const user = require("../controllers/user.controller");

module.exports = (app) =>{
    const router = express.Router();
    router.post("/create",user.create);
    router.get("/:id",user.findOneUser);
    router.get("/",user.findAllUser);
    
    
    app.use("/api/users",router);
}