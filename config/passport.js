// const LocalStrategy = require("passport-local").strategy;
// const mongoose = require ("mongoose");


// const User = require("../models/User");

// module.exports = function(passport){
// passport.use(
//     new LocalStrategy({ usernameField: "email"},(email,password,done) => {
//         User.findOne({email: email})
//         .then(user=> {
//             if(!user){
//                 return done(null, false, {message: "email is not registered"});

//   }

//         })


//         .catch(err => console.log(err))
//     })
// )
// }