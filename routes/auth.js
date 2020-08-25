const express = require('express');
const pgSql = require('../database/postgresql/users');
const passport = require('passport');
const crypto = require('crypto');
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { isLoggedPass } = require('./middlewares');
const pgsqlPool = require("../database/pool.js").pgsqlPool
const oraclePool = require("../database/pool.js").oraclePool
 const router = express.Router();
let requestIp = require('request-ip');
require('dotenv').config();

//console.log("1.router path:",router.patch);

/*router.post('/join', isLoggedPass, async (req, res, next) => {
	console.log("express:",req.body);
    const { email, password, signgb, name, phone, company } = req.body;
    try {
        const exUser = await User.find({ where: { email } });
        if(exUser) {
            req.flash('joinError', '이미 가입된 이메일입니다.');
            return res.redirect('/join');
        }
    
        // const hash = await bcrypt.hash(password, 12);
        const hash = password;
        await User.create({
            email,
            nick,
            password: hash,
        });
        return res.redirect('/');
    } catch(error) {
        console.error(error);
        return next(error);
    }            
});*/

router.get('/api',  function (req, res) {
	//console.log("express:",req.body);
    
    console.log("join body value:",req.query.api_key);
    var token='';
    if(req.query.key) {
    const sql = {
	        text: "SELECT * FROM OWN_COMP_USER where api_service_key=$1 limit 1 ",
	        values: [ req.query.key],
	        //rowMode: 'array',
	    }
    console.log(sql);
    pgsqlPool.connect(function(err,conn) {
        if(err){
            console.log("err" + err);
        }
        conn.query(sql, function(err,result){
            
            if(err){
                console.log(err);
            }
            console.log("ROW CNT:",result.rowCount);
            
            if(result.rowCount > 0) {
            	//console.log("result",result);
            	token = jwt.sign({userno:result.rows.user_no}, process.env.JWT_SECRET_KEY, { expiresIn : '1h'});
            	return res.json({token:token});
            } else {
            	return res.json({err: 'No mached Api Key exists.'});
            }
        });
    });
    } else {
    	return res.json({err: 'Api key Required value.'});
    }
});

router.post('/dupcheck', async (req, res) => {
	console.log("express:",req.body);

    console.log("dup");
    
	const sql = {
	        text: "SELECT * FROM OWN_COMP_USER where upper(local_id) = upper($1)  and local_id is not null limit 1 ",
	        values: [ req.body.id],
	        //rowMode: 'array',
	    }
    console.log(sql);
    pgsqlPool.connect(function(err,conn) {
        if(err){
            console.log("err" + err);
        }
        conn.query(sql, function(err,result){
            
            if(err){
                console.log(err);
            }

            console.log("ROW CNT:",result.rowCount);
            if(result.rowCount <= 0) {
            	 return res.status(200).send();
            } else {
            	 return res.status(404).send();
            }
        });
    });
   
});

router.post('/join', isLoggedPass, async (req, res, next) => {
	//console.log("express:",req.body);
    const { id, password, name, phone, company ,provider,kakaoid,tokenkakao,naverid,tokennaver,faceid,tokenface,googleid,tokengoogle} = req.body;
    console.log("join body value:",req.body);

    passport.authenticate('localjoin',{session: false},(authError, user, info) => {
    	
        console.log("sign authError:",authError,",user:",user,",info:",info);
        
        if(authError) {
            console.error("authError", authError);
            return next(authError);
        }
        
        if(info){
            console.log("!info", info);
            // req.flash('loginError', info.message);
            // return res.redirect('/');
            // return res.status(200).json(info);
            return res.status(500).send(info.message );
            
        }
        
        if(!user){
            console.log("!user", user);
            // req.flash('loginError', info.message);
            // return res.redirect('/');
            // return res.status(200).json(info);
            return res.status(500).send(info.message);
            
        }

        
        const token = jwt.sign({userno:user.userno}, process.env.JWT_SECRET_KEY, { expiresIn : '1h', });
        //토큰 저장
        console.log("token db save: ", token);
        pgSql.setUserToken(user, token);
        //console.log("token value:"+token);
        /*//res.clearCookie('connect.sid',{ path: '/' });
        res.clearCookie('connect.userno',{ path: '/' });
        res.cookie("connect.sid",token);
        res.cookie("connect.userno",user.userno);*/
        return res.json({user:user, token:token});
        //return res.json(user);
    })(req, res, next)  //미들웨어 내의 미들웨어에는 (req, res, next)를 붙인다.
});



