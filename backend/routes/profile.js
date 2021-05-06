var mongo = require('mongodb');
var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const { query,body, validationResult, check } = require('express-validator');
'use strict';
const nodemailer = require('nodemailer');
const { render } = require('ejs');
const { request } = require('express');
var code =  1000000
var new_email = ''
/* GET home page. */

router.get('/',[query('username').notEmpty().exists()], function(req, res, next) {
    const result = validationResult(req);
    var errors = result.errors;
    if (!result.isEmpty()) {
        res.json({result:false,error:errors})
    }
    else{
        MongoClient.connect(url, function(err, db) {
          if (err) {
              res.json({result:false , error:err})
          }
          else {
            var dbo = db.db("BrydeTech");
            dbo.collection("users").find({username:req.query.username},{ projection: {_id:1,fname:1,lname:1,username:1,email:1,ppnumber:1,isTutor:1} }).toArray(function(err, result) {
              if (err) {
                res.json({result:false , error:err})
              }
              res.json({result:true,error:"",data:result})
            });
          }
        });
    }
});
router.post('/edit_profile',[check("username","Please Input username").not().isEmpty(),check("ppnumber","Please Input ppnumber").not().isEmpty(),check("id","Please Input id").not().isEmpty().isMongoId()
                            ,check("fname","Please Input fname").not().isEmpty(),check("lname","Please Input lname").not().isEmpty()], function(req, res, next) {
    const result = validationResult(req);
    var errors = result.errors;
    if (!result.isEmpty()) {
        res.json({result:false,error:errors})
    }
    else{
      MongoClient.connect(url, function(err, db) {
        if (err) {
          res.json({result:false,error:err})
        }
        else{
            var dbo = db.db("BrydeTech");
            var id = new mongo.ObjectID(req.body.id)
            var newvalues = {username:req.body.username,fname:req.body.fname,lname:req.body.lname,ppnumber:req.body.ppnumber}
            dbo.collection("users").find({$or:[{username:req.body.username},{ppnumber:req.body.ppnumber}]}).toArray(function(err, result) {
                if (err) {
                  res.json({result:false , error:err})
                }
                else if( (result.length == 0)){
                    dbo.collection("users").updateOne({_id:id},{$set:newvalues},function(err,res){
                        if (err) {
                          res.json({result:false , error:err})
                        }
                        db.close();
                    });
                    res.json({result:true,error:""})
                }
                else if( (result.length == 1) && ((result[0]._id).toString()==req.body.id) ){
                  dbo.collection("users").updateOne({_id:id},{$set:newvalues},function(err,res){
                      if (err) {
                        res.json({result:false , error:err})
                      }
                      db.close();
                  });
                  res.json({result:true,error:""})
                }
                else{
                    res.json({result:false , error:"This username already exists"})
                }
            });
        }
      });
    }
});
router.post('/change_password',[check("id","Please Input course id").not().isEmpty().isMongoId(),check("current_password","Please Input your current_password").not().isEmpty(),
            check("new_password","Please Input your new_password").not().isEmpty()], function(req, res, next) {
    const result = validationResult(req);
    var errors = result.errors;
    if (!result.isEmpty()) {
        res.json({result:false,error:errors})
    }
    else{
        MongoClient.connect(url, function(err, db) {
            if (err) {
                res.json({result:false , error:err})
            }
            else {
              var dbo = db.db("BrydeTech");
              var id = new mongo.ObjectID(req.body.id)
              var myquery = {_id:id};
              dbo.collection("users").findOne(myquery,function(err,result){
                if (err) {
                  res.json({result:false , error:err})
                }
                else{
                    bcrypt.compare(req.body.current_password,result.password, function(err, isMatch) {
                        if (err) {
                            res.json({result:false , error:err})
                        } else if (!isMatch) {
                            res.json({ result : false , error : "Invalid information" })
                        } else {
                            bcrypt.genSalt(saltRounds, function (err, salt) {
                                if (err) {
                                  res.json({result:false , error:err})
                                } else {
                                  bcrypt.hash(req.body.new_password, salt, function(err, hash) {
                                    if (err) {
                                      res.json({result:false , error:err})
                                    } 
                                    else{
                                        var newvalues = {$set:{password:hash}}
                                        dbo.collection("users").updateOne(myquery,newvalues,function(err,res){
                                            if (err) {
                                              res.json({result:false , error:err})
                                            }
                                        });
                                        res.json({result:true,error:""})
                                    }
                                  })
                                }
                            })
                        }
                    })
                }
              });

            }
        });
    }
});
router.post('/change_email',[check("id","Please Input course id").not().isEmpty().isMongoId()
                            ,check("email","Please Input email").not().isEmpty()], function(req, res, next) {
    const result = validationResult(req);
    var errors = result.errors;
    if (!result.isEmpty()) {
        res.json({result:false,error:errors})
    }
    else{
        MongoClient.connect(url, function(err, db) {
            if (err) {
              res.json({result:false,error:err})
            }
            else{
                var dbo = db.db("BrydeTech");
                var id = new mongo.ObjectID(req.body.id)
                dbo.collection("users").find({email:req.body.email}).toArray(function(err, result) {
                    if (err) {
                      res.json({result:false , error:err})
                    }
                    else if( (result.length == 0)){
                        code = Math.floor(Math.random() * Math.floor(99999)).toString();
                        new_email = req.body.email
                        console.log(new_email,code)
                        send_email(req.body.email,code);
                        res.json({ result : true ,error:"",code: code})
                    }
                    else if( (result.length == 1) && ((result[0]._id).toString()==req.body.id) ){
                        res.json({ result : false ,error:"You already use this email"})
                    }
                    else{
                        res.json({result:false , error:"Please try another email"})
                    }
                });
            }
          });

    }
});
router.post('/verify_email',[check("id","Please Input course id").not().isEmpty().isMongoId()
                            ,check("code","Please Input code").not().isEmpty()], function(req, res, next) {
    const result = validationResult(req);
    var errors = result.errors;
    if (!result.isEmpty()) {
        res.json({result:false,error:errors})
    }
    else{
        MongoClient.connect(url, function(err, db) {
            if (err) {
              res.json({result:false,error:err})
            }
            else if(req.body.code == code){
                var dbo = db.db("BrydeTech");
                var id = new mongo.ObjectID(req.body.id)
                var newvalues = {email:new_email}
                dbo.collection("users").updateOne({_id:id},{$set:newvalues},function(err,res){
                    if (err) {
                      res.json({result:false , error:err})
                    }
                    db.close();
                });
                res.json({result:true,error:""})
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
    html: '<b>ALMOST DONE!!</b><p>Please use the verification code below to change your email.</p><b>VERIFICATION CODE:</b><p>'+code+'</p>' // html body
    });
    // log ข้อมูลการส่งว่าส่งได้-ไม่ได้
    console.log('Message sent: %s', info.messageId);
    }
    main().catch(console.error);  
};