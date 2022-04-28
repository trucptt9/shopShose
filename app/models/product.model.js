const mongoose = require("mongoose");


const ProductSchema = mongoose.Schema({
  productName: {type: String},
  productDescription: {type :String},
  productCategory: {type :String},
  productPrice: {type:String},
  productImage: {type :String}
})

ProductSchema.method("toJSON",function(){
  const { __v, _id, ...object} = this.toObject();
  object.id = _id;
  return object;
});
module.exports = mongoose.model('products', ProductSchema);
