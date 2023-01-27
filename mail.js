const nodemailer = require("nodemailer");
const config = require('./config');
const axios = require('axios');


const sendTgMessage = (message) => {
    let tg = ` https://api.telegram.org/bot5602117403:AAECb8AKA8gDdugwF9XhGpy1GuKkpz-NZA4/sendMessage`;
    let body = {
        "chat_id": "-1001611634994",
        "text": message
    }


    console.log("dihsifoidsjufoised");
    axios.post(tg, body)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    return true;
}

const nodemail = {
    transporter: nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'smtpmailsender123@gmail.com',
            pass: 'iosonoLuca96!!'
        }
        /*host: process.env.MAIL_HOST, //"smtp-relay.sendinblue.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.MAIL_USER, // generated ethereal user
            pass: process.env.KEY_SECRET, // generated ethereal password
        },*/
    }),


    sendMail: async function (from, to, subject, text, html, attachments) {


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
module.exports.sendTgMessage = sendTgMessage;