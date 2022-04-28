const mongoose = require("mongoose");
const { BadRequestError } = require("../error");
const handlePromise = require("../helpers/promise.helper");
const product = require("../models/product.model");

exports.findAll = async (req, res, next) =>{
    //res.send({message: "findAll handler"});
    const condition ={ };
    const { name } = req.query;
    if(name){
        condition.name = {$regex: new RegExp(name), $options: "i"};
    }

    try{
        const documents = await product.find(condition);
        return res.send(documents)
    } catch(error){
        return next(
            new BadRequestError(500,
                "An error occurred while retrieving contatcs")
        );
    }
    
}


exports.findOne = async(req, res, next) =>{
  
    const{ id } = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };

   try{
       const document = await product.findOne(condition);
       if(!document){
           return next(new BadRequestError(404,"Product not found"));
       }

       return res.send(document);

   }catch(error){
       return next(new BadRequestError(500,
        'Error retrieving contact with id = ${req.param.id}')

       );
   }
    
};

exports.delete = async(req, res, next) =>{
    const{ id } = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };

    try{
        const document = await product.findOneAndDelete(condition);
        if(!document){
            return next(new BadRequestError(400,"Poduct not found"));
        }
        return res.send({message:"Product was deleted success"})
    }catch(error){
        return next(
            new BadRequestError(500,
                'Could not delete Product with id=${req.params.id}')
        );
    }

};