const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const pdfDoc = require('pdfkit');
path = require('path');  
const doc = new pdfDoc();
const fs = require('fs');
const {nodemail,test} = require('./mail.js');


const cors = require('cors');
app.use(cors({
    origin: 'https://serversiti.000webhostapp.com'
}));

// read static files
app.use(express.static('public'))

// receive post body data from index.html in the public folder
app.use(express.json({extended: true, limit: '1mb'}))



//app.use(bodyParser.urlencoded({extended: true}))
app.use('/input', express.static(__dirname + '/input'));
app.use('/export', express.static(__dirname + '/export'));

app.post('/pdf', function(req, res){

    createPdf(req).then(v => {
        res.redirect(v);
    })
});
app.get('/test', function(req, res){
    console.log("ciao");
    res.send("ok");
})

app.post('/savedata', async function(req, res) {

    let {nome = "", email = "", tel = "", termini = false} = req.body;
    
    let a = nome != "" ? true : false;
    let b = validateEmail(email) ? true : false;
    let c = (tel.length >= 9 && tel.length <= 10) ? true : false;;
    let d = termini;
    let arr = [a, b, c, d];
    
    let validData = validate( 
        (when) => {
            when( nome != ""), 
            when( validateEmail(email) ), 
            when( tel.length >= 9 && tel.length <= 10 ), 
            when(termini )
        }
    )
    let attach = [
        {
            filename: 'file.pdf',
            path: './public/mdp.pdf',
            contentType: 'application/pdf'
          }
    ]
    if(validData){
        try{
           //await  nodemail.sendMail("Marketing della Paura 😱 <emilio@emiliobonura.com>",email,"Marketing della paura!", `Ciao ${nome}, allegato a questa mail troverai il pdf completo`, "",attach);
        }catch(err){
            console.log(err);
            throw err;
        }
        //nodemail.sendMail("emilio@emiliobonura.com","emilio@emiliobonura.com","Iscrizione a marketint della paura", `L'utente ${nome} si è uscritti a marketing della paura con l'email ${email}, il suo numero è ${tel}`);
    }

    res.send(arr.toString());
});

const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};


function validate(block) {
    let isValid = true;

    function when(condition, fn){
        isValid = condition && isValid;
        if(condition && fn != null) fn;
    }

    block(when);

    return isValid;
}


function createPdf(req){
    return new Promise ( async (resolve, reject) => {
        let nome = req.body.nomeutente;
        try {
            doc.pipe(fs.createWriteStream('export/output.pdf'))
            .on('finish', function () {
                resolve('/export/output.pdf')
              });
        
            doc.image('./input/img.png', {
                fit: [413,600]
            });   
        
            doc.font('./fonts/Lato-Bold.ttf')
            .fontSize(10)
            .text(nome, 170, 128);

            doc.end();            

            

            } catch (error) {
                console.log(error);
                reject(error);
            }
        })
}

app.listen(8000, () =>{
    console.log(`http://localhost:8000`)
} );