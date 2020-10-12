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
		// sUser.provider = 'local';
		// sUser.userid = "1261001956";
		// sUser.userno = "M000002";
		// sUser.username = "니꼬동",
		// sUser.displayName = 'web',
		// sUser.email = "mamma@klnet.co.kr";
		// return done(null,sUser);


		pgsqlPool.connect(function(err,conn,release) {
			//console.log("sql:",jwtPayload);

			console.log("jwtPayload.userno >>>>>>>>>>>>>>>>>>>>", jwtPayload.userno);
/*			console.log("jwtPayload.exp >>>>>>>>>>>>>>>>>>>>", jwtPayload.exp);
			
			var expirationDate = new Date(jwtPayload.exp * 1000);
			
			console.log("jwtPayload date >>>>>>>>>>>>>>>>>>>>", expirationDate);
			console.log("new date >>>>>>>>>>>>>>>>>>>>", new Date() );*/
			
			if(err) {console.log("err",err);}
			conn.query("select user_no,user_email,user_name, local_id,user_type from own_comp_user where user_no='"+jwtPayload.userno+"'",function(err,result) {
				release();
				if(err) {console.log(err);}
				//console.log("ROW CNT:",result.rowCount);
	            if(result.rowCount > 0) {

					//sUser.provider = 'local';
					sUser.userid = sUser.userid?sUser.userid:result.rows[0].user_email;
					sUser.userno = jwtPayload.userno;
					sUser.username = result.rows[0].user_name;
					sUser.usertype = result.rows[0].user_type;
					sUser.displayName = 'web',
					sUser.email = sUser.email?sUser.email:result.rows[0].user_email;

					return done(null,sUser);
				} else {
					// return done(null,{message:false});
					return done(null,{message:'아이디 또는 비밀번호가 일치하지 않습니다.'});
				}
			});	
		});

	}));
}