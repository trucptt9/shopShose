const express = require("express");
const cors = require("cors");
const setupProductRoutes = require("./app/routes/product.routes");
const setupUserRoute = require("./app/routes/user.routes");
const setupShipping = require("./app/routes/shippingDetail.routes");
const { BadRequestError, errorHandler} = require("./app/error");
const app = express();

app.use(cors());
app.use(express.json());


app.get("/",(req,res) => {
    res.json({message: "Welcome to my application"});
});

setupProductRoutes(app);
setupUserRoute(app);
setupShipping(app);
app.use((req, res, next) => {
    //code o day se chay kho khong co route duoc dinh nghia nao
    //khop voi yeu cau. Goi next() de chuyen sang middleware xu ly loi
    next(new BadRequestError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
    errorHandler.handleError(err, res);
});



module.exports = app;