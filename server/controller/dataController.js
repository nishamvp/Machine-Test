const DataModel = require("../models/DataModel");

module.exports.saveData = async (req, res) => {
    
    const { content } = req.body;
    DataModel
        .create({ content })
        .then(()=> {res.json({status: 'ok'})})
        .catch((err)=> console.log(err));
}

module.exports.getData = async (req, res) => {
    DataModel.find({ })
        .then(()=> {res.json({success: true})})
        .catch((err)=> console.log(err));
}


