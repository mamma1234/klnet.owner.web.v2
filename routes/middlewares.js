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
    console.log("A.(middlewares.js) isLoggedPass:req.isAuthenticated():",req.isAuthenticated());
    next();

};




exports.verifyToken = (req, res, next) => {
    try {
        const clientToken = req.cookies.user;
        const decoded = jwt.verify(clientToken, JWT_SECRET_KEY);
        if (decoded) {
            res.locals.userId = decoded.user_id;
            next();
        } else {
            res.status(401).json({ error: 'unauthorized' });
        }
    } catch (err) {
        res.status(401).json({ error: 'token expired' });
    }
};
    
    