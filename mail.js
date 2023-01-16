const nodemailer = require("nodemailer");
const sgMail = require('@sendgrid/mail')


const nodemail = {
    /*transporter: nodemailer.createTransport({
        host: "smtp-relay.sendinblue.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "lucadrago96@hotmail.com", // generated ethereal user
            pass: "6mw9h72Lz1p3dbFJ", // generated ethereal password
        },
    }),*/


    sendMail: async function (from, to, subject, text, html, attachments)  {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        console.log(process.env.SENDGRID_API_KEY)
        // send mail with defined transport object
        console.log("invio mail")
        const msg = {
            to: to, // Change to your recipient
            from: from, // Change to your verified sender
            subject: subject,
            text: text,
            html: html,
            attachments:attachments
          }

          console.log(to)
          sgMail
            .send(msg)
            .then(() => {
              console.log('Email sent')
            })
            .catch((error) => {
              console.error(error)
            })
    //    < let info = await this.transporter.sendMail({
    //         from: from, // sender address
    //         to: to, // list of receivers
    //         subject: subject, // Subject line
    //         text: text,
    //         html: html,
    //         attachments: attachments // plain text body
    //     });>
    

    }
}

const test = {
    test: function () {
        console.log("test");
    }
}

module.exports.test = test;
module.exports.nodemail = nodemail;