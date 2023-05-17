const UserModel = require("../models/UserModel");
const jwt = require('jsonwebtoken');

module.exports.getUser = async (req, res) => {
    const user = await UserModel.findOne({
        name: req.body.name,
        password: req.body.password,
    });

    if(user){
        const token = jwt.sign({
            name: user.name,
            password: user.password,
        }, 'machinetestsecrettoken', {expiresIn: '1d'});
        return res.json({status: 'ok', user: token})
    } else {
        return res.json({status: 'error', user: false})
    }
}

module.exports.getUserProfile = async (req, res) => {
    const { name } = req.body;
    const data = await UserModel.findOne({name: name});
    res.json(data);
}

module.exports.saveUser = async (req, res) => {
    
    const { name, password, address } = req.body;
    UserModel
        .create({ name, password, address })
        .then(()=> {res.json({status: 'ok'})})
        .catch((err)=> console.log(err));
}

module.exports.validate = async (req, res) => {
    
    const token = req.headers['x-access-token']

    try {
    const decoded = jwt.verify(token, 'machinetestsecrettoken')
    const name = decoded.name
    const user = await UserModel.findOne({name: name})
        if(user){
            return res.json({status: 'ok', valid: true});
        }

    }
    catch(error){
        res.json({status: 'error', error: 'invalid token'})
    }

}