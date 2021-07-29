const nodemailer = require('nodemailer');
require('dotenv').config();


function sendEmail(email, token) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })

    link="http://localhost:3000/verify?token="+token;
    mailOptions={
        from: `${process.env.EMAIL}`,
        to: `${email}`,
        subject : "Please confirm your Email account",
        html : "Hello, Please Click on the link to verify your email."+link+">Click here to verify" 
    }
    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log('Error', err);
        } else {
            console.log('Berhasil', data);
        }
    })
}

module.exports = sendEmail;