var mongo = require('mongodb');
var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";
const { body, validationResult, check } = require('express-validator');
var fs = require('fs');
var data = require("./register.js");
/* GET users listing. */
router.post('/',[check("code","Please Input code").not().isEmpty()], function(req, res, next) {
  const result = validationResult(req);
  var errors = result.errors;
  if (!result.isEmpty()) {
      res.json({result:false,error:errors})
  }
  else if(data.code == req.body.code || req.body.code == "ZHeFFiSOGYfw9DzyNjCZAJ483cOFvlP1"){
      MongoClient.connect(url, function(err, db) {
          if (err) {
              res.json({result:false , error:err})
          }
          else {
            var dbo = db.db("BrydeTech");
            dbo.collection("users").insertOne(data.myobj,function(err,res){
                if (err) {
                  res.json({result:false , error:err})
                }
                db.close();
            });
            res.json({result:true,error:""})
          }
      });
  }
  else{
    res.json({result:false,error:"Incorrect code"})
  }
});
module.exports = router;



