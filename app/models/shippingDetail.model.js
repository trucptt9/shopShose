const mongoose = require("mongoose");
//const Schema = mongoose.Schema;

//thong tin van chuyen
const ShippingSchema = mongoose.Schema({
  address: String,
  shippingDate: String,
  products: Array,
  userId: String,
  totalPrice: String,
});
ShippingSchema.method("toJSON",function(){
  const { __v, _id, ...object} = this.toObject();
  object.id = _id;
  return object;
});

module.exports = mongoose.model("ShippingDetais", ShippingSchema);
