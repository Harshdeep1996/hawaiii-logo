var express = require('express');
var nodemailer = require('nodemailer');
var transporter = require('nodemailer-smtp-transport'); 

var router = express.Router();

function returnEmailTemplate(req) {
  return (
    `Hello, this is a query from the Hawaiii Platform \n\n
    The customer details are as follows:\n\n
    Charter required from:  ${req.body.from}\n
    Charter required to:  ${req.body.to}\n
    Is this an air ambulance case?:  ${req.body.airAmbChecked}\n
    Total Number of passengers:  ${req.body.numberPassengers}\n
    Type of medical emergency:  ${req.body.medicalEmergencyType}\n
    Date and time of the booking:  ${req.body.dateTimeBooking}\n
    Customer's contact number is:  ${req.body.phone}\n
    \n\nPlease handle this query at the earliest. Good luck.\n\nHawaiii Website.`
  );
}

router.post('/', function(req, res, next) {
    var smtpTransport2 = nodemailer.createTransport(
        transporter({
            service: 'gmail',
            host: 'smtp.gmail.com', 
            auth: {
                user: process.env.HOSTNAME,
                pass: process.env.PASSWORD
        }
    }));

    // Setup mail configuration
    var mailOptions = {
        from: process.env.HOSTNAME,
        to: process.env.RECEIVER,
        subject: 'Charter Query',
        text: returnEmailTemplate(req)
    };

    // send mail
    smtpTransport2.sendMail(mailOptions, function(error, info) {
        if (error) {
            return res.send(error);
        } else {
            console.log('Message %s sent: %s', info.messageId, info.response);
            return res.send({
                status: 'ok',
                msg: 'Email sent'
            })
        }
        smtpTransport.close();
    });
});

module.exports = router;
