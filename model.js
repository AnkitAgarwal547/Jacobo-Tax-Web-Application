const config=require("config");
const jwt=require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

const adminUserSchema = new mongoose.Schema({
    
    firstName: {
        type: String,
        minlength: 2,
        maxlength: 30,
        required: true
    },
    lastName: {
        type: String,
        minlength: 2,
        maxlength: 30,
        required: true
    },
      adminUserEmail: {
        type: String,
        minlength: 5,
        maxlength: 255, 
        required: true
    },

    mobilePhone:{
        type: String,
        minlength:10,
        maxlength:10,
        required:true
    }
    ,
    profilePicture:{
        type:String,
        required:false,
        default:'/uploads/BlankProfilePicture.jpg'
    }
});

adminUserSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        { _id: this._id, isSuperAdmin: this.isSuperAdmin },
        config.get("jwtPrivateKey")
    );
    return token;
};

const AdminUser = mongoose.model("AdminUser", adminUserSchema);

function validate(adminUser) {
    const schema = Joi.object({
        firstName:Joi.string().min(2).max(30).required(),
        lastName:Joi.string().min(2).max(30).required(),
        adminUserEmail:Joi.string().min(5).max(255).required(),
        mobilePhone:Joi.string().min(10).max(10).required(),
        profilePicture:Joi.string().default('/uploads/BlankProfilePicture.jpg')
    });
    return schema.validate(adminUser);
}

module.exports = { AdminUser, validate };