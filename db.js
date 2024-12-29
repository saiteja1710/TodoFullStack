const mongoose = require("mongoose");
const { boolean } = require("zod");
const schema =mongoose.Schema;
const objectId = schema.ObjectId;

const userSchema=new schema({
    email : String,
    password : String, 
    userName : String 
});

const todoSchema = new schema({
    task : String,
    done : Boolean,
    userId : objectId
});

const userModel = mongoose.model("users",userSchema);
const todoModel = mongoose.model("todos",todoSchema)

module.exports={
    userModel,
    todoModel
};