router.get('/user', isLoggedPass, (req, res, next) => {
    console.log("(auth.js) req.isAuthenticated():", req.isAuthenticated());
    passport.authenticate('jwt',{session: false},(authError, user, info) => {
        console.log("authError:",authError,",user:",user,",info:",info);
        
        if(authError) {
            console.error("authError", authError);
            return next(authError);
        }
        if(!user){
            console.log("!user", user);
            req.session = null;
            // req.flash('loginError', info.message);
            // return res.redirect('/');
            // return res.status(401).json(info);
            //return res.status(401).json({ errorcode: 401, error: 'unauthorized' });
            return res.status(401).json({ errorcode: 401, error: info.message });
        }

        return req.login(user,(loginError) => {
            //console.log("user", user);

            if(loginError) {
                console.error("loginError", loginError);
                return next(loginError);
            }
            req.session.sUser = user;
            // res.status(200).json(user);
            // return;

            //return res.json({user:user});
            //토큰 발행
            const token = jwt.sign({userno:user.userno}, process.env.JWT_SECRET_KEY, { expiresIn : '1h', });
            //토큰 저장
            console.log("token db save: ", token);
            pgSql.setUserToken(user, token);
            //console.log("token value:"+token);
            /*//res.clearCookie('connect.sid',{ path: '/' });
            res.clearCookie('connect.userno',{ path: '/' });
            res.cookie("connect.sid",token);
            res.cookie("connect.userno",user.userno);*/
            return res.json({user:user, token:token});
        });
    })(req, res, next)  //미들웨어 내의 미들웨어에는 (req, res, next)를 붙인다.
});



router.post('/login', isLoggedPass, (req, res, next) => {
    console.log("(auth.js) req.isAuthenticated():", req.isAuthenticated());
    
    passport.authenticate('local',{session: false},(authError, user, info) => {
        console.log("authError:",authError,",user:",user,",info:",info);
        console.log("2(auth.js) req.isAuthenticated():", req.isAuthenticated());
        if(authError) {
            console.error("authError", authError);
            return next(authError);
        }
        if(!user){
            console.log("!user", user);
            // req.flash('loginError', info.message);
            // return res.redirect('/');
            // return res.status(200).json(info);
            return res.status(401).json({ errorcode: 401, error: info.message });
            
        }

        return req.login(user,(loginError) => {
            console.log("user=====", user);

            if(loginError) {
                console.error("loginError", loginError);
                return next(loginError);
            }

            // return res.redirect('/');
            //res.status(200).json(user);
            //return;
            //return res.redirect('http://localhost:3000');
            //console.log("log:",user.userno);
            //토큰 발행
            const token = jwt.sign({userno:user.userno}, process.env.JWT_SECRET_KEY, { expiresIn : '1h', });
            //토큰 저장
            //var ipaddr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            var ipaddr = requestIp.getClientIp(req);
           // console.log("ip1:",req.headers['x-forwarded-for']);
           // console.log("ip2:",requestIp.getClientIp(req));
            
            pgSql.setUserToken(user, token);
            pgSql.setLoginHistory(user.userno,'I',req.useragent, ipaddr);
            
            
            //console.log("token value:"+token);
            /*res.cookie("connect.sid",token);
            res.cookie("connect.userno",user.userno);*/
            return res.json({user:user, token:token});

        });
    })(req, res, next)  //미들웨어 내의 미들웨어에는 (req, res, next)를 붙인다.
});



