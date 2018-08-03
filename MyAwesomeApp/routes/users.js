var express = require('express');
var nodemailer = require('nodemailer');
var transporter = require('nodemailer-smtp-transport');

var Datastore = require('@google-cloud/datastore');

 // Creates a client
const datastore = new Datastore({
  projectId: 'hawaiii-av',
  keyFilename: './.hawaiii-11b6e8b5cd9c.json'
});

// The kind for the new entity
const kind = 'hawaiiisens';
// The name/ID for the new entity
const name = 5639445604728832;
// The Cloud Datastore key for the new entity
const taskKey = datastore.key([kind, name]);

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
    let hostname, receiver, pass;

    datastore.get(taskKey
    , Promise.resolve()).then(results => {
        const entity = results[0];
        hostname = entity.HOSTNAME;
        receiver = entity.RECEIVER;
        pass = entity.PASSWORD;

        var smtpTransport2 = nodemailer.createTransport(
        transporter({
            service: 'gmail',
            host: 'smtp.gmail.com', 
            auth: {
                user: hostname,
                pass: pass
            }
        }));

        // Setup mail configuration
        var mailOptions = {
            from: hostname,
            to: receiver,
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

    }, err => {
        console.log(err);
    });
});

module.exports = router;
