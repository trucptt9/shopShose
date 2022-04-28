const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: String,
    password: String,
    email: String,
});
UserSchema.method("toJSON",function(){
    const { __v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
  });
module.exports = mongoose.model("Users", UserSchema);
