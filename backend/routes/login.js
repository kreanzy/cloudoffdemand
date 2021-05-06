var mongo = require('mongodb');
var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";
const { body, validationResult, check } = require('express-validator');
const bcrypt = require('bcryptjs');
/* GET home page. */

router.post('/',[check("username","Please enter username").not().isEmpty(),
                check("password","Please enter password").not().isEmpty()]
,function(req, res, next) {
    const result = validationResult(req);
    var errors = result.errors;
    if (!result.isEmpty()) {
        res.json({result:false,error:errors})
    }else{
        MongoClient.connect(url, function(err, db) {
            if (err) {
                res.json({result:false,error:err})
            }
            else{
                var dbo = db.db("BrydeTech");
                var user_name = req.body.username;
                var passwd = req.body.password;
                dbo.collection("users").find({"username":user_name}, { projection: { _id: 0, username: 1 ,password:1,isTutor:1} }).toArray(function(err, result) {
                    if (err) {
                        res.json({result:false , error:err})
                    }
                    if(result.length===0){
                        res.json({ result : false , error : "Invalid username or password" })
                    }
                    else{
                    bcrypt.compare(passwd,result[0].password, function(err, isMatch) {
                        if (err) {
                            res.json({result:false , error:err})
                        } else if (!isMatch) {
                            res.json({ result : false , error : "Invalid username or password" })
                        } else {
                            var today = new Date();
                            var time = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDay()+' '+today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
                            myobj = {"username":user_name,"datetime":time}
                            dbo.collection("logs").insertOne(myobj,function(err,response){
                                if (err) {
                                    res.json({result:false,error:err})
                                }
                                res.json({result:true,error:"",isTutor:result[0].isTutor})
                            });
                        }
                    })
                    }
                });
            }
        });
    }
});
module.exports = router;