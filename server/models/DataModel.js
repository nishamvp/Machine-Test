const mongoose = require('mongoose');

const dataSchema =  new mongoose.Schema({
    
    content: {
        type: String,
        require: true
    },

})

module.exports = mongoose.model("data", dataSchema)