const mongoose = require('mongoose');


const data = new mongoose.Schema({
    data:{
        type:String,
        required: true
    },
    sito: {
        type:String,
        required: true
    }
});
module.exports = mongoose.model('Data',data);
