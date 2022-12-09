const {
    AdminUser,
    validate
} = require("../models/AdminUser.js");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
var nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const bcrypt = require("bcrypt");
const {
    getMaxListeners
} = require("process");
var path = require('path');
const auth = require('../middleware/auth');


var options = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
        //console.log('adminuser_id', req.params._id);
        cb(null, req.params._id + path.extname(file.originalname));
    }
});
var upload = multer({
    storage: options
});

router.put("/profile/:_id", upload.single("file"), auth, async (req, res) => {
    const _id = req.params._id;
    let adminUser = await AdminUser.findOne({
        _id: _id
    });
    if (!adminUser)
        return res
            .status(404)
            .send("The admin user with the given ID was not found");
    let imagePath;
    if (req.file) {
        console.log('put profile req body 1', req.file, req.body.firstName, req.body.lastName, req.body.adminUserEmail, req.body.adminUserStatus);
        imagePath = '/uploads/' + req.file.filename;
    } else {
        console.log('put profile req body 2', req.file, req.body.firstName, req.body.lastName, req.body.adminUserEmail, req.body.adminUserStatus);
        imagePath = adminUser.profilePicture;
    }
    collection = await AdminUser.findOneAndUpdate({
        _id: _id
    }, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        adminUserEmail: req.body.adminUserEmail,
        adminUserStatus: req.body.adminUserStatus,
        profilePicture: imagePath
    }, {
        new: true
    });

    if (!collection) {
        console.log('error in update collection');
    }
    res.send(collection);
});