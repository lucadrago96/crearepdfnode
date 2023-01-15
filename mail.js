const nodemailer = require("nodemailer");

const nodemail = {
    transporter: nodemailer.createTransport({
        host: "smtp-relay.sendinblue.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "lucadrago96@hotmail.com", // generated ethereal user
            pass: "6mw9h72Lz1p3dbFJ", // generated ethereal password
        },
    }),


    sendMail: async function (from, to, subject, text, html, attachments)  {
        // send mail with defined transport object
        console.log("invio mail")
        let info = await this.transporter.sendMail({
            from: from, // sender address
            to: to, // list of receivers
            subject: subject, // Subject line
            text: text,
            html: html,
            attachments: attachments // plain text body
        });
    
        console.log("Message sent: %s", info.messageId);

    }
}

const test = {
    test: function () {
        console.log("test");
    }
}

module.exports.test = test;
module.exports.nodemail = nodemail;