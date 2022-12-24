var express = require("express");
var router = express.Router();

var User = require('../models/User');


// const { deleteOne } = require("../models/User");



router.get('/login',(req,res) =>{
    res.render('login')
});


router.get('/register',(req,res) =>{
    res.render('register')
});

router.post('/register', (req,res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];
  
    if (!name || !email || !password || !password2) {
      errors.push({ msg: 'Please enter all fields' });
    }
  
    if (password != password2) {
      errors.push({ msg: 'Passwords do not match' });
    }
  
    if (password.length < 6) {
      errors.push({ msg: 'Password must be at least 6 characters' });
    }
  
    if (errors.length > 0) {
      res.render('register', {
        errors,
        name,
        email,
        password,
        password2
      });
    } else {
      User.findOne({ email: email }).then(user => {
        if (user) {
          errors.push({ msg: 'Email already exists' });
          res.render('register', {
            errors,
            name,
            email,
            password,
            password2
          });
        } else {
          const newUser = new User({
            name,
            email,
            password
          });
  
          
              newUser.save()
                .then(user => {
                  req.flash('success_msg', 'You are now registered and can log in');
                  res.redirect('/users/login');
                })
                .catch(err => console.log(err));
           
         
        }
      });
    }
  });
 



  router.get('/dashbord', (req,res) => {
    res.render('dashbord')
});

router.post('/login' ,(req,res) => {
    const {email, password,} = req.body;
    // console.log(email)
    let errors = [];
    if (!email || !password ) {
        errors.push({ msg: 'Please enter all fields' });
      }
      if (errors.length > 0) {
        res.render('login', {
          errors,
          email,
          password,
        });
    }else{
        User.findOne({email:email})
        User.findOne({password:password}).then(user => {
            if(user){
            res.redirect('/a');
        }
        });
    }
        
});




router.get('/index',(req,res) =>{
    res.render('index')
});

module.exports = router;