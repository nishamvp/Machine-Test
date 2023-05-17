const mongoose = require('mongoose');

const userSchema =  new mongoose.Schema({
    
    name: {
        type: String,
        require: true
    },
    
    password: {
        type: String,
        require: true
    },

    address: {
        type: String,
        require: true
    },

    file: {
        type: String,
        require: true
    },

})

module.exports = mongoose.model("User", userSchema)