const express = require('express');
const pgSql = require('../database/postgresql/users');
const passport = require('passport');
const crypto = require('crypto');
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { isLoggedPass,isLoggedIn } = require('./middlewares');
const pgsqlPool = require("../database/pool.js").pgsqlPool
const oraclePool = require("../database/pool.js").oraclePool
 const router = express.Router();
//const randtoken = require('rand-token');
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
	console.log("express:",req.body.password);
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
            return res.status(300).send(info.message );
            
        }
        
        if(!user){
            console.log("!user", user);
            // req.flash('loginError', info.message);
            // return res.redirect('/');
            // return res.status(200).json(info);
            return res.status(300).send(info.message);
            
        }

        
        const token = jwt.sign({userno:user.userno}, process.env.JWT_SECRET_KEY, { expiresIn : '1h', });
        //토큰 저장
       // console.log("token db save: ", token);
        pgSql.setUserToken(user,token);
        //console.log("token value:"+token);
        /*//res.clearCookie('connect.sid',{ path: '/' });
        res.clearCookie('connect.userno',{ path: '/' });
        res.cookie("connect.sid",token);
        res.cookie("connect.userno",user.userno);*/
        return res.json({user:user, token:token, message:'가입 되었습니다.'});
        //return res.json(user);
    })(req, res, next)  //미들웨어 내의 미들웨어에는 (req, res, next)를 붙인다.
});


router.get('/verify', isLoggedPass, (req, res, next) => {

    console.log("(auth.js) req.isAuthenticated():", req.isAuthenticated());
    passport.authenticate('re-jwt',(authError, user, info) => {
        //console.log("2. JWT authenticate Return Val (authError:",authError,",user:",user,",info:",info);

        console.log("(auth.js) authError:", authError, ',user', user, ',info', info);

        if(authError) {
            console.error("authError", authError);
            return next(authError);
        }
        if(!user){
            return res.status(401).json({ isAuth:false, errorcode: 401, error: info.message });
        }

        req.login(user,async (loginError) => {
            //console.log("user", user);
        	
            if(loginError) {
                console.error("loginError", loginError);
                return next(loginError);
            }
            const userInfo = {'user_no':user.user_no,'user_name':user.user_name,'role':user.user_type}; console.log("userInfo:",userInfo);
            return res.json({'isAuth':true,'user':userInfo});
        });

    })(req, res, next)  //미들웨어 내의 미들웨어에는 (req, res, next)를 붙인다.

});

router.get('/user', isLoggedPass, (req, res, next) => { //console.log("req:",req.cookies);
    console.log("(auth.js) req.isAuthenticated():", req.isAuthenticated());
    passport.authenticate('jwt',(authError, user, info) => {
        console.log("authError:",authError,",user:",user,",info:",info);
        
        if(authError) {
            console.error("authError", authError);
            return next(authError);
        }
        if(!user){
            //console.log("!user", user);
            req.session = null;
            // req.flash('loginError', info.message);
            // return res.redirect('/');
            // return res.status(401).json(info);
            //return res.status(401).json({ errorcode: 401, error: 'unauthorized' });
            return res.status(401).json({ errorcode: 401, error: info.message });
        }

        return req.login(user,async (loginError) => {
            //console.log("user", user);

            if(loginError) {
                console.error("loginError", loginError);
                return next(loginError);
            }
            //req.session.sUser = user;
            // res.status(200).json(user);
            // return;

            //return res.json({user:user});
            //토큰 발행
            const userInfo = {'userno':user.user_no,'username':user.user_name,'role':user.user_type};
            const accessToken = jwt.sign(userInfo, process.env.JWT_SECRET_KEY, { expiresIn : '1h', });
            //토큰 저장
            //console.log("token db save: ", user.accessToken);
            await pgSql.setUserToken(user,accessToken);
            //console.log("token value:"+token);
            /*//res.clearCookie('connect.sid',{ path: '/' });
            res.clearCookie('connect.userno',{ path: '/' });
            res.cookie("connect.sid",token);
            res.cookie("connect.userno",user.userno);*/
            //return res.json({user:user, token:token});
            return res.json({'isAuth':true,'user':userInfo,'token':accessToken});            
        });
    })(req, res, next)  //미들웨어 내의 미들웨어에는 (req, res, next)를 붙인다.
});



