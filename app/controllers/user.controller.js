const mongoose = require("mongoose");
const User = require("../models/user.model");
const { BadRequestError } = require("../error");
const handlePromise = require("../helpers/promise.helper");
exports.create = async(req, res, next) =>{
  if(!req.body.name){
      return next(new BadRequestError(400,"Name can not be empty"));
  }

  const user = new User({
      name: req.body.name,
      password:req.body.password,
      email: req.body.email,
  
  });

  try{
      const document = await user.save();
      return res.send(document);

  } catch(error) {
      return next(
          new BadRequestError(500,
              "An error occurred while creating user")
      );
  }
};

exports.findOneUser = async(req, res, next) =>{
  
  const{ id } = req.params;
  const condition = {
      _id: id && mongoose.isValidObjectId(id) ? id : null,
  };

 try{
     const document = await User.findOne(condition);
     if(!document){
         return next(new BadRequestError(404,"User not found"));
     }

     return res.send(document);

 }catch(error){
     return next(new BadRequestError(500,
      'Error retrieving user with id = ${req.param.id}')

     );
 }
  
};
exports.findAllUser = async (req, res, next) =>{
  //res.send({message: "findAll handler"});
  const condition ={ };
  const { name } = req.query;
  if(name){
      condition.name = {$regex: new RegExp(name), $options: "i"};
  }

  try{
      const documents = await User.find(condition);
      return res.send(documents)
  } catch(error){
      return next(
          new BadRequestError(500,
              "Có lỗi khi lấy tất cả người dùng")
      );
  }
  
}

exports.check_user = async (req, res) => {
    User.find(
        {
          email: req.body.email,
          password: req.body.password,
        },
        function(err, user) {
          if (err) {
            res.send(err);
          }
    
          if (user.length === 0) {
            res.status(401).json({
              status: 401,
              message: "Tài khoản không tồn tại",
            });
          } else {
            res.json(user);
          }
        }
      );
    
    
}