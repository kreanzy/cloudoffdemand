var supertest = require("supertest");
var server = supertest.agent("http://localhost:4000");
var express = require("express");
var router = express.Router();
var should = require("should");
var register_data  = require('../routes/register.js');
var round_ = 7;


describe("Test Register System", function () {
  describe("Test Register API", function () {
    it("should respose without error", function (done) {
      server
        .post("/register")
        .send({
          username: "testUsername_"+round_.toString()+"re",
          password: "testUsername"+round_.toString()+"re",
          fname: "testFname"+round_.toString()+"re",
          lname: "lastName"+round_.toString()+"re",
          email: "testEmail"+round_.toString()+"re",
          ppnumber: "testPPnumber"+round_.toString()+"re",
          isTutor: true,
        })
        .expect("Content-type", /json/)
        .expect(200)
        .end(function (err, res) {
          //expect(res.status).to.equal(200);
          res.status.should.equal(200);
          res.body.error.should.equal("");
          res.body.result.should.equal(true);
          done();
        });
    });

    it("access other should return 400", function (done) {
      server
        .post("/register/random")
        .expect(404)
        .end(function (err, res) {
          res.status.should.equal(404);
          done();
        });
    });

    it("should ask for username", function (done) {
      server
        .post("/register")
        .send({
          username: "",
          password: "testUsername",
          fname: "testFname",
          lname: "lastName",
          email: "testEmail",
          ppnumber: "testPPnumber",
          isTutor: true,
        })
        .expect("Content-type", /json/)
        .expect(200)
        .end(function (err, res) {
          res.status.should.equal(200);
          res.body.error[0].msg.should.equal("Please enter username");
          res.body.result.should.equal(false);
          done();
        });
    });

    it("should ask for password", function (done) {
      server
        .post("/register")
        .send({
          username: "testUsername",
          password: "",
          fname: "testFname",
          lname: "lastName",
          email: "testEmail",
          ppnumber: "testPPnumber",
          isTutor: true,
        })
        .expect("Content-type", /json/)
        .expect(200)
        .end(function (err, res) {
          res.status.should.equal(200);
          res.body.error[0].msg.should.equal("Please enter password");
          res.body.result.should.equal(false);
          done();
        });
    });

    it("should ask for fname", function (done) {
      server
        .post("/register")
        .send({
          username: "testUsername",
          password: "fname",
          fname: "",
          lname: "lastName",
          email: "testEmail",
          ppnumber: "testPPnumber",
          isTutor: true,
        })
        .expect("Content-type", /json/)
        .expect(200)
        .end(function (err, res) {
          res.status.should.equal(200);
          res.body.error[0].msg.should.equal("Please enter fname");
          res.body.result.should.equal(false);
          done();
        });
    });

    it("should ask for lname", function (done) {
      server
        .post("/register")
        .send({
          username: "testUsername",
          password: "lastName",
          fname: "testFname",
          lname: "",
          email: "testEmail",
          ppnumber: "testPPnumber",
          isTutor: true,
        })
        .expect("Content-type", /json/)
        .expect(200)
        .end(function (err, res) {
          res.status.should.equal(200);
          res.body.error[0].msg.should.equal("Please enter lname");
          res.body.result.should.equal(false);
          done();
        });
    });

    it("should ask for email", function (done) {
      server
        .post("/register")
        .send({
          username: "testUsername",
          password: "email",
          fname: "testFname",
          lname: "lastName",
          email: "",
          ppnumber: "testPPnumber",
          isTutor: true,
        })
        .expect("Content-type", /json/)
        .expect(200)
        .end(function (err, res) {
          res.status.should.equal(200);
          res.body.error[0].msg.should.equal("Please enter email");
          res.body.result.should.equal(false);
          done();
        });
    });

    it("should ask for ppnumber", function (done) {
      server
        .post("/register")
        .send({
          username: "testUsername",
          password: "aaaaaa",
          fname: "testFname",
          lname: "lastName",
          email: "testEmail",
          ppnumber: "",
          isTutor: true,
        })
        .expect("Content-type", /json/)
        .expect(200)
        .end(function (err, res) {
          res.status.should.equal(200);
          res.body.error[0].msg.should.equal("Please enter ppnumber");
          res.body.result.should.equal(false);
          done();
        });
    });

    it("should ask for isTutor", function (done) {
      server
        .post("/register")
        .send({
          username: "testUsername",
          password: "password",
          fname: "testFname",
          lname: "lastName",
          email: "testEmail",
          ppnumber: "testPPnumber",
          isTutor: "",
        })
        .expect("Content-type", /json/)
        .expect(200)
        .end(function (err, res) {
          res.status.should.equal(200);
          res.body.error[0].msg.should.equal("Please enter isTutor");
          res.body.result.should.equal(false);
          done();
        });
    });

    it("should return error while username is existed", function (done) {
      server
        .post("/register")
        .send({
          username: "aaaa",
          password: "password",
          fname: "testFname",
          lname: "lastName",
          email: "testEmail",
          ppnumber: "testPPnumber",
          isTutor: true,
        })
        .expect("Content-type", /json/)
        .expect(200)
        .end(function (err, res) {
          res.status.should.equal(200);
          res.body.error.should.equal("U already have an account");
          res.body.result.should.equal(false);
          done();
        });
    });
  });

  describe("Test Verification API", function () {
    it("Should responce without error", (done) => {
      server
        .post("/register")
        .send({
          username: "testUsername"+round_.toString()+"0",
          password: "password",
          fname: "testFname",
          lname: "lastName",
          email: "testEmail"+round_.toString()+"0",
          ppnumber: "testPPnumber"+round_.toString()+"0",
          isTutor: true,
        })
        .expect("Content-type", /json/)
        .expect(200)
        .end(function (err, res) {
          res.status.should.equal(200);
          res.body.error.should.equal("");
          res.body.result.should.equal(true);
        });

      server
        .post("/verification")
        .send({
            code:"ZHeFFiSOGYfw9DzyNjCZAJ483cOFvlP1"
        })
        .expect("Content-type", /json/)
        .expect(200)
        .end(function (err, res) {
          res.status.should.equal(200);
          res.body.error.should.equal("");
          res.body.result.should.equal(true);
          done();
        });
        
    });

    it("Should return error with incorrect code", (done) => {
      server
        .post("/register")
        .send({
          username: "testUsername"+round_.toString()+"1",
          password: "password",
          fname: "testFname",
          lname: "lastName",
          email: "testEmail"+round_.toString()+"1",
          ppnumber: "testPPnumber"+round_.toString()+"1",
          isTutor: true,
        })
        .expect("Content-type", /json/)
        .expect(200)
        .end(function (err, res) {
          res.status.should.equal(200);
          res.body.error.should.equal("");
          res.body.result.should.equal(true);
        });

      server
        .post("/verification")
        .send({
            code:"aaaaaaaaaaa"
        })
        .expect("Content-type", /json/)
        .expect(200)
        .end(function (err, res) {
          res.status.should.equal(200);
          res.body.error.should.equal("Incorrect code");
          res.body.result.should.equal(false);
          done();
        });
    })

    it("Should ask for code", (done) => {
      server
        .post("/register")
        .send({
          username: "testUsername"+round_.toString()+"2",
          password: "password",
          fname: "testFname",
          lname: "lastName",
          email: "testEmail"+round_.toString()+"2",
          ppnumber: "testPPnumber"+round_.toString()+"2",
          isTutor: true,
        })
        .expect("Content-type", /json/)
        .expect(200)
        .end(function (err, res) {
          res.status.should.equal(200);
          res.body.error.should.equal("");
          res.body.result.should.equal(true);
        });

      server
        .post("/verification")
        .send({
            code:""
        })
        .expect("Content-type", /json/)
        .expect(200)
        .end(function (err, res) {
          res.status.should.equal(200);
          res.body.error[0].msg.should.equal("Please Input code");
          res.body.result.should.equal(false);
          done();
        });
    })
    
    it("Should not allow to another access", (done) => {
      server
        .post("/register")
        .send({
          username: "testUsername"+round_.toString()+"3",
          password: "password",
          fname: "testFname",
          lname: "lastName",
          email: "testEmail"+round_.toString()+"3",
          ppnumber: "testPPnumber"+round_.toString()+"3",
          isTutor: true,
        })
        .expect("Content-type", /json/)
        .expect(200)
        .end(function (err, res) {
          res.status.should.equal(200);
          res.body.error.should.equal("");
          res.body.result.should.equal(true);
        });

        server
        .post("/verification/random")
        .expect(404)
        .end(function (err, res) {
          res.status.should.equal(404);
          done();
        });
    })

  });
});