// kakao 로그인
router.get('/login/kakao',
		  passport.authenticate('kakao')
		);

router.get('/kakao/callback', isLoggedPass, (req, res,next) => {
    
    console.log("(auth.js) /kakao/callback:req.isAuthenticated():", req.isAuthenticated());

    passport.authenticate('kakao', (authError, user, info) => {
        console.log("authError:",authError,",user:",user,",info:",info);
        if(authError) {
            console.error("authError", authError);
            return next(authError);
        }
        if(info) {
        	//res.cookie("plismplus",{user:user});
        	return res.redirect('/authpage?auth=register');
        	//return res.redirect('http://localhost:3000/landing');
        }
        if(!user){
            console.log("!user", user);
            // req.flash('loginError', info.message);
            // return res.redirect('/');
            // return res.status(200).json(info);
            return res.status(405).json({ errorcode: 405, error: 'unauthorized' });
            
        }        
        return req.login(user, (loginError) => {
            
            if(loginError) {
                console.error("loginError", loginError);
              //  return next(loginError);
            }
            //console.log("http://localhost:3000 redirect");
            //return res.redirect('http://localhost:3000');
            // res.status(200).json(user);
            // return;

            // const token = jwt.sign(user.userid, process.env.JWT_SECRET_KEY);

            const token = jwt.sign({userno:user.userno}, process.env.JWT_SECRET_KEY, { expiresIn : '1h', });
            //토큰 저장
            res.cookie("plismplus",{user:user, token:token});
            pgSql.setSocialLoginInfo(user.provider,user.userid, token , user.accessToken);
            //var ipaddr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            var ipaddr = requestIp.getClientIp(req);
            pgSql.setLoginHistory(user.userno,'I',req.useragent, ipaddr);
            return res.redirect('/authpage?auth=social');
            //res.cookie("connect.sid",token);
            // res.cookie("connect.user",user);
            //res.cookie("connect.userno",user.userno);
            //return res.redirect('http://localhost:3000/landing?provider=kakao');
            //res.json({user:user, token:token});
           // return res.redirect('/landing');
          //  return res.redirect('http://'+req.headers.host);
        });
    })(req, res,next)  //미들웨어 내의 미들웨어에는 (req, res, next)를 붙인다.
});


// kakao 로그인 연동 콜백
// router.get('/kakao/callback',
//   passport.authenticate('kakao', {
//     successRedirect: '/',
//     failureRedirect: '/login'
//   })
// );

// router.get('/login/kakao/callback', 
//     passport.authenticate('kakao', {
//         failureRedirect: '/',
//     }), 
//     (req, res) => {
//         res.redirect('/');
//     }
// );


// // naver 로그인
// router.get('/auth/login/naver',
//   passport.authenticate('naver')
// );
// // naver 로그인 연동 콜백
// router.get('/auth/login/naver/callback',
//   passport.authenticate('naver', {
//     successRedirect: '/',
//     failureRedirect: '/login'
//   })
// );


