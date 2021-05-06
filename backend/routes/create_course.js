var mongo = require('mongodb');
var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";
const { body, validationResult, check } = require('express-validator');
var fs = require('fs');
var formidable = require('formidable')

/* GET home page. */


router.post('/',function(req, res, next) {
        console.log('recieve data')
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
                        var myobj = {name:fields.name,
                            tutor:fields.tutor,
                            price:parseInt(fields.price),
                            subject:fields.subject,
                            description:fields.description,
                            link:fields.link,
                            photo_buffer:fs.readFileSync(files.attatch_photo.path),
                            video_name:[],
                            video_buffer:[],
                            video_size:[],
                            video_type:[],
                            rating:'-',
                            enrolled_date:'-',
                            student:[],
                            score:[],
                            review:[]};
                        dbo.collection("courses").insertOne(myobj,function(err,result){
                            if (err) {
                                res.json({result:false , error:err})
                            }
                            else{
                                res.json({result:true,error:"",id:result["ops"][0]["_id"]})
                            }
                            db.close();
                        });
                        
                    }
                });
            }
        });
});

module.exports = router;