var express = require('express');
var mongo = require('mongodb');
var router = express.Router();
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";
var Binary = require('mongodb').Binary;
const { query, validationResult, check } = require('express-validator');
router.get('/',[query('id').notEmpty().exists().isMongoId(),query('student_name').notEmpty().exists()], function(req, res, next) {
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
          var id = new mongo.ObjectID(req.query.id);
          dbo.collection("courses").find({_id:id},{ projection: {_id:1,name:1,tutor:1,subject:1,price:1,description:1,rating:1,score:1,review:1,link:1,video_buffer:1,student:1,photo_buffer:1,video_buffer:1,video_name:1,video_size:1,video_type:1} }).toArray(function(err, result) {
            if (err) {
              res.json({result:false , error:err})
            }
            db.close();
            video_size = result[0].video_buffer.length
            enroll = result[0].student.findIndex(student => student == req.query.student_name);
            Isenroll = (enroll == -1) ? false : true;
            data = {name:result[0].name,tutor:result[0].tutor,subject:result[0].subject,price:result[0].price,description:result[0].description,rating:result[0].rating,score:result[0].score,review:result[0].review,Isenroll:Isenroll,student:result[0].student
              ,link:result[0].link,photo_buffer:result[0].photo_buffer,total_video:video_size,video_name:result[0].video_name,video_buffer:result[0].video_buffer,video_size:result[0].video_size,video_type:result[0].video_type}
            res.json({result:true,error:"",data:data})
          });
        }
      });
  }
});
module.exports = router;