router.get('/naver/callback', isLoggedPass, (req, res, next) => {
    
    console.log("(auth.js) /naver/callback:req.isAuthenticated():", req.isAuthenticated());
    
    passport.authenticate('naver', (authError, user, info) => {
        console.log("authError:",authError,",user:",user,",info:",info);
        if(authError) {
            console.error("authError", authError);
            return next(authError);
        }
        if(info) {
        	//res.cookie("plismplus",{user:user});
        	return res.redirect('/authpage?auth=register');
        	//return res.redirect('http://localhost:3000/landing');

        }
        
    
        if(!user){
            console.log("!user", user);
            // req.flash('loginError', info.message);
            return res.redirect('http://localhost:3000/login');

            // res.status(200).json(info);
            // return;
        }
        return req.login(user, (loginError) => {
            console.log("user", user);
            if(loginError) {
                console.error("loginError", loginError);
                return next(loginError);
            }
            //res.json({user:user});
            //console.log("http://localhost:3000 redirect");
            //console.log("|||:",res);
            
            const token = jwt.sign({userno:user.userno}, process.env.JWT_SECRET_KEY, { expiresIn : '1h', });
            //토큰 저장
            res.cookie("plismplus",{user:user, token:token});
            pgSql.setSocialLoginInfo(user.provider,user.userid, token, user.accessToken);
            //var ipaddr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            var ipaddr = requestIp.getClientIp(req);
            pgSql.setLoginHistory(user.userno,'I',req.useragent, ipaddr);
            return res.redirect('/authpage?auth=check');
            //return res.redirect('http://localhost:3000');
            // res.status(200).json(user);
            // return;
        });
    })(req, res, next)  //미들웨어 내의 미들웨어에는 (req, res, next)를 붙인다.
});

// // facebook 로그인
// router.get('/auth/login/facebook',
//   passport.authenticate('facebook')
// );
// // facebook 로그인 연동 콜백
// router.get('/auth/login/facebook/callback',
//   passport.authenticate('facebook', {
//     successRedirect: '/',
//     failureRedirect: '/login'
//   })
// );
router.get('/facebook/callback', isLoggedPass, (req, res, next) => {
    
    console.log("(auth.js) /facebook/callback:req.isAuthenticated():", req.isAuthenticated());
    
    passport.authenticate('facebook', (authError, user, info) => {
        console.log("authError:",authError,",user:",user,",info:",info);
        if(authError) {
            console.error("authError", authError);
            return next(authError);
        }
        if(info) {
        	//res.cookie("plismplus",{user:user});
        	return res.redirect('/authpage?auth=register');
        	//return res.redirect('http://localhost:3000/landing');

        }
        if(!user){
            console.log("!user", user);
            // req.flash('loginError', info.message);
            return res.redirect('http://localhost:3000/login');

            // res.status(200).json(info);
            // return;
        }
        return req.login(user, (loginError) => {
            console.log("user", user);
            if(loginError) {
                console.error("loginError", loginError);
                return next(loginError);
            }
            const token = jwt.sign({userno:user.userno}, process.env.JWT_SECRET_KEY, { expiresIn : '1h', });
            //토큰 저장
            res.cookie("plismplus",{user:user, token:token});
            pgSql.setSocialLoginInfo(user.provider,user.userid, token ,user.accessToken);
            //var ipaddr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            var ipaddr = requestIp.getClientIp(req);
            pgSql.setLoginHistory(user.userno,'I',req.useragent, ipaddr);
            return res.redirect('/authpage?auth=social');
           // console.log("http://localhost:3000 redirect");
           // return res.redirect('http://localhost:3000');
            // res.status(200).json(user);
            // return;
        });
    })(req, res, next)  //미들웨어 내의 미들웨어에는 (req, res, next)를 붙인다.
});

router.get('/google/callback', isLoggedPass, (req, res, next) => {
    
    console.log("(auth.js) /google/callback:req.isAuthenticated():", req.isAuthenticated());
    
    passport.authenticate('google', (authError, user, info) => {
        console.log("authError:",authError,",user:",user,",info:",info);
        
        if(authError) {
            console.error("authError", authError);
            return next(authError);
        }

        if(info.message != undefined) {
        	//console.log("info");
        	//res.cookie("plismplus",{user:user});
        	return res.redirect('/authpage?auth=register');
        	//return res.redirect('http://localhost:3000/landing');
        }

        return req.login(user, (loginError) => {
            console.log("user", user);
            if(loginError) {
                console.error("loginError", loginError);
                return next(loginError);
            }
            const token = jwt.sign({userno:user.userno}, process.env.JWT_SECRET_KEY, { expiresIn : '1h', });
            //토큰 저장
            res.cookie("plismplus",{user:user, token:token});
            pgSql.setSocialLoginInfo(user.provider,user.userid, token, user.accessToken);
            //var ipaddr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            var ipaddr = requestIp.getClientIp(req);
            pgSql.setLoginHistory(user.userno,'I',req.useragent, ipaddr);
            return res.redirect('/authpage?auth=social');
            //res.redirect('http://localhost:3000');
            //res.status(200).send(user);
            //console.log(user);
           // console.log("http://localhost:3000 redirect");
            //return res.redirect('http://localhost:3000');
            
             return;
        });
    })(req, res, next)  //미들웨어 내의 미들웨어에는 (req, res, next)를 붙인다.
});


