var express = require('express');
var router = express.Router();
const { body, validationResult, check } = require('express-validator');
//for send email
'use strict';
const nodemailer = require('nodemailer');
const { render } = require('ejs');
//

router.post('/',[check("email","Please Input your email").not().isEmpty()], function(req, res, next) {
    const result = validationResult(req);
    var errors = result.errors;
    if (!result.isEmpty()) {
        res.json({result:false,error:errors})
    }
    else {
        var email = req.body.email
        var code = Math.floor(Math.random() * Math.floor(99999)).toString();
        send_email(req.body.email,code);
        module.exports.code = code;
        module.exports.email = req.body.email;
        res.json({result:true,error:""})
    }
});
module.exports = router;

function send_email(email,code){
    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
    // สร้างออปเจ็ค transporter เพื่อกำหนดการเชื่อมต่อ SMTP และใช้ตอนส่งเมล
    let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: { // ข้อมูลการเข้าสู่ระบบ
    user: 'brydetech@gmail.com', // email user ของเรา
    pass: 'brudabruda06' // email password
    }
    });
    // เริ่มทำการส่งอีเมล
    let info = await transporter.sendMail({
    from: 'brydetech@gmail.com', // อีเมลผู้ส่ง
    to: email,//,fairphare@gmail.com,owliang1234@gmail.com', // อีเมลผู้รับ สามารถกำหนดได้มากกว่า 1 อีเมล โดยขั้นด้วย ,(Comma)
    subject: 'Hello ✔', // หัวข้ออีเมล
    text: 'ส่งmailได้เเล้วววว', // plain text body
    html: '<b>ALMOST DONE!!</b><p>To reset your password, please use the verification code below.</p><b>VERIFICATION CODE:</b><p>'+code+'</p>' // html body
    });
    // log ข้อมูลการส่งว่าส่งได้-ไม่ได้
    console.log('Message sent: %s', info.messageId);
    }
    main().catch(console.error);  
};