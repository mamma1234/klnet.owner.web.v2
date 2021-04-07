const NaverStrategy = require('passport-naver').Strategy;
const sUser = require('../models/sessionUser');
const pgSql = require('../database/postgresql/users');
const pgsqlPool = require("../database/pool.js").pgsqlPool
// console.log("sUser:",sUser);

module.exports = (passport) => {
    // Client Secret	= s94tuPZ0Go  5VoB2_ZRwUMHKM0JPuUM
    passport.use(new NaverStrategy({
        // clientID: '5vSPppBEGLWEwMT8p9kZ', 
        // clientSecret: 's94tuPZ0Go',
        clientID: 'NWmVhSRrehwwXj3hCkaD', 
        clientSecret: 'yDkiF7mrLb',
        callbackURL: '/auth/naver/callback',
        passReqToCallback: true
    }, async (req, accessToken, refreshToken, profile, done) => {
        try {
            console.log('(naverStrategy.js) profile:', profile, 'accessToken:', accessToken, 'refreshToken:', refreshToken);



          //sUser.accessToken = accessToken;
          //sUser.refreshToken = refreshToken;
         // req.session.sUser = sUser;

            process.nextTick(function () {

            // const token = jwt.sign({userno:"M000005"}, JWT_SECRET_KEY, { expiresIn : '1h', });
            sUser.provider = 'local';
            sUser.userid = "test4";
            sUser.userno = "M000005";
            sUser.username = "판토스";
            sUser.displayName = 'web';
            sUser.email = "null";
            sUser.usertype = 'O';
            // sUser.token = token;
            done(null, sUser);

                // const exUser = await User.find({ where: { snsId: profile.id, provider: 'kakao' } });

                //const userid = profile.id
                //const password = accessToken
               // const exUser = {userid, password}
               // console.log(exUser);


               /* pgSql.setUserSocial('naver',userid, password, function(error, exUser) {
                if(error) {
                    done(error);
                }
                 console.log('DB OK');
                 });

                sUser.provider = 'naver';
                sUser.email = profile._json.email; //mamma1234@naver.com
                sUser.id = profile.id;  //30625476
                sUser.username = profile.displayName
                sUser.displayName = profile.displayName       
                sUser.accessToken = accessToken;
                sUser.refreshToken = refreshToken;
                req.session.sUser = sUser;

                // @todo Remove necessary comment
                //console.log("profile=");
                //console.log(profile);
                // data to be saved in DB
                // user = {
                //     name: profile.displayName,
                //     email: profile.emails[0].value,
                //     username: profile.displayName,
                //     provider: 'naver',
                //     naver: profile._json
                // };
                //console.log("user=");
                //console.log(user);
                // return done(null, profile);
*/                
                
           	
             /*
            	const sql = {
            	        text: "SELECT * FROM OWN_COMP_USER  \n"+
            	              " where trim(naver_id) = trim($1) \n"+
            	        	  "  limit 1 ",
            	        values: [profile._json.id],
            	        //rowMode: 'array',
            	    }

            	    console.log(sql);
            	    pgsqlPool.connect(function(err,conn,release) {
            	        if(err){
            	            console.log("err" + err);
            	        }
            	        conn.query(sql, function(err,result){
            	        	release();
            	            if(err){
            	                console.log(err);
            	            }
            	           // console.log(">>>",result);
            	           // console.log("ROW CNT:",result.rowCount);
            	            if(result.rowCount > 0) {
            	            	sUser.userno = result.rows[0].user_no;
      	                        sUser.provider = profile.provider;
								sUser.email = profile._json.email; //mamma1234@naver.com
								sUser.userid = '';  //30625476
								sUser.username = profile._json.nickname;
								sUser.displayName = profile.displayName; 
								//sUser.accessToken = accessToken;
								//sUser.refreshToken = refreshToken;
        	                   // req.session.sUser = sUser;
        	                    done(null, sUser); 
            	            } else {
            	            	 sUser.provider = profile.provider;
            	                 sUser.email = profile._json.email; //mamma1234@naver.com
            	                 sUser.userid = profile._json.id;  //30625476
            	                 sUser.username = profile._json.nickname;
            	                 sUser.displayName = profile.displayName; 
            	                 sUser.accessToken = accessToken;
            	                 sUser.refreshToken = refreshToken;
            	            	console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>가입되지 않은 회원입니다.');
            	            	//req.session.sUser = sUser;
            	                done(null, sUser, { message: '가입되지 않은 회원입니다.' });
            	            }
            	            
            	            
            	        });
            	    });
*/
               /* if(exUser) {
                    return done(null, exUser);
                }
                else {
                    console.log('가입되지 않은 회원입니다.');
                    return done(null, false, { message: '가입되지 않은 회원입니다.' });
                }        */        
            });


            /*
                2020.01.21 pdk ship 

                kakao id 로 DB를 검색하여 존재하면 accessToken, refreshToken 저장
                이후 서버 세션 저장 (미정, 토큰으로 클라이언트 처리할지 검토중)

                kakao id DB에 존재하지 않을 경우 회원 가입 페이지로 이동, 
                    옵션 1 신규 회원 가입 및 카카오 아이디, accessToken, refreshToken 신규 저장
                    옵션 2 기존 회원 정보 찾아 카카오 아이디 업데이트

            */

            // const userid = profile.id
            // const password = accessToken
            // const exUser = {userid, password}


            // sUser.provider = 'naver';
            // // sUser.email = profile._json.kakao_account.email; //mamma1234@naver.com
            // sUser.id = profile.id;  //1261001956
            // sUser.username = profile.username
            // sUser.displayName = profile.displayName       
            // sUser.accessToken = accessToken;
            // sUser.refreshToken = refreshToken;
            // req.session.sUser = sUser;


            // if(exUser) {
            //     done(null, exUser);
            // }
            // else {
            //     console.log('가입되지 않은 회원입니다.');
            //     done(null, false, { message: '가입되지 않은 회원입니다.' });
            //     // const newUser = await User.create({
            //     //     email: profile._json && profile._json.kaccount_email,
            //     //     nick: profile.displayName,
            //     //     snsId: profile.id,
            //     //     provider: 'kakao',
            //     // });
            //     // done(null, newUser);
            // }
        }
        catch(error) {
            console.error(error);
            done(error);
        }
    }));
};

