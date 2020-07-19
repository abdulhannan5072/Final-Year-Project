const routes = require('express').Router();

const {User} = require('../models/users');

const {auth} = require('../middleware/auth');

//Get

//Post

routes.post('/api/signup', (req,res)=>{
    const user = new User(req.body)

    user.save( function(err,doc){
        if(err) return res.status(400).send(err);
        res.status(200).json({
            post: true,
            userId: doc
            
        })
    })
})
// //Update
// routes.post('/api/update',(req,res)=>
// {
//     User.findByIdAndUpdate(req.body.id, req.body, {new:true},
//          (err,doc)=>
//          {
//         if(err) return res.status(400).send(err);
//             res.status(200).send(doc);
//         })
// })

routes.post('/api/login', function(req,res){

    User.findOne({'email':req.body.email}, (err,user)=>{
        if(!user) return res.json({
            isAuth:false, message:'Email not found'
        }) 

        user.comparingPassword(req.body.password, (err, isMatch)=>{
            if (!isMatch) return res.send({
                isAuth: false,
                message: 'Wrong Password'
            })

            user.generateToken((err,user)=>{
                if (err) return res.status(400).send(err);
    
                res.cookie('auth',user.token).json({
                    isAuth: true,
                    userData: user
                })
                
            })

        })
        
    })

})




routes.get('/api/auth', auth, (req,res)=>{
    res.json({
        isAuth:true,
        token:req.token,
        userId:req.user._id,
        email:req.user.email,
        username:req.user.username,
        name: req.user.name
    });
})



routes.get('/api/logout', auth, (req, res)=>{
    req.user.deleteToken(req.token, (err,user)=>{
        if(err) return res.status(400).send(err);
        res.json({
            isAuth:false
        });
    });
});

//Update

//Delete



module.exports = routes;