router.post('/login', (req, res, next) => { 
    console.log("(auth.js) req.isAuthenticated():", req.isAuthenticated());
    
     passport.authenticate('local',{session: false}, (authError, user, info) => {
        console.log("authError:",authError,",user:",user,",info:",info);
        //console.log("(auth.js) req.isAuthenticated():", req.isAuthenticated());
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

        req.login(user,async (loginError) => {

            if(loginError) {
                console.error("loginError", loginError);
                return next(loginError);
            }

             const userInfo = {'user_no':user.user_no,'user_name':user.user_name,'role':user.user_type};
            //토큰 발행
            const accessToken = jwt.sign({userno:user.user_no}, process.env.JWT_SECRET_KEY, { expiresIn : '1h' });
            //const refleshToken = jwt.sign(userInfo, process.env.JWT_SECRET_KEY, { expiresIn : '1h', });

            //토큰 저장
            var ipaddr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
           //let ipaddr;
            req.body.ipaddr?ipaddr=req.body.ipaddr:ipaddr='';
        	   await pgSql.setUserToken(user,accessToken);
        	   await pgSql.setLoginHistory(user.user_no,'I',req.useragent, ipaddr);
        	   
        	  // res.cookie("x_auth",accessToken,{httpOnly:true});
               //console.log("token value:"+token);
               /*res.cookie("connect.sid",token);
               res.cookie("connect.userno",user.userno);*/
               //res.cookie("socialKey",{user:user, token:token});
        	   //console.log("acctoken:",accessToken);
               return res.json({'isAuth':true,'user':userInfo,'token':accessToken});
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
        	res.cookie("socialKey",{user:user});
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
            res.cookie("socialKey",{user:user, token:token});
            pgSql.setSocialLoginInfo(user.provider,user.userid, token , user.accessToken);
            //var ipaddr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            var ipaddr = requestIp.getClientIp(req);
            pgSql.setLoginHistory(user.userno,'I',req.useragent, ipaddr);
            //res.json({user:user, token:token});
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
        	res.cookie("socialKey",{user:user});
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
            res.cookie("socialKey",{user:user, token:token});
            pgSql.setSocialLoginInfo(user.provider,user.userid, token, user.accessToken);
            //var ipaddr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            var ipaddr = requestIp.getClientIp(req);
            pgSql.setLoginHistory(user.userno,'I',req.useragent, ipaddr);
            return res.redirect('/authpage?auth=social');
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
        	res.cookie("socialKey",{user:user});
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
            res.cookie("socialKey",{user:user, token:token});
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
        	res.cookie("socialKey",{user:user});
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
            res.cookie("socialKey",{user:user, token:token});
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
        	res.cookie("socialKey",{user:user});
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
        	res.cookie("socialKey",{user:user});
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
        	res.cookie("socialKey",{profile:user});
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

router.get('/local/callback', isLoggedPass, (req, res, next) => {

    console.log("(auth.js) /local/callback");

    //console.log('1.', req.body);
    
    // const accessToken = req.cookies['accessToken'];
    // const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
    // console.log("decoded:", decoded);
    // req.body['userno'] = userno;
    // req.body['accessToken'] = accessToken;

    // console.log('2.', req.body);

    passport.authenticate('local', (authError, user, info) => {
        console.log("authError:",authError,",user:",user,",info:",info);
        if(authError) {
            console.error("authError", authError);
            return next(authError);
        }
        if(info) {
        	res.cookie("x_auth",{user:user});
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

            // const token = jwt.sign({userno:user.userno}, process.env.JWT_SECRET_KEY, { expiresIn : '1h', });
            //토큰 저장
            // res.cookie("socialKey",{user:user, token:token});
            //res.cookie("socialKey",{user:user, token:user.accessToken});
            res.cookie("x_auth",user.accessToken);
            // pgSql.setSocialLoginInfo(user.provider,user.userid, token , user.accessToken);
            //var ipaddr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            var ipaddr = requestIp.getClientIp(req);
            pgSql.setLoginHistory(user.userno,'I',req.useragent, ipaddr);
            //res.json({user:user, token:token});
            //res.json({user:user, token:user.accessToken});
            //console.log("res:",res);
           // return res.redirect('http://localhost:3000/authpage?auth=social');
            return res.redirect('http://localhost:3000');
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


router.get('/klnet/callback', (req, res, next) => {
    
    console.log("(auth.js) /klnet/callback:req.isAuthenticated():", req.isAuthenticated());
    
    passport.authenticate('klnet', (authError, user, info) => {
        console.log("authError:",authError,",user:",user,",info:",info);
        if(authError) {
            console.error("authError", authError);
            return next(authError);
        }
        if(info && Object.keys(info).length > 0) {
            console.log("----info---", info);
        	res.cookie("x_auth",{user:user});
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

            console.log("user====>", user);

            if(loginError) {
                console.error("loginError", loginError);
              //  return next(loginError);
            }
            //console.log("http://localhost:3000 redirect");
            //return res.redirect('http://localhost:3000');
            // res.status(200).json(user);
            // return;

            // const token = jwt.sign(user.userid, process.env.JWT_SECRET_KEY);

            // const token = jwt.sign({userno:user.userno}, process.env.JWT_SECRET_KEY, { expiresIn : '1h', });
            //토큰 저장
            // res.cookie("socialKey",{user:user, token:token});
            //res.cookie("socialKey",{user:user, token:user.accessToken});


            const decoded = jwt.verify(user.accessToken, process.env.JWT_SECRET_KEY);
            console.log('decoded:', decoded);

            res.cookie("x_auth",user.accessToken);
            // pgSql.setSocialLoginInfo(user.provider,user.userid, token , user.accessToken);
            //var ipaddr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            var ipaddr = requestIp.getClientIp(req);
            pgSql.setLoginHistory(user.userno,'I',req.useragent, ipaddr);
            //res.json({user:user, token:token});
            //res.json({user:user, token:user.accessToken});
            //console.log("res:",res);
           // return res.redirect('http://localhost:3000/authpage?auth=social');
            return res.redirect('http://localhost:3000');
            //res.cookie("connect.sid",token);
            // res.cookie("connect.user",user);
            //res.cookie("connect.userno",user.userno);
            //return res.redirect('http://localhost:3000/landing?provider=kakao');
             //res.json({user:user, token:token});
           // return res.redirect('/landing');
          //  return res.redirect('http://'+req.headers.host);
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
 

 
router.post('/userfinder', (req, res) => {
    console.log(" express user info finder ----------------------");  
     pgSql.getUserPhoneInfo(req, res);
});


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

/*const resetKey = (request, response,user_data) => {
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
}*/
router.post('/logout',  function (req, res) {
	console.log(">>>>>>>>>LOG OUT");
  //let authorization;
  let clientToken;
  try {
	  /*if (req.headers['authorization']) {
	      authorization = req.headers['authorization'];
	  }
	  console.log("authorization", authorization);
	  const re = /(\S+)\s+(\S+)/;
	  const matches = authorization.match(re);
	  const clientToken = matches[2];
	  const decoded = jwt.verify(clientToken, process.env.JWT_SECRET_KEY);*/
	  
	  if(req.cookies['x_auth']) {
		  clientToken = req.cookies['x_auth'];
	  }
	  const decoded = jwt.verify(clientToken, process.env.JWT_SECRET_KEY);

	  var ipaddr = requestIp.getClientIp(req);
	  if(decoded && decoded.user != undefined) {
		  pgSql.setUserToken(decoded);
		  pgSql.setLoginHistory(decoded.userno,'O',req.useragent,ipaddr);
	  }
	  req.logout();
	  res.clearCookie('socialKey',{ path: '/' });
	  res.clearCookie('x_auth',{ path: '/' });
	  //res.clearCookie('express:sess.sig',{ path: '/' });
	  res.send(false);
  } catch (e) {
	    req.logout();
	    res.clearCookie('socialKey',{ path: '/' });
		res.clearCookie('x_auth',{ path: '/' });
		//res.clearCookie('express:sess.sig',{ path: '/' });
		res.send(false);
  }
    
});
router.post('/weidongout', async (req, res) =>{
  try {

	  var userno = req.body.userno || null;
	  var ipaddr = requestIp.getClientIp(req);
	 
	  
	  if(userno) { 
		  await pgSql.setUserToken({'user':userno},'');
		  await pgSql.setLoginHistory(userno,'O',req.useragent,ipaddr);
	  }
	  res.clearCookie('x_auth',{ path: '/' });
	  req.logout();
	  res.send(false);
  } catch (e) {
	    req.logout();
		res.send(false);
  }
    
});

module.exports = router;
