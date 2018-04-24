const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
require('dotenv').config();

class mail {
    constructor(sender = `collins.geek@gmail.com`) {
        if (!(sender.match(/^[\w.+\-]+@gmail\.com$/i))) {
            return console.log(`ERROR: Gmail account required`)
        }
        this.sender = sender;
    }
    Send(recipient, subject, message, password) {
        nodemailer.createTestAccount((err, account) => {
            let transporter = nodemailer.createTransport(smtpTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                auth: {
                    user: this.sender,
                    pass: password
                }
            }));
            let mailOptions = {
                from: 'Collin Grimm',
                to: recipient,
                subject: subject,
                text: message,
                html: `<html><body><p> ${message}</p></body></html>`
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Mail sent ✔');
            });
        });
    }
}

module.exports = mail;