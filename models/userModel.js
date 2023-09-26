const {model, Schema} = require('mongoose');

const schema = new Schema({
    username: {
        type:String,
        required:true,
        unique:true
    },
    email: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true,
    }
})

const userModel = model('users', schema,);
module.exports = userModel;