router.get('/openbank/callback', isLoggedPass, (req, res, next) => {
    
    console.log("(auth.js) /openbank/callback:req.isAuthenticated():", req.isAuthenticated());
    
    passport.authenticate('openbank', (authError, user, info) => {
        console.log("authError:",authError,",user:",user,",info:",info);
        if(authError) {
            console.error("authError", authError);
            return next(authError);
        }
        if(info) {
        	//res.cookie("plismplus",{user:user});
        	return res.redirect('/authpage?auth=register');
        	//return res.redirect('http://localhost:3000/landing');

        }
        if(!user){
            console.log("!user", user);
            // req.flash('loginError', info.message);
            return res.redirect('http://localhost:3000/login');

            // res.status(200).json(info);
            // return;
        }
        return req.login(user, (loginError) => {
            console.log("user", user);
            if(loginError) {
                console.error("loginError", loginError);
                return next(loginError);
            }
            console.log("http://localhost:3000 redirect");
            return res.redirect('/authpage?auth=social');
            // res.status(200).json(user);
            // return;
        });
    })(req, res, next)  //미들웨어 내의 미들웨어에는 (req, res, next)를 붙인다.
});


router.get('/microsoft/callback', isLoggedPass, (req, res, next) => {
    
    console.log("(auth.js) /microsoft/callback:req.isAuthenticated():", req.isAuthenticated());
    
    passport.authenticate('microsoft', (authError, user, info) => {
        console.log("authError:",authError,",user:",user,",info:",info);
        if(authError) {
            console.error("authError", authError);
            return next(authError);
        }
        if(info) {
        	//res.cookie("plismplus",{user:user});
        	return res.redirect('/authpage?auth=register');
        	//return res.redirect('http://localhost:3000/landing');

        }
        if(!user){
            console.log("!user", user);
            // req.flash('loginError', info.message);
            return res.redirect('http://localhost:3000/login');

            // res.status(200).json(info);
            // return;
        }
        return req.login(user, (loginError) => {
            console.log("user", user);
            if(loginError) {
                console.error("loginError", loginError);
                return next(loginError);
            }
            console.log("http://localhost:3000 redirect");
            return res.redirect('/authpage?auth=social');
            // res.status(200).json(user);
            // return;
        });
    })(req, res, next)  //미들웨어 내의 미들웨어에는 (req, res, next)를 붙인다.
});


router.get('/daum/callback', isLoggedPass, (req, res, next) => {
    
    console.log("(auth.js) /daum/callback:req.isAuthenticated():", req.isAuthenticated());
    
    passport.authenticate('daum', (authError, user, info) => {
        console.log("authError:",authError,",user:",user,",info:",info);
        if(authError) {
            console.error("authError", authError);
            return next(authError);
        }
        if(info) {
        	res.cookie("plismplus",{profile:user});
        	return res.redirect('/authpage?auth=register');
        	//return res.redirect('http://localhost:3000/landing');

        }
        if(!user){
            console.log("!user", user);
            // req.flash('loginError', info.message);
            return res.redirect('http://localhost:3000/login');

            // res.status(200).json(info);
            // return;
        }
        return req.login(user, (loginError) => {
            console.log("user", user);
            if(loginError) {
                console.error("loginError", loginError);
                return next(loginError);
            }
            console.log("http://localhost:3000 redirect");
            return res.redirect('/authpage?auth=social');
            // res.status(200).json(user);
            // return;
        });
    })(req, res, next)  //미들웨어 내의 미들웨어에는 (req, res, next)를 붙인다.
});



router.get('/twitter/callback', isLoggedPass, (req, res, next) => {
    
    console.log("(auth.js) /twitter/callback:req.isAuthenticated():", req.isAuthenticated());
    
    passport.authenticate('twitter', (authError, user, info) => {
        console.log("authError:",authError,",user:",user,",info:",info);
        if(authError) {
            console.error("authError", authError);
            return next(authError);
        }
        if(!user){
            console.log("!user", user);
            // req.flash('loginError', info.message);
            return res.redirect('http://localhost:3000/login');

            // res.status(200).json(info);
            // return;
        }
        return req.login(user, (loginError) => {
            console.log("user", user);
            if(loginError) {
                console.error("loginError", loginError);
                return next(loginError);
            }
            console.log("http://localhost:3000 redirect");
            return res.redirect('/authpage?auth=social');
            // res.status(200).json(user);
            // return;
        });
    })(req, res, next)  //미들웨어 내의 미들웨어에는 (req, res, next)를 붙인다.
});


router.get('/cognito/callback', isLoggedPass, (req, res, next) => {
    
    console.log("(auth.js) /cognito/callback:req.isAuthenticated():", req.isAuthenticated());
    
    passport.authenticate('cognito', (authError, user, info) => {
        console.log("authError:",authError,",user:",user,",info:",info);
        if(authError) {
            console.error("authError", authError);
            return next(authError);
        }
        if(!user){
            console.log("!user", user);
            // req.flash('loginError', info.message);
            return res.redirect('http://localhost:3000/login');

            // res.status(200).json(info);
            // return;
        }
        return req.login(user, (loginError) => {
            console.log("user", user);
            if(loginError) {
                console.error("loginError", loginError);
                return next(loginError);
            }
            console.log("http://localhost:3000 redirect");
            return res.redirect('http://localhost:3000');
            // res.status(200).json(user);
            // return;
        });
    })(req, res, next)  //미들웨어 내의 미들웨어에는 (req, res, next)를 붙인다.
});


router.get('/instagram/callback', isLoggedPass, (req, res, next) => {
    
    console.log("(auth.js) /instagram/callback:req.isAuthenticated():", req.isAuthenticated());
    
    passport.authenticate('instagram', (authError, user, info) => {
        console.log("authError:",authError,",user:",user,",info:",info);
        if(authError) {
            console.error("authError", authError);
            return next(authError);
        }
        if(!user){
            console.log("!user", user);
            // req.flash('loginError', info.message);
            return res.redirect('http://localhost:3000/login');

            // res.status(200).json(info);
            // return;
        }
        return req.login(user, (loginError) => {
            console.log("user", user);
            if(loginError) {
                console.error("loginError", loginError);
                return next(loginError);
            }
            console.log("http://localhost:3000 redirect");
            return res.redirect('http://localhost:3000');
            // res.status(200).json(user);
            // return;
        });
    })(req, res, next)  //미들웨어 내의 미들웨어에는 (req, res, next)를 붙인다.
});

router.get('/linkedin/callback', isLoggedPass, (req, res, next) => {
    
    console.log("(auth.js) /linkedin/callback:req.isAuthenticated():", req.isAuthenticated());
    
    passport.authenticate('linkedin', (authError, user, info) => {
        console.log("authError:",authError,",user:",user,",info:",info);
        if(authError) {
            console.error("authError", authError);
            return next(authError);
        }
        if(!user){
            console.log("!user", user);
            // req.flash('loginError', info.message);
            return res.redirect('http://localhost:3000/login');

            // res.status(200).json(info);
            // return;
        }
        return req.login(user, (loginError) => {
            console.log("user", user);
            if(loginError) {
                console.error("loginError", loginError);
                return next(loginError);
            }
            console.log("http://localhost:3000 redirect");
            return res.redirect('http://localhost:3000');
            // res.status(200).json(user);
            // return;
        });
    })(req, res, next)  //미들웨어 내의 미들웨어에는 (req, res, next)를 붙인다.
});

