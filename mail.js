const nodemailer = require("nodemailer");

const nodemail = {
    transporter: nodemailer.createTransport({
        host: "smtp-relay.sendinblue.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "lucadrago96@hotmail.com", // generated ethereal user
            pass: "", // generated ethereal password
        },
    }),


    sendMail: async function (from, to, subject, text, html, attachments) {

        const mailjet = require('node-mailjet')
            .connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE)
        console.log(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE)
        const request = mailjet
            .post("send", { 'version': 'v3.1' })
            .request({
                "Messages": [
                    {
                        "From": {
                            "Email": from,
                        },
                        "To": [
                            {
                                "Email": to,
                            }
                        ],
                        "Subject": subject,
                        "TextPart": text,
                        "Attachments": attachments
                    }
                ]
            })
        request
            .then((result) => {
                console.log(result.body)
            })
            .catch((err) => {
                console.log(err.statusCode)
            })

        // send mail with defined transport object
        /*console.log("invio mail")
        let info = await this.transporter.sendMail({
            from: from, // sender address
            to: to, // list of receivers
            subject: subject, // Subject line
            text: text,
            html: html,
            attachments: attachments // plain text body
        });
    
        console.log("Message sent: %s", info.messageId);*/

    }
}

const test = {
    test: function () {
        console.log("test");
    }
}

module.exports.test = test;
module.exports.nodemail = nodemail;