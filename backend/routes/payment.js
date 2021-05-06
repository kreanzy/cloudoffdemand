var express = require('express');
var router = express.Router();
const generatePayload = require('promptpay-qr') 
const qrcode = require('qrcode') 
const fs = require('fs') 
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";
const { body, validationResult, check } = require('express-validator');
const { parse } = require('path');
/* GET home page. */

router.post('/done',[check("username","Please Input username").not().isEmpty(),check("id","Please Input course id").not().isEmpty().isMongoId()], function(req, res, next) {
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
          dbo.collection("courses").updateOne({_id:id},{$push:{student:req.body.username,score:parseFloat(-1),review:""}}),(function(err, result) {
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
router.post('/',[check("tutor","Please Input tutor"),check("price","Please Input price")], function(req, res, next) {
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
          console.log(req.body.tutor)
          dbo.collection("users").find({"username":req.body.tutor}, { projection: { _id: 0, ppnumber:1} }).toArray(function(err, result) {
            if (err) {
              res.json({result:false , error:err})
            }
            console.log(result)
            const amount = parseFloat(req.body.price)
            const payload = generatePayload(result[0].ppnumber, { amount }) //First parameter : mobileNumber || IDCardNumber
            var name = './qr/'+req.body.tutor +'_' + result[0].ppnumber+'_'+amount+'.jpg'
            qrcode.toFile(name,payload,function(err){
              if(err) {
                res.json({result:false,error:err})
              }
              img = fs.readFileSync(name)
              //console.log(img)
              data = {qr:img.toString('base64')}
              res.json({result:true,error:"",data:data})
              //res.render('payment',{param:img})
            })
            db.close();
          });
      }
    });
  }
});

router.get('/', function(req, res, next) {
  res.render('payment_detail')
});
module.exports = router;