// router.post('/login', isNotLoggedIn, (req, res, next) => {
//     passport.authenticate('local', (authError, user, info) => {
//         if(authError) {
//             console.error(authError);
//             return next(authError);
//         }
//         if(!user){
//             req.flash('loginError', info.message);
//             return res.redirect('/');
//         }
//         return req.login(user, (loginError) => {
//             if(loginError) {
//                 console.error(loginError);
//                 return next(loginError);
//             }
//             return res.redirect('/');
//         });
//     })(req, res, next)  //미들웨어 내의 미들웨어에는 (req, res, next)를 붙인다.
// });
 
router.get('/logout',  function (req, res) {
  //console.log(">>>>>LOG OUT SERVER");
  
  let authorization;
  if (req.headers['authorization']) {
      authorization = req.headers['authorization'];
  }
 // console.log("authorization", authorization);
 // const re = /(\S+)\s+(\S+)/;
 // const matches = authorization.match(re);
 // const clientToken = matches[2];
//   jwt.destroy(clientToken);
//   db.update token clear
  //console.log("session:",req.session.sUser);
  //var ipaddr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  var ipaddr = requestIp.getClientIp(req);

  //pgSql.setLoginHistory(req.session.sUser.userno,'O',req.useragent,ipaddr);
  req.session.sUser = null;
  req.session = null;
  req.logout();
 // res.clearCookie('connect.sid',{ path: '/' });
  res.clearCookie('express:sess',{ path: '/' });
  res.clearCookie('express:sess.sig',{ path: '/' });
  console.log(":>>>");
  res.send(false);
    
});
 
router.post('/userfinder', async (req, res) => {
	console.log("express:",req.body);

    console.log("finder");
    

	let sql = "SELECT user_no,local_id as origin_local_id,Rpad(substr(local_id,'1','3'),length(local_id),'*') as local_id, to_char(insert_date,'YYYY-MM-DD') as insert_date, \n";
	    sql +=" substr(user_phone,'1','3')||'-'||substr(user_phone,'4','2')||'**-'|| substr(user_phone,'8','2')||'**' as user_phone,user_phone as origin_user_phone \n";
	    sql +=" FROM OWN_COMP_USER where upper(user_phone) = upper('"+req.body.phone+"')  and user_name = '"+req.body.name+"' \n";
	    if (req.body.gb == "C") {
	    	sql += "and certify_num = '"+req.body.certify+"'";
	    }
	
	
	
    console.log(sql);
    pgsqlPool.connect(function(err,conn) {
        if(err){
            console.log("err" + err);
        }
        conn.query(sql, function(err,result){
            
            if(err){
                console.log(err);
            }

            console.log("ROW CNT:",result.rowCount);
            if(result.rowCount > 0) {
            	if(req.body.gb == "S") {
            		setSmsKey( req, res ,  result.rows);
            	} else if(req.body.gb == "R") {
            		resetKey( req, res ,  result.rows);
            	} else {
            		return res.status(200).send(result.rows);
            	}
            	 
            } else {
            	 return res.status(404).send();
            }
        });
    });
   
});

