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

		pgsqlPool.connect(function(err,conn) {
			console.log("sql:",jwtPayload);


			// const token = jwt.sign(user.userno, process.env.JWT_SECRET_KEY);
            //토큰 저장
            // console.log("token db save: ", token);
            // pgSql.setUserToken(user.userno, token);

			if(err) {console.log("err",err);}
			conn.query("select user_no as userno,user_email,user_name as username from own_comp_user where user_no='"+jwtPayload+"'",function(err,result) {
				if(err) {console.log(err);}
				if(result.rows[0] != null) {
					conn.release();
					return done(null,result.rows[0]);
				} else {
					return done(null,{message:false});
				}
			});	
		});
	}));
}