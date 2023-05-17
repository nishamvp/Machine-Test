const mongoose = require('mongoose');

const dataSchema =  new mongoose.Schema({
    
    content: {
        type: String,
        require: true
    },

    name: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model("data", dataSchema)