var express = require('express');
var mongo = require('mongodb');
var router = express.Router();
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";
var Binary = require('mongodb').Binary;
const { query,param,body, validationResult, check } = require('express-validator');
var fs = require('fs');
var formidable = require('formidable')

/* GET home page. */

router.get('/',[query('id').notEmpty().exists().isMongoId()] ,function(req, res, next) {
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
                var id = new mongo.ObjectID(req.query.id);
                var myquery = {_id:id};
                dbo.collection("courses").findOne(myquery,function(err,response){
                    if (err) {
                        res.json({result:false , error:err})
                    }
                    else{
                        res.json({result:true,error:"",data:response})
                    }
                    db.close();
                });
            }
        });  
    }
});

router.post('/',function(req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        const result = validationResult(fields);
        var errors = result.errors;
        if (!result.isEmpty()) {
            res.json({ result: false, error: errors })
        }
        else{
            MongoClient.connect(url, function(err, db) {
                if (err) {
                res.json({result:false,error:err})
                }
                else{
                    var dbo = db.db("BrydeTech");
                    var newvalues = {$set:{name:fields.name,price:parseInt(fields.price),description:fields.description,subject:fields.subject,link:fields.link,photo_buffer:fs.readFileSync(files.attatch_photo.path)}}
                    var id = new mongo.ObjectID(fields.id);
                    dbo.collection("courses").updateOne({_id:id},newvalues,function(err,result){
                        if (err) {
                            res.json({result:false , error:err})
                        }
                        else{
                            res.json({result:true,error:""})
                        }
                        db.close();
                    });
                    
                }
            });
        }
    });
});
module.exports = router;