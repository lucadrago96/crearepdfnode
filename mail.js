const nodemailer = require("nodemailer");
const config = require('./config');


const nodemail = {
    transporter: nodemailer.createTransport({
        host: process.env.MAIL_HOST, //"smtp-relay.sendinblue.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.MAIL_USER, // generated ethereal user
            pass: process.env.KEY_SECRET, // generated ethereal password
        },
    }),


    sendMail: async function (from, to, subject, text, html, attachments) {
       
       
        // send mail with defined transport object
        console.log(process.env)
        console.log(config)
        console.log(process.env.MAIL_USER)
        console.log(process.env.KEY_SECRET)
        console.log(process.env.MAIL_HOST)
        console.log("invio mail")
        let info = await this.transporter.sendMail({
            from: from, // sender address
            to: to, // list of receivers
            subject: subject, // Subject line
            text: text,
            html: html,
            attachments: attachments // plain text body
        });
    
        console.log("Message sent: %s", info);

    }
}

const test = {
    test: function () {
        console.log("test");
    }
}

module.exports.test = test;
module.exports.nodemail = nodemail;