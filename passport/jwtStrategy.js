const sUser = require('../models/sessionUser');

//var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy,
	ExtractJwt = require('passport-jwt').ExtractJwt;
const pgsqlPool = require("../database/pool.js").pgsqlPool
require('dotenv').config();

module.exports = (passport) => {  
	passport.use(new JwtStrategy({
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		secretOrKey : process.env.JWT_SECRET_KEY
	}, function(jwtPayload, done) {
		console.log("jwtPayload", jwtPayload);

		// test용 pdk ship
		sUser.provider = 'local';
		sUser.userid = "1261001956";
		sUser.userno = "M000002";
		sUser.username = "니꼬동",
		sUser.displayName = 'web',
		sUser.email = "mamma@klnet.co.kr";
		return done(null,sUser);

/*
		pgsqlPool.connect(function(err,conn) {
			console.log("sql:",jwtPayload);

			console.log("jwtPayload.userno", jwtPayload.userno);

			// const token = jwt.sign(user.userno, process.env.JWT_SECRET_KEY);
            //토큰 저장
            // console.log("token db save: ", token);
            // pgSql.setUserToken(user.userno, token);

			if(err) {console.log("err",err);}
			conn.query("select user_no as userno,user_email,user_name as username, userid from own_comp_user where user_no='"+jwtPayload.userno+"'",function(err,result) {
				if(err) {console.log(err);}
				if(result.rows[0] != null) {

					sUser.provider = 'local';
					sUser.userid = result.rows[0].userid;
					sUser.userno = result.rows[0].user_no;
					sUser.username = result.rows[0].user_name,
					sUser.displayName = 'web',
					sUser.email = result.rows[0].user_email;

					req.session.sUser = sUser;

					conn.release();
					return done(null,sUser);
				} else {
					// return done(null,{message:false});
					return done(null,{message:'아이디 또는 비밀번호가 일치하지 않습니다.'});
				}
			});	
		});
*/
	}));
}