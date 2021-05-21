const {Schema, model, Types} = require('mongoose')

const user = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, require: true},
    links: {type: Types.ObjectId, ref: 'User'}
})



module.exports = model('User', user)