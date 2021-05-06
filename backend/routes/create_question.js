var mongo = require('mongodb');
var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";
const { body, validationResult, check } = require('express-validator');
var formidable = require('formidable')
var fs = require('fs');
/* GET users listing. */

router.post('/', function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        const result = validationResult(fields);
        var errors = result.errors;
        if (!result.isEmpty()) {
            res.json({ result: false, error: errors })
        }
        else {
            MongoClient.connect(url, function (err, db) {
                if (err) {
                    res.json({ result: false, error: err })
                }
                else {
                    var dbo = db.db("BrydeTech");
                    var myobj = {
                        topic: fields.topic,
                        creator: fields.username,
                        subject: fields.subject,
                        description: fields.content,
                        attach_photo: files['attatch_photo'].name,
                        buffer: fs.readFileSync(files['attatch_photo'].path),
                        comment: [], follower: [] , writer:[],
                        //follower:[],comment:[]
                    };
                    dbo.collection("Q&A").insertOne(myobj, function (err, res) {
                        if (err) res.json({ result: false, error: err });
                        db.close();
                    });
                    res.json({ result: true, error: "" })
                }
            });
        }
    });
});

module.exports = router;
