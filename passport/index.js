const local = require('./localStrategy');
const jwt = require('./jwtStrategy');
const kakao = require('./kakaoStrategy');
const naver = require('./naverStrategy');
const facebook = require('./facebookStrategy');
const google = require('./googleStrategy');
// const { User } = require('../models');
 
module.exports = (passport) => {

    passport.serializeUser((user, done) => {
       // console.log("!!serializeUser:"+user);
        done(null, user);
    });
    
    passport.deserializeUser((id, done) => {
       // console.log("!!deserializeUser:"+user);
       done(null, id);
        
        // User.find({ where: { id } })
        //     .then(user => done(null, user))
        //     .catch(err => done(err));
    });   

    local(passport);
    jwt(passport);
    kakao(passport);
    naver(passport);
    facebook(passport);
    google(passport);

    
};
