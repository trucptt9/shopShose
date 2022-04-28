const mongoose = require("mongoose");
const ShippingDetail = require("../models/shippingDetail.model");

exports.createShipping = async (req, res) =>{
    //tao dia chi luu moi cua san pham
    const shippingDetail = new ShippingDetail(); 
    shippingDetail.address = req.body.address;
    shippingDetail.shippingDate = req.body.shippingDate;
    shippingDetail.products = req.body.products;
    shippingDetail.userId = req.body.userId;
    shippingDetail.totalPrice = req.body.totalPrice;

    try{
      const document = await shippingDetail.save();
      return res.send(document);
      console.log('Successful');

  } catch(error) {
      return next(
          new BadRequestError(500,
              "Có lỗi xảy ra khi tạo tài khoản")
      );
  }
   
    
}