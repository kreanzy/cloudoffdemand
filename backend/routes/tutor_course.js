var express = require('express');
var mongo = require('mongodb');
var router = express.Router();
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";
var Binary = require('mongodb').Binary;
var fs = require('fs');
const { query,param,body, validationResult, check } = require('express-validator');
/* GET home page. */

router.get('/',[query('tutor').notEmpty().exists()], function(req, res, next) {
    const result = validationResult(req);
    var errors = result.errors;
    if (!result.isEmpty()) {
        res.json({result:false,error:errors})
    }else{
        MongoClient.connect(url, function(err, db) {
            if (err) {
                res.json({result:false , error:err})
            }
            else{
                var dbo = db.db("BrydeTech");
                dbo.collection("courses").find({tutor:req.query.tutor}, { projection:{_id:1,name:1,tutor:1,price:1,subject:1,description:1,link:1,photo_buffer:1,rating:1,student:1} }).toArray(function(err, result) {
                    if (err){
                        res.json({result:false , error:err})
                    }
                    res.json({result:result});
                    db.close();
                })
            }
        });
    }
});
module.exports = router;