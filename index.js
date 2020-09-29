const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const pdfDoc = require('pdfkit');
path = require('path');  
const doc = new pdfDoc();
const fs = require('fs');



app.use(bodyParser.urlencoded({extended: true}))

app.use('/input', express.static(__dirname + '/input'));
app.use('/export', express.static(__dirname + '/export'));

app.post('/pdf', function(req, res){

    createPdf(req).then(v => {
        res.redirect(v);
    })
});

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