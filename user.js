const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    surname:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    sito:{
        type:String,
        required: true
    },
    numero:{
        type:String,
        required: true
    },
});
module.exports = mongoose.model('User',userSchema);