const setSmsKey = (request, response,user_data) => {
	console.log("certi2");
	let sql = "update  OWN_COMP_USER set certify_num = Rpad(trim(to_char(floor(random()*9999),'9999')),4,'0'),certify_date=now() \n";
	   sql += " where user_no = '"+user_data[0].user_no+"' \n";
	          
 console.log ("query:" +sql);

	   pgsqlPool.connect(function(err,conn) {
     if(err){
         console.log("err" + err);
         response.status(400).send(err);
     }

     conn.query(sql, function(err,result){
         if (err) {
             response.status(400).json({ "error": error.message });
             return;
         }
         if(result.rowCount > 0) {
        	 console.log("certi3");
        	 const sql2 = " select certify_num from OWN_COMP_USER where user_no ='"+user_data[0].user_no+"'";
        	 
        	 pgsqlPool.connect(function(err,conn) {
        	     if(err){
        	         console.log("err" + err);
        	         response.status(400).send(err);
        	     }

        	     conn.query(sql2, function(err,result){
        	         if (err) {
        	             response.status(400).json({ "error": error.message });
        	             return;
        	         }
        	         if(result.rowCount > 0) {
        	        	 setSendMessage(request, response,result.rows[0].certify_num,user_data);
        	         } else {
        	        	 return response.status(404).send();
        	         }
        	         
        	         conn.release();
        	         
        	     });
        	     // conn.release();
        	 });
        	 
        	 
         } else {
        	 return res.status(404).send();
         }        
     });
     // conn.release();
 });
}

const setSendMessage = (request, response,certifyNo,user_data) => {
	console.log("certi4");
	const msg =  "[PLISMPLUS] 인증번호[" + certifyNo + "]를 입력하셔서 휴대폰인증을 받으세요 - (주)케이엘넷";
	
	let sql = "INSERT INTO ebill.em_tran \n";
	   sql += "(tran_pr, tran_phone, tran_callback, tran_status, tran_date, tran_msg, tran_etc3) VALUES \n";
	   sql += "(ebill.em_tran_pr.nextval,'"+request.body.phone+"','15771172', '1', SYSDATE,'"+msg+"', 'ETR100') \n";
	   
         
 console.log ("query:" +sql);

 oraclePool.getConnection(function(err,conn,done) {
     if(err){
         console.log("err" + err);
         response.status(400).send(err);
     }

     conn.execute(sql,{},(error, results) => {
    	 
         if (error) {
             response.status(400).json({ "error": error.message });
             return;
         }
         conn.commit( function (err) {
        	 if(err) {
        		 console.log(err.message);
        		 return;
        	 }
        	 conn.close();
             return response.status(200).json(user_data);   
         });
         
     });
     // conn.release();
 });
}

router.post('/userupdate', async (req, res) => {
	console.log("express update:",req.body);

    const inputpassword = crypto.pbkdf2Sync(req.body.pw, 'salt', 100000, 64, 'sha512').toString('hex');

	let sql = "update OWN_COMP_USER set local_pw = '"+inputpassword+"' , pwd_modify_date=now() \n";
	    sql +=" where user_no = '"+ req.body.uno+"' \n";	
	
    console.log(sql);
    pgsqlPool.connect(function(err,conn) {
        if(err){
            console.log("err" + err);
        }
        conn.query(sql, function(err,result){
            
            if(err){
                console.log(err);
            }
            console.log("result:",result);
            console.log("ROW CNT:",result.rowCount);
            if(result.rowCount > 0) {
            	return res.status(200).send();
            } else {
            	return res.status(404).send();
            }
        });
    });
   
});

const resetKey = (request, response,user_data) => {
	console.log("certi3");
	let sql = "update  OWN_COMP_USER set certify_num = Rpad(trim(to_char(floor(random()*9999),'9999')),4,'0'),certify_date=now() \n";
	   sql += " where user_no = '"+user_data[0].user_no+"' \n";
	          
 console.log ("query:" +sql);

	   pgsqlPool.connect(function(err,conn) {
     if(err){
         console.log("err" + err);
         response.status(400).send(err);
     }

     conn.query(sql, function(err,result){
         if (err) {
             response.status(400).json({ "error": error.message });
             return;
         }
         if(result.rowCount > 0) {
        	 return response.status(200).send();
         } else {
        	 return response.status(404).send();
         }        
     });
     // conn.release();
 });
}


module.exports = router;
