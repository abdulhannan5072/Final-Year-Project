const mongoose = require('mongoose');
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config').get(process.env.NODE_ENV);
const SALT_I = 10;

const userSchema = mongoose.Schema({
    email:{
        type: String,
        require: true,
        trim: true,
        unique: 1
    },
    password:{
        type: String,
        require: true,
        minlength: 8
    },
    username:{
        type: String,
        require: true,
        trim: true,
        unique: 1,
    },
    role:{
        type: Number,
        default: 0
    },
    token:{
        type: String
    }
})

userSchema.pre('save', function(next){

    var user = this;

        if(user.isModified('password') ){
            
            bycrypt.genSalt(SALT_I, (err,salt)=>{
                if(err) return next(err);

                bycrypt.hash(user.password,salt, (err,hash)=>{
                    if(err) return next(err);
                    
                    user.password = hash;
                    next();
                })
            })

        } else{
            next();
        }

})

userSchema.methods.comparingPassword = function(pass, callback){
    bycrypt.compare(pass, this.password, function(err, isMatch){
        if(err) return callback(err);
        callback(null, isMatch);
    })
}

userSchema.methods.generateToken = function(callback){
    var user = this;
    var token = jwt.sign(user._id.toHexString(), config.SECRET);
    user.token = token;
    
    user.save((err, user)=>{
        if (err) return callback(err);
        callback(null, user);
    })
}

userSchema.statics.findByToken = function(token, callback){
    var user = this;
    
    jwt.verify(token, config.SECRET, function(err, decode){
        user.findOne({"_id":decode, "token":token},function(err, user){
            if(err) return callback(err);
            callback(null, user)
        })
    })
}

userSchema.methods.deleteToken = function(token, callback){
    var user = this;

    user.update({$unset:{token:1}}, (err, user)=>{
        if(err) return callback(err);
        callback(null, user);
    })
}

const User = mongoose.model('User', userSchema);

module.exports = {User};