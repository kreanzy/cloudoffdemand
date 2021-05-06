var mongo = require('mongodb');
var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";
const { query,body, validationResult, check } = require('express-validator');
var fs = require('fs');
const { abort } = require('process');

router.get('/',[query('topic').exists(),query('subject').exists(),query('username').exists()],function(req, res, next) {
    // var topic = ((req.query.topic=="") ? /^/ : req.query.topic )
    // var creator = ((req.query.username=="") ? /^/ : req.query.username )
    const result = validationResult(req);
    var errors = result.errors;
    if (!result.isEmpty()) {
        res.json({result:false,error:errors})
    }else{
        var subject = ((req.query.subject=="") ? /^/ : req.query.subject )
        var q = {"subject":subject,"topic":{$regex:new RegExp(req.query.topic),$options:'i'},"creator":{$regex:new RegExp(req.query.username),$options:'i'}}
        MongoClient.connect(url, function(err, db) {
            if (err) {
                res.json({result:false,error:err})
            }
            else{
                var dbo = db.db("BrydeTech");
                dbo.collection("Q&A").find(q,{ projection: { _id:1,topic:1,creator:1,subject:1,follower:1} }).sort({topic:-1}).toArray(function(err, result) {
                    if (err){
                        res.json({result:false , error:err})
                    }
                    var isFollow = []
                    for(i=0;i<result.length;i++){
                        follow = result[i].follower.findIndex(student => student == req.query.student_name);
                        isFollow[i] = (follow == -1) ? false:true;
                    }
                    res.json({result:result,error:"",isFollow:isFollow});
                    db.close();
                })
            }
        });
    }
});
router.get('/suggestion',[query('student_name').notEmpty().exists()], function(req, res, next) {
    const result = validationResult(req);
    var errors = result.errors;
    if (!result.isEmpty()) {
        res.json({result:false,error:errors})
    }else{
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("BrydeTech");
            dbo.collection('Q&A').aggregate([
            { $project:
                {
                "_id":1,
                "topic":1,
                "subject":1,
                "creator":1,
                "size":{"$size":"$follower"},
                "follower":1
                }
            },  
            {
                "$sort":{"size":-1}
            }
            ]).toArray(function(err, result) {
                if (err){
                    res.json({result:false , error:err})
                }else{
                    var isFollow = []
                    for(i=0;i<result.length;i++){
                        follow = result[i].follower.findIndex(student => student == req.query.student_name);
                        isFollow[i] = (follow == -1) ? false:true;
                    }
                    res.json({result:true , error:"",data:result,isFollow:isFollow})
                }
                //console.log(JSON.stringify(result));
            db.close();
            });
        });
    }
});
router.post('/',[check("username","Please enter username").not().isEmpty(),
                check("id","Please enter id").not().isEmpty().isMongoId()],function(req, res, next) {
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
                var id = new mongo.ObjectID(req.body.id)
                var username = req.body.username
                dbo.collection("Q&A").find({"follower":req.body.username,_id:id}, { projection: { _id: 0,topic:1} }).toArray(function(err, result) {
                    if (err) {
                        res.json({result:false , error:err})
                    }
                    if(result.length === 0 ){
                        //follow(id,req.body.username);
                        MongoClient.connect(url, function(err, db) {
                            if (err) {
                                res.json({result:false,error:err})
                            }
                            else{
                                var dbo = db.db("BrydeTech");
                                var myquery = { _id: id };
                                var newvalues = { $push: {follower:username} };
                                dbo.collection("Q&A").updateOne(myquery, newvalues, function(err, res) {
                                  if (err) {
                                    res.json({result:false , error:err})
                                  }
                                });
                            }
                        });
                        res.json({result:true,description:"follow",error:""})
                    }
                    else{
                        //unfollow(id,req.body.username);
                        MongoClient.connect(url, function(err, db) {
                            if (err) {
                                res.json({result:false,error:err})
                            }
                            else{
                                var dbo = db.db("BrydeTech");
                                var myquery = { _id: id };
                                var newvalues = { $pull: {follower:username} };
                                dbo.collection("Q&A").updateOne(myquery, newvalues, function(err, res) {
                                if (err) {
                                    res.json({result:false , error:err})
                                }
                                });
                            }
                        });
                        res.json({result:true,description:"unfollow",error:""})
                    }
                    db.close();
                });
            }
        });
        

    }
});
module.exports = router;

/*function follow(id,username){
        MongoClient.connect(url, function(err, db) {
            if (err) {
                res.json({result:false,error:err})
            }
            else{
                var dbo = db.db("BrydeTech");
                var myquery = { _id: id };
                var newvalues = { $push: {follower:username} };
                dbo.collection("Q&A").updateOne(myquery, newvalues, function(err, res) {
                  if (err) {
                    res.json({result:false , error:err})
                  }
                  db.close();
                });
            }
        });
}

function unfollow(id,username){
    MongoClient.connect(url, function(err, db) {
        if (err) {
            res.json({result:false,error:err})
        }
        else{
            var dbo = db.db("BrydeTech");
            var myquery = { _id: id };
            var newvalues = { $pull: {follower:username} };
            dbo.collection("Q&A").updateOne(myquery, newvalues, function(err, res) {
            if (err) {
                res.json({result:false , error:err})
            }
            db.close();
            });
        }
    });
}*/
