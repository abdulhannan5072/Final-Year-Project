const {User} = require('../models/users');

let auth = function(req, res, next){
    let token = req.cookies.auth;
        // console.log(token);
    User.findByToken(token, (err, user)=>{
        if(err) throw err;
        if(!user) return res.json({
            isAuth: false
        });

        req.token = token;
        req.user = user;
        next();
    })
}

module.exports = {auth};        