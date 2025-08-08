const express =  require('express');
const router = express.Router();
const gravator =require ('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');


const User = require('../../models/user');

router.get("/getusers", (req, res) => {
    User.find()
      .sort({ date: -1 })
      .then(users => res.json(users))
      .catch(err => res.status(404).json({ nousersfound: "No users found" }));
});

router.get("/getusers/:id", (req, res) => {
    User.findById(req.params.id)
      .then(user => 
        res.json(user)
        )
      .catch(err =>
        res.status(404).json({ nouserfound: "No user found with that ID" })
      );
  });

router.post('/register',(req,res) => {

    const { errors, isValid } = validateRegisterInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({email: req.body.email})
    .then(user => {
        if(user)
        {
            errors.email = 'Email already exists';
            return res.status(400).json({errors});
        }
        else
        {
            const avatar = gravator.url(req.body.email,{
                s:'200',
                r:'pg',
                d:'mm'
            })
            const newUser = new User
            (
                {
                    name: req.body.name,
                    email: req.body.email,
                    avatar: avatar,
                    password: req.body.password,
                }
            );

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                })
            })
        }   
    })
});
router.post('/login',(req,res) => {

    const { errors, isValid } = validateLoginInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email})
        .then(user =>{
            if(!user) {
                errors.email = 'User not found';
                return res.status(404).json(errors);
            }
            // console.log(user.id+user.name+user.avatar)
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch)
                    {
                        const payload = { id: user.id, name: user.name, avatar: user.avatar, role: user.role };
                        // const payload = { id: user.id, name: user.name};
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            {expiresIn: 3600 }, 
                            (err,token) => {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' +token
                                })

                        });
                    }
                    else {
                        errors.password = 'password incorect';
                        return res.status(400).json(errors);
                    }
                })
        })
})

router.delete(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        User.findOne({ user: req.user.id })
        .then(user => { user.remove().then(() => res.json({ success: true }))})
        .catch(err => res.status(404).json({ usernotfound: "No user found" }));
    }
);

router.get(
    '/current',
    passport.authenticate('jwt', { session: false }),
    (req,res) => {
        res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email,
            role: req.user.role
        });
    }
);

module.exports = router;