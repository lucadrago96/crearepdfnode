const mongoose = require('mongoose');


const Data = new mongoose.Schema({
    data:{
        type:String,
        required: true
    },
    sito: {
        type:String,
        required: true
    }
});
module.exports = mongoose.model('Data',userSchema);
