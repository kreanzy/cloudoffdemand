var express = require('express');
var mongo = require('mongodb');
var router = express.Router();
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";
var Binary = require('mongodb').Binary;
const { query,param,body, validationResult, check } = require('express-validator');
var fs = require('fs');
/* GET home page. */
router.post('/',[check("minprice","Please enter minprice").notEmpty().exists(),
                check("course_name","Please enter course name").exists(),
                check("tutor_name","Please enter tutor name").exists(),
                check("subject","Please enter subject").exists(),
                check("maxprice","Please enter maxprice").notEmpty().exists()],function(req, res, next) {
    /*var course_name = ((req.body.course_name=="") ? /^/ : req.body.course_name )
    var tutor_name = ((req.body.tutor_name=="") ? /^/ : req.body.tutor_name )*/
    const result = validationResult(req);
    var errors = result.errors;
    if (!result.isEmpty()) {
        res.json({result:false,error:errors})
    }
    else{
        var subject = ((req.body.subject=="") ? /^/ : req.body.subject )
        var q = {name:{$regex:new RegExp(req.body.course_name),$options:'i'},tutor:{$regex:new RegExp(req.body.tutor_name),$options:'i'},subject:subject,price:{$gte:parseInt(req.body.minprice),$lte:parseInt(req.body.maxprice)}}
        MongoClient.connect(url, function(err, db) {
            if (err) {
                res.json({result:false,error:err})
            }
            else{
                var dbo = db.db("BrydeTech");
                dbo.collection("courses").find(q,{ projection: { _id:1,name:1,tutor:1,price:1,subject:1,rating:1,photo_buffer:1} }).toArray(function(err, result) {
                    if (err){
                        res.json({result:false , error:err})
                    }
                    res.json({result:result});
                    console.log(result)
                    db.close();
                })
            }
        });
    }
});
module.exports = router;