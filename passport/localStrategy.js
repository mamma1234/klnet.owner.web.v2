// var passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');
// const bcrypt = require('bcrypt');
const sUser = require('../models/sessionUser');
const pgsqlPool = require("../database/pool.js").pgsqlPool
const pgSql = require('../database/postgresql/users');
 
// const { User } = require('../models');

module.exports = (passport) => {  

	passport.use('localjoin',new LocalStrategy({
        usernameField: 'id',
        passwordField: 'password',
        passReqToCallback: true
    }, async (req, id, password, done) => {
        console.log('Sign (localStrategy.js) provider:email:', id, 'req:',req.body);
    	req.session.sUser = null;
    	
    	try {
    		
    		if(req.body.provider == 'local') {
    			console.log(">>>>>>>> local");
    			const inputpassword = crypto.pbkdf2Sync(req.body.password, 'salt', 100000, 64, 'sha512').toString('hex');

            	if(id) {  
            	    pgsqlPool.connect(function(err,conn) {

            	        if(err){
            	            console.log("err" + err);
            	        }
            	        
            	        const sql = {
            	    	        text: "SELECT * FROM OWN_COMP_USER \n"+
            	    	              " where upper(local_id) = upper($1) \n"+
            	    	        	  "  limit 1 ",
            	    	        values: [id]
            	    	    }

            	        conn.query(sql, function(err,result){
            	        	//done();
            	            if(err){
            	                console.log(err);
            	            }

            	            if(result.rowCount > 0) {
            	            	conn.release();
            	            	console.log("이미 등록되어 있음.");
            	            	done(null, false, { message: 'Use Another user id Please.(Dup Check error)' });
            	            } else {
            	            	console.log("[success] no user data");
            	            	
            	            	const setsql = {
            	                        text: "insert into own_comp_user(user_no,user_type,user_email,local_pw,insert_date,user_phone,user_name," +
            	                              "svc_use_yn,del_yn,local_id,kakao_id,token_kakao,naver_id,token_naver,face_id,token_face,google_id," +
            	                              "token_google,social_link_yn) values (replace(to_char(nextval('auth_user_id_seq'),'M000000'),' ',''),'O'," +
            	                              "$1,$2,now(),$3,$4,'Y','N',upper($5),$6,$7,$8,$9,$10,$11,$12,$13,$14)",
            	                        values: [req.body.email,inputpassword,req.body.phone,req.body.name,id,req.body.kakaoid,
            	                        	req.body.tokenkakao,req.body.naverid,req.body.tokennaver,req.body.faceid,req.body.tokenface,
            	                        	req.body.googleid,req.body.tokengoogle,req.body.linkyn]
            	                   }
            	            	conn.query(setsql, function(err,result){
            	            		
            	            		 if(err){
            	            	            console.log("err" + err);
            	            	        }
            	            		 
            	            		 if(result.rowCount > 0) {
            	            			 console.log("[success] user data insert");
                	            		 const loginsql = {
                              	    	        text: "SELECT * FROM OWN_COMP_USER \n"+
                              	    	              " where upper(local_id) = upper($1) \n"+
                              	    	        	  "  limit 1 ",
                              	    	        values: [id]
                              	    	    }
                     	            	 
                     	            	 conn.query(loginsql, function(err,result){
                              	        	//done();
                              	            if(err){
                              	                console.log(err);
                              	            }
                     	            	
                              	           if(result.rowCount > 0) {
                              	        	 console.log("[success] user data check: ok");
                              	        	conn.release();
         	 	                            sUser.provider = 'local';
         		                            sUser.userid = result.rows[0].local_id;
         		                            sUser.userno = result.rows[0].user_no;
         		                            sUser.username = result.rows[0].user_name;
         		                            sUser.displayName = 'web';
         		                            sUser.email = result.rows[0].user_email;
         		                            sUser.usertype = result.rows[0].user_type;
         	                            	req.session.sUser = sUser;
         	               	                done(null, sUser);
                              	           } else {
                            	            	console.log("등록되어 있지 않음.");
                            	            	done(null, sUser,{ message: 'Contact the administrator.(System error:No Data)' });
                              	           }
                     	            	 }); 
            	            		 } else {
            	            			 done(null, sUser,{ message: 'Contact the administrator.(System error:Data insert fail)' });
            	            		 }
            	            		 
            	            	 }); 
            	            }
              
            	        });
            	    }); 
            	} else {
            		done(null, false, { message: 'Missing ID Required.(Missing error : ID )' });
            	}
 
    		} else if (req.body.provider == "merge") {
    			console.log("1.klnet+social data merge....");
    			const inputpassword = crypto.pbkdf2Sync(req.body.password, 'salt', 100000, 64, 'sha512').toString('hex');

            	if(id) {  
	    			
            	    pgsqlPool.connect(function(err,conn) {
            	    	
            	        if(err){
            	            console.log("err" + err);
            	        }

            	        const sql1 = {
            	    	        text: "SELECT * FROM OWN_COMP_USER \n"+
            	    	              " where upper(local_id) = upper($1) \n"+
            	    	        	  "  limit 1 ",
            	    	        values: [id]
            	    	    }
            	        conn.query(sql1, function(err,result) {
            	        	//done();
            	            if(err){
            	                console.log(err);
            	            }

            	            if (result.rowCount > 0) {
            	            	 console.log("2-1. [success] klnet id check: ok");
            	            	 let resultSet = false; 
                                 if (inputpassword == result.rows[0].local_pw.toString()) {
                                	 resultSet = true;
                                 } else {
                                	 resultSet = false;
                                 }
                                 
                                 if(resultSet) {
	            	            	 console.log("2-2. [success] klnet login check: ok");
	            	            	 sUser.provider = 'local';
	                                 sUser.userid = id;
	                                 sUser.displayName = 'web';
	                                 console.log("socail id:",req.body.kakaoid,req.body.googleid);
    
		                            let sql2 = "SELECT * FROM OWN_COMP_USER \n";
			      	    	              if (req.body.kakaoid){
			      	    	            	  sql2 +=  " where upper(kakao_id) = '"+req.body.kakaoid+"' \n";
			      	    	              } else if (req.body.naverid) {
			      	    	            	  sql2 += " where upper(naver_id) = '"+req.body.naverid+"' \n";
			      	    	              } else if (req.body.faceid) {
			      	    	            	  sql2 +=  " where upper(face_id) = '"+req.body.faceid+"' \n";
			      	    	              } else{
			      	    	            	  sql2 +=  " where upper(google_id) = '"+req.body.googleid+"' \n";
			      	    	              }
			      	    	              sql2 += "limit 1 ";

					      	        conn.query(sql2, function(err,result) {
					      	        	//done();
					      	            if(err){
					      	                console.log(err);
					      	            }
					
					      	            if(result.rowCount > 0) {
					      	            	console.log("3. [error] klnet id find: ok / socail dup error");
					      	            	done(null, sUser, { message: '소셜 정보가 다른 아이디에  등록되어 있음.' });
					      	            } else {
					      	            	console.log("3. [success] klnet id find: ok / socail id not found: ok");
					      	            	
					      	            	let updatesql = "UPDATE OWN_COMP_USER SET \n";
					      	            	   if (req.body.kakaoid){
					      	            		 updatesql+=" kakao_id='"+req.body.kakaoid+"' , token_kakao='"+req.body.tokenkakao+"' ,kakao_login_date=now(),social_link_yn='Y',social_link_date=now() \n";
					      	            	   } else if(req.body.naverid) {
					      	            		 updatesql+=" naver_id='"+req.body.naverid+"' , token_naver='"+req.body.tokennaver+"' ,naver_login_date=now(),social_link_yn='Y',social_link_date=now() \n"; 
					      	            	   } else if(req.body.faceid) {
					      	            		 updatesql+=" naver_id='"+req.body.faceid+"' , token_face='"+req.body.tokenface+"' ,face_login_date=now(),social_link_yn='Y',social_link_date=now() \n"; 
					      	            	   } else {
					      	            		 updatesql+=" google_id='"+req.body.googleid+"' , token_google='"+req.body.tokengoogle+"' ,google_login_date=now(),social_link_yn='Y',social_link_date=now() \n";
					      	            	   }
					      	            	   updatesql+="WHERE upper(local_id)=upper('"+id+"') \n";
	
			            	            	conn.query(updatesql, function(err,result) {
			                    	        	//done();
			                    	            if(err){
			                    	                console.log(err);
			                    	                done(null, sUser, { message: 'DataBase error' });
			                    	            }

			                    	            if(result.rowCount > 0) {
			                    	            	console.log("3-1. [success] data update success...");
			                    	            	console.log("req.body.kakaoid:",req.body.kakaoid);
			                    	            	if(req.body.kakaoid) {
			                    	            		   socialsql = {
			                    	           	    	        text: "SELECT user_no,user_type,user_name,user_email, kakao_id as user_id FROM OWN_COMP_USER \n"+
			                    	           	    	              " where kakao_id = $1 \n"+
			                    	           	    	        	  "  limit 1 ",
			                    	           	    	        values: [req.body.kakaoid]
			                    	            		   	}
			                    	            	   } else if (req.body.naverid) {
			                    	            		   socialsql = {
			                    	           	    	        text: "SELECT user_no,user_type,user_name,user_email, naver_id as user_id FROM OWN_COMP_USER \n"+
			                    	           	    	              " where naver_id = $1 \n"+
			                    	           	    	        	  "  limit 1 ",
			                    	           	    	        values: [req.body.naverid]
			                    	            		   	}
			                    	            	   } else if (req.body.faceid) {
			                    	            		   socialsql = {
			                    	           	    	        text: "SELECT user_no,user_type,user_name,user_email, face_id as user_id FROM OWN_COMP_USER \n"+
			                    	           	    	              " where face_id = $1 \n"+
			                    	           	    	        	  "  limit 1 ",
			                    	           	    	        values: [req.body.faceid]
			                    	            		   	}
			                    	            	   } else {
			                    	            		   socialsql = {
			                    	           	    	        text: "SELECT user_no,user_type,user_name,user_email, google_id as user_id FROM OWN_COMP_USER \n"+
			                    	           	    	              " where google_id = $1 \n"+
			                    	           	    	        	  "  limit 1 ",
			                    	           	    	        values: [req.body.googleid]
			                    	            		   }
			                    	            	   }   

			                    	            	        conn.query(socialsql, function(err,result) {
			                    	            	        	 if(err){
			                    	             	                console.log(err);
			                    	             	               done(null, sUser, { message: 'DataBase error' });
			                    	             	            }
			                    	            	        	 if(result.rowCount > 0) {

			                         	            				sUser.provider = req.body.provider;
			                         	                            sUser.userid = result.rows[0].user_id;
			                         	                            sUser.userno = result.rows[0].user_no;
			                         	                            sUser.username = result.rows[0].user_name;
			                         	                            sUser.email = result.rows[0].user_email;
			                         	                            sUser.usertype = result.rows[0].user_type;
			                                                     	req.session.sUser = sUser;
			                                        	            done(null, sUser);
			                    	            	        	 } else {
			                    	            	        		 done(null, sUser, { message: 'DataBase error' });
			                    	            	        	 }
			                    	            	        });

			                    	            } else {
			                    	            	done(null, sUser, { message: 'DataBase error' });
			                    	            }
					      	               }); //update conn
                                         }
					      	            
					      	        });
	            	            } else {
	            	            	//console.log("2-1.[error] klnet id check: not found");
	            	            	console.log("2-2.[error] klnet login check: error");
	            	            	done(null, false, { message: '아이디 또는 비밀번호가 잘못 되었습니다.' });
	            	            }
            	            } else {
            	            	console.log("2-1.[error] klnet id check: not found");
            	            	done(null, false, { message: '아이디 또는 비밀번호가 잘못 되었습니다.' });
            	            }
            	            
            	        });
            	    }); 
            	} else {
            		console.log("0. [error] id not found...");
            		done(null, false, { message: '아이디 또는 비밀번호가 잘못 되었습니다.' });
            	}
    			
    		
    		} else {
    			console.log("1.klnet+social new data insert....");
    			const inputpassword = crypto.pbkdf2Sync(req.body.password, 'salt', 100000, 64, 'sha512').toString('hex');

            	if(id) {  
	    			
            	    pgsqlPool.connect(function(err,conn) {
            	    	
            	        if(err){
            	            console.log("err" + err);
            	        }

            	        const sql1 = {
            	    	        text: "SELECT * FROM OWN_COMP_USER \n"+
            	    	              " where upper(local_id) = upper($1) \n"+
            	    	        	  "  limit 1 ",
            	    	        values: [id]
            	    	    }
            	        conn.query(sql1, function(err,result) {
            	        	//done();
            	            if(err){
            	                console.log(err);
            	            }

            	            if (result.rowCount <= 0) {
            	            	 console.log("2-1. [success] klnet id check: not found success!!");

	            	            	 console.log("2-2. [success] klnet login check: ok");
	            	            	 sUser.provider = 'local';
	                                 sUser.userid = id;
	                                 sUser.displayName = 'web';
	                                 console.log("socail id:",req.body.kakaoid,req.body.googleid);
    
		                            let sql2 = "SELECT * FROM OWN_COMP_USER \n";
			      	    	              if (req.body.kakaoid){
			      	    	            	  sql2 +=  " where kakao_id = '"+req.body.kakaoid+"' \n";
			      	    	              } else if (req.body.naverid) {
			      	    	            	  sql2 += " where naver_id = '"+req.body.naverid+"' \n";
			      	    	              } else if (req.body.faceid) {
			      	    	            	  sql2 +=  " where face_id = '"+req.body.faceid+"' \n";
			      	    	              } else{
			      	    	            	  sql2 +=  " where google_id = '"+req.body.googleid+"' \n";
			      	    	              }
			      	    	              sql2 += "limit 1 ";

					      	        conn.query(sql2, function(err,result) {
					      	        	//done();
					      	            if(err){
					      	                console.log(err);
					      	            }
					
					      	            if(result.rowCount > 0) {
					      	            	console.log("3. [error] klnet id find: ok / socail dup error");
					      	            	done(null, sUser, { message: '소셜 정보가 다른 아이디에  등록되어 있음.' });
					      	            } else {
					      	            	console.log("3. [success] klnet id find: ok / socail id not found: ok");
					      	            	
					      	            	const setsql = {
			            	                        text: "insert into own_comp_user(local_id,local_pw,user_email,user_phone,user_no,user_type,insert_date,user_name," +
			            	                              "svc_use_yn,del_yn,kakao_id,token_kakao,naver_id,token_naver,face_id,token_face,google_id,token_google,social_link_yn,social_link_date) values ($1,$2,$3,$4,replace(to_char(nextval('auth_user_id_seq'),'M000000'),' ',''),'O'," +
			            	                              "now(),$5,'Y','N',$6,$7,$8,$9,$10,$11,$12,$13,$14,now())",
			            	                        values: [id,inputpassword,req.body.email,req.body.phone,req.body.name,req.body.kakaoid,req.body.tokenkakao,req.body.naverid,req.body.tokennaver,
			                	            			req.body.faceid,req.body.tokenface,req.body.googleid,req.body.tokengoogle,req.body.linkyn]
			            	                   }
			            	            	
			            	            	conn.query(setsql, function(err,result) {
			                    	        	//done();
			                    	            if(err){
			                    	                console.log(err);
			                    	                done(null, sUser, { message: 'DataBase error' });
			                    	            }

			                    	            if(result.rowCount > 0) {
			                    	            	console.log("3-1. [success] data insert success...");
			                    	            	if(req.body.kakaoid) {
			                    	            		   socialsql = {
			                    	           	    	        text: "SELECT user_no,user_type,user_name,user_email, kakao_id as user_id FROM OWN_COMP_USER \n"+
			                    	           	    	              " where kakao_id = $1 \n"+
			                    	           	    	        	  "  limit 1 ",
			                    	           	    	        values: [req.body.kakaoid]
			                    	            		   	}
			                    	            	   } else if (req.body.naverid) {
			                    	            		   socialsql = {
			                    	           	    	        text: "SELECT user_no,user_type,user_name,user_email, naver_id as user_id FROM OWN_COMP_USER \n"+
			                    	           	    	              " where naver_id = $1 \n"+
			                    	           	    	        	  "  limit 1 ",
			                    	           	    	        values: [req.body.naverid]
			                    	            		   	}
			                    	            	   } else if (req.body.faceid) {
			                    	            		   socialsql = {
			                    	           	    	        text: "SELECT user_no,user_type,user_name,user_email, face_id as user_id FROM OWN_COMP_USER \n"+
			                    	           	    	              " where face_id = $1 \n"+
			                    	           	    	        	  "  limit 1 ",
			                    	           	    	        values: [req.body.faceid]
			                    	            		   	}
			                    	            	   } else {
			                    	            		   socialsql = {
			                    	           	    	        text: "SELECT user_no,user_type,user_name,user_email, google_id as user_id FROM OWN_COMP_USER \n"+
			                    	           	    	              " where google_id = $1 \n"+
			                    	           	    	        	  "  limit 1 ",
			                    	           	    	        values: [req.body.googleid]
			                    	            		   }
			                    	            	   }   

			                    	            	        conn.query(socialsql, function(err,result) {
			                    	            	        	 if(err){
			                    	             	                console.log(err);
			                    	             	               done(null, sUser, { message: 'DataBase error' });
			                    	             	            }
			                    	            	        	 if(result.rowCount > 0) {
			                         	            				sUser.provider = req.body.provider;
			                         	                            sUser.userid = result.rows[0].user_id;
			                         	                            sUser.userno = result.rows[0].user_no;
			                         	                            sUser.username = result.rows[0].user_name;
			                         	                            sUser.email = result.rows[0].user_email;
			                         	                            sUser.usertype = result.rows[0].user_type;
			                                                     	req.session.sUser = sUser;
			                                        	            done(null, sUser);
			                    	            	        	 } else {
			                    	            	        		 done(null, sUser, { message: 'DataBase error' });
			                    	            	        	 }
			                    	            	        });

			                    	            } else {
			                    	            	done(null, sUser, { message: 'DataBase error' });
			                    	            }
					      	               }); //update conn
                                         }
					      	            
					      	        });

            	            } else {
            	            	console.log("2-1.[error] klnet id check: used");
            	            	done(null, false, { message: '이미 등록된 아이디 입니다.' });
            	            }
            	            
            	        });
            	    }); 
            	} else {
            		console.log("0. [error] id not found...");
            		done(null, false, { message: '아이디 또는 비밀번호가 잘못 되었습니다.' });
            	}

    		}
    	
                

            } catch(error) {
            	console.log(">>>>>error",error);
                console.error(error);
                done(error);
            }
    }));
	
    passport.use('local',new LocalStrategy({
        usernameField: 'id',
        passwordField: 'pw',
        passReqToCallback: true
    }, async (req, userid, password, done) => {
                console.log('(localStrategy.js) userid:', userid, 'password:', password);
                const inputpassword = crypto.pbkdf2Sync(password, 'salt', 100000, 64, 'sha512').toString('hex');
                
            try {

				// test용 pdk ship
				// sUser.provider = 'local';
				// sUser.userid = "test1@klnet.co.kr";
				// sUser.userno = "M000002";
				// sUser.username = "니꼬동",
				// sUser.displayName = 'web',
				// sUser.email = "test1@klnet.co.kr";
				// sUser.token_local = "";
				// req.session.sUser = sUser;
				// done(null, null);

            	//console.log(userid, password);

               // console.log(".Input Password:"+crypto.pbkdf2Sync(password, 'salt', 100000, 64, 'sha512').toString('hex'));
                /*
                    2020.01.21 pdk ship 

                    userid, password 로 DB를 검색하여 존재하는지에 따라 프로세스 처리
                */
                            
                // const exUser = await User.find({ where: { email } });
            	
            	if(userid) {
            		if(userid.toUpperCase() == "admin".toUpperCase()) {
            			done(null, false, { message: 'ADMIN 아이디는 사용금지 아이디 입니다.' });
            		} else {
						console.log("1.DB Connect");
		                await pgsqlPool.connect(function(err,conn, release) { 
		                    if(err){
		                        console.log("err" + err);
								if (conn)
								{
									release();
								}
		                    } else {
                            console.log("2.DB Select");
		                    conn.query("select  * from own_comp_user where upper(local_id) = upper('"+userid+"')", function(err,result) {
		                        if(err){
		                        	release();
		                            console.log(err);
		                        } else {
			                        if(result.rows[0] != null) {
				                         console.log("3. select ok");  
			                            const exUser = {userid, password}
		
			                            //let resultSet = false; 
			                                // if (inputpassword == result.rows[0].local_pw.toString()) resultSet = true;
			                                 // console.log("result:"+result);
			                                 if(inputpassword == result.rows[0].local_pw.toString()) {
												console.log("4. pass check ok"); 

			     	                            sUser.provider = 'local';
			    	                            //sUser.userid = userid;
			    	                            sUser.userno = result.rows[0].user_no;
			    	                            sUser.username = result.rows[0].user_name,
			    	                            sUser.displayName = 'web',
			    	                            sUser.email = result.rows[0].user_email;
			    	                            sUser.usertype = result.rows[0].user_type;
			                                	req.session.sUser = sUser;
			                                	release();
			                                    done(null, sUser);
			                                 } else {
			                                    console.log('아이디 또는 비밀번호가 일치하지 않습니다.');
			                                    release();
			                                    done(null, false, { message: '아이디 또는 비밀번호가 일치하지 않습니다.' });
			                                 }   
			                        } else {
			                            console.log('가입되지 않은 회원입니다.');
			                            release();
			                            done(null, false, { message: '아이디 또는 비밀번호가 일치하지 않습니다.' });
			                        }
		                        }
		                    });
		                    // conn.release();
		                 }
		                });
            		}
	                console.log(">>>>>end");
            	}else{
					done(null, false, { message: '필수 입력값이 누락되었습니다.' });
				}

            } catch(error) {
            	console.log(">>>>>error",error);
                console.error(error);
                done(error);
            }
    }));
    
    console.log('passport2');
    
    
   
};
