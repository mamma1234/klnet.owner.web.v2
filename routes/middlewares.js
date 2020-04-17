const sUser = require('../models/sessionUser');

const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
require('dotenv').config();



exports.isLoggedIn = (req, res, next) => {
   // console.log("(middlewares.js) isLoggedIn:req.isAuthenticated():".req.isAuthenticated());
	//console.log("(isLoggedIn middlewares.js)req.session.sUser:", req.session.sUser);
    if(req.isAuthenticated()) {
        console.log("로그인 완료");
        next();
    }
    else {
    //    res.redirect('/login');
        console.log("로그인 필요");
        res.status(403).send('로그인 필요');
    }
};
 
exports.isNotLoggedIn = (req, res, next) => {
    console.log("(middlewares.js) isNotLoggedIn:req.isAuthenticated():",req.isAuthenticated());
    console.log("(isNotLoggedIn middlewares.js) req.session.sUser:", req.session.sUser);
    if(!req.isAuthenticated()) {
        next();
    }
    else {
    	console.log(" no login");
        //res.redirect('/');
        next();
    }
};


exports.isLoggedPass = (req, res, next) => {
    // console.log("A.(middlewares.js) isLoggedPass:req.isAuthenticated():",req.isAuthenticated());
    console.log("(middlewares.js) isLoggedPass");
    next();
};




exports.isVerifyToken = (req, res, next) => {
    try {
        // console.log(req);

        // var AUTH_HEADER = "authorization",
        // LEGACY_AUTH_SCHEME = "JWT", 
        // BEARER_AUTH_SCHEME = 'bearer';
        
        // var extractors = {};
        let authorization;
        if (req.headers['authorization']) {
            authorization = req.headers['authorization'];
        }

        // console.log("req.headers", req.headers);
        console.log("authorization", authorization);

        const re = /(\S+)\s+(\S+)/;
        const matches = authorization.match(re);

        // console.log("matches[1]", matches[1]);
        // console.log("matches[2]", matches[2]);
        const clientToken = matches[2];
        console.log("clientToken", clientToken);
        // const clientToken = req.cookies.user;
        // console.log("(middlewares.js) isVerifyToken clientToken", clientToken);
        const decoded = jwt.verify(clientToken, JWT_SECRET_KEY);
        console.log("(middlewares.js) decoded", decoded);
        if (decoded) {
            // console.log("(middlewares.js) decoded.user_id", decoded.user_id)
            // res.locals.userId = decoded.user_id;
            console.log("(middlewares.js) decoded.userno", decoded.userno)
            sUser.userno = decoded.userno;
            req.session.sUser = sUser;
            next();
        } else {
            console.log("(middlewares.js) isVerifyToken unauthorized");
            res.status(401).json({ errorcode: 401, error: 'unauthorized' });
        }
    } catch (err) {
        console.log("(middlewares.js) isVerifyToken token expired");
        res.status(401).json({ errorcode: 401, error: 'token expired' });
    }
};
    
    