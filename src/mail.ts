/// <reference path="../hera.d.ts" />

import * as nodemailer from 'nodemailer';
import rootPath from 'app-root-path';
import smtpTransport from 'nodemailer-smtp-transport';
require('dotenv').config({ path: `${rootPath.path}/.env` });

export class Mail {
    protected sender: string | undefined;
    constructor(Sender?: string) {
        if (Sender && !(Sender.match(/^[\w.+\-]+@gmail\.com$/i))) {
            throw new Error(`ERROR: Gmail account required`)
        }
        this.sender = Sender || process.env.MAIL_USERNAME;
    }

    Send(mail: Mailer.Options.Send): string {
        let sent: boolean = false;
        let transporter = nodemailer.createTransport(smtpTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            auth: {
                user: this.sender,
                pass: mail.password
            }
        }));
        const mailOptions: Mailer.Options.Constructor = {
            from: 'Collin Grimm', // TODO: Add options for custom name
            to: mail.recipient, // FIXME: Currently, if recipient's email is not gmail, the mail doesn't get delivered
            subject: mail.subject,
            text: mail.message,
            html: `<html><body><p> ${mail.message}</p></body></html>`
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info): boolean => {
            if (error) {
                throw new Error(error.message);
            }
            sent = true;
            return sent; //('Mail sent ✔');
        });
        if (sent) {
            return 'Mail sent ✔';
        }
        return 'Mail not sent'
    }
}
export default Mail;
