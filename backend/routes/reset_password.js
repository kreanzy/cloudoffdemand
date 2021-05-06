var express = require('express');
var mongo = require('mongodb');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcryptjs');
const saltRounds = 10;
var url = "mongodb://127.0.0.1:27017/";
var data = require("./forget_password.js");
const { body, validationResult, check } = require('express-validator');

router.post('/',[check("fname","Please Input your fname").not().isEmpty(),
            check("lname","Please Input your lname").not().isEmpty(),
            check("username","Please Input your username").not().isEmpty(),
            check("password","Please Input your password").not().isEmpty(),
            check("code","Please Input your code").not().isEmpty()], function(req, res, next) {
    const result = validationResult(req);
    var errors = result.errors;
    if (!result.isEmpty()) {
        res.json({result:false,error:errors})
    }
    else if(data.code == req.body.code){
        MongoClient.connect(url, function(err, db) {
            if (err) {
                res.json({result:false , error:err})
            }
            else {
              var dbo = db.db("BrydeTech");
              var myquery = {"username":req.body.username,"lname":req.body.lname,"fname":req.body.fname,"email":data.email};
              dbo.collection("users").findOne(myquery,function(err,doc){
                if (err) {
                  res.json({result:false , error:err})
                }
                if(doc == null){
                    res.json({result:false,error:"Incorrect Information"})
                }
                else{
                    bcrypt.genSalt(saltRounds, function (err, salt) {
                        if (err) {
                          res.json({result:false , error:err})
                        } else {
                          bcrypt.hash(req.body.password, salt, function(err, hash) {
                            if (err) {
                              res.json({result:false , error:err})
                            } 
                            else{
                                console.log(hash)
                                var newvalues = {$set:{password:hash}}
                                dbo.collection("users").updateOne(myquery,newvalues,function(err,res){
                                    if (err) {
                                      res.json({result:false , error:err})
                                    }
                                    db.close();
                                });
                                res.json({result:true,error:""})
                            }
                          })
                        }
                    })
                }
              });

            }
        });
    }
    else{
        res.json({result:false,error:"Incorrect Informationn"})
    }
});
module.exports = router;

