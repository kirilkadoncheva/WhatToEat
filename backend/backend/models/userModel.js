const mongoose = require('mongoose');
const BCrypt = require('bcryptjs');
const JsonWebToken = require('jsonwebtoken');
const uniqueValidator = require('mongoose-unique-validator');
const SALT = 10;

const userSchema = new mongoose.Schema({
    id: {type: String, required: false},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    token: {type: String, required: false},
    avatar: {type: String, required: true},
    role: { 
        type: String,
        enum : ['user', 'administrator'],
        default: 'user'}
})

userSchema.pre('save', function(next) {
    let user = this;
    
    if(user.isModified('password')){
        let hashedPassword = BCrypt.hashSync(user.password, SALT);
        user.password = hashedPassword;
        next();
    } else{
        next();
    }
});

userSchema.pre('updateOne', function(next) {
    const data = this.getUpdate();
    
    if (data.password) {
        let hashedPassword = BCrypt.hashSync(data.password, SALT);
        data.password = hashedPassword;
        this.setUpdate(data);
        next();
    } else {
        next();
    }
});
userSchema.plugin(uniqueValidator, { message: 'Error, user email already exists.' });
// userSchema.virtual('id').get(function(){
//     return this._id.toHexString();
// });

// userSchema.set('toJSON', {
//     virtuals: true
// });
const userModel = new mongoose.model('User', userSchema);
module.exports = userModel;