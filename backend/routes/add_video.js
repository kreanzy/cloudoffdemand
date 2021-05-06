var mongo = require("mongodb");
var express = require("express");
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://127.0.0.1:27017/";
const { body, validationResult, check } = require("express-validator");
var fs = require("fs");
var formidable = require("formidable");

/* GET home page. */

router.post("/", function (req, res, next) {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    const result = validationResult(fields);
    var errors = result.errors;
    if (!result.isEmpty()) {
        res.json({ result: false, error: errors })
    }
    else{
      MongoClient.connect(url, function (err, db) {
        if (err) {
          res.json({ result: false, error: err });
        } else {
          var dbo = db.db("BrydeTech");
          var video = [];
          var name = [];
          var size = [];
          var type = [];
          for (i = 0; i < fields["total_video"]; i++) {
            video.push(fs.readFileSync(files["attatch_video_" + i].path));
            name.push(fields["attatch_video_name_" + i]);
            size.push(fields["attatch_video_size_" + i]);
            type.push(fields["attatch_video_type_" + i]);
          }
          var id = new mongo.ObjectID(fields.id);
          var myquery = { _id: id };
          var newvalues = {
            $set: {
              video_buffer: video,
              video_name: name,
              video_size: size,
              video_type: type,
            },
          };
          dbo
            .collection("courses")
            .updateOne(myquery, newvalues, function (err, response) {
              if (err) {
                res.json({ result: false, error: err });
              } else {
                res.json({ result: true, error: "" });
              }
              db.close();
            });
        }
      });
    }
  });
});

module.exports = router;
