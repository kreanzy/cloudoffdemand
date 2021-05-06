var mongo = require('mongodb');
var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const { body, validationResult, check } = require('express-validator');
var fs = require('fs');
//for send email
'use strict';
const nodemailer = require('nodemailer');
const { render } = require('ejs');
//

/* GET home page. */

router.post('/'/*,upload.single('file')*/,[check("username","Please enter username").not().isEmpty(),
            check("password","Please enter password").not().isEmpty(),
            check("fname","Please enter fname").not().isEmpty(),
            check("lname","Please enter lname").not().isEmpty(),
            check("email","Please enter email").not().isEmpty(),
            check("ppnumber","Please enter ppnumber").not().isEmpty(),
            check("isTutor","Please enter isTutor").not().isEmpty()
            ], function(req, res, next) {
        const result = validationResult(req);
        var errors = result.errors;
        if (!result.isEmpty()) {
            res.json({result:false,error:errors})
        }
        else {
            MongoClient.connect(url, function(err, db) {
                if (err) {
                    //res.send(err);
                    res.json({result:false,error:err})
                }
                else{
                    var dbo = db.db("BrydeTech");
                dbo.collection("users").find({$or:[{"username":req.body.username},{"email":req.body.email},{"ppnumber":req.body.ppnumber}/*,{$and:[{"fname":req.body.fname},{"lname":req.body.lname}]}*/]}, { projection: { _id: 0, username: 1} }).toArray(function(err, result) {
                        if (err) {
                            res.json({result:false , error:err})
                        }
                        if(result.length===0){
                            bcrypt.genSalt(saltRounds, function (err, salt) {
                                if (err) {
                                    res.json({result:false , error:err})
                                } else {
                                  bcrypt.hash(req.body.password, salt, function(err, hash) {
                                    if (err) {
                                        res.json({result:false , error:err})
                                    } else {
                                        var myobj = { username:req.body.username,
                                            password:hash,
                                            fname:req.body.fname,
                                            lname:req.body.lname,
                                            email:req.body.email,
                                            ppnumber:req.body.ppnumber,
                                            isTutor:req.body.isTutor,
                                            /*file:'uploads/'+req.file.originalname,
                                        buffer:fs.readFileSync('uploads/'+req.file.originalname)*/};
                                            code = Math.floor(Math.random() * Math.floor(99999)).toString();
                                            module.exports.code = code;
                                            module.exports.myobj = myobj;
                                            send_email(req.body.email,code);
                                            res.json({ result : true ,error:""})
                                    }
                                  })
                                }
                              })
                        }
                        else{
                            res.json({result:false, error:"U already have an account"})
                        }
                        db.close();
                    });
                }
            });
        }
});

module.exports = router;

function send_email(email,code){
    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
    // สร้างออปเจ็ค transporter เพื่อกำหนดการเชื่อมต่อ SMTP และใช้ตอนส่งเมล
    let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: { // ข้อมูลการเข้าสู่ระบบ
    user: 'brydetech@gmail.com', // email user ของเรา
    pass: 'brudabruda06' // email password
    }
    });
    // เริ่มทำการส่งอีเมล
    let info = await transporter.sendMail({
    from: 'brydetech@gmail.com', // อีเมลผู้ส่ง
    to: email,//,fairphare@gmail.com,owliang1234@gmail.com', // อีเมลผู้รับ สามารถกำหนดได้มากกว่า 1 อีเมล โดยขั้นด้วย ,(Comma)
    subject: 'Hello ✔', // หัวข้ออีเมล
    text: 'ส่งmailได้เเล้วววว', // plain text body
    html: '<b>ALMOST DONE!!</b><p>To complete your registration as a OffDemand user, please use the verification code below.</p><b>VERIFICATION CODE:</b><p>'+code+'</p>'
    });
    // log ข้อมูลการส่งว่าส่งได้-ไม่ได้
    console.log('Message sent: %s', info.messageId);
    }
    main().catch(console.error);  
};