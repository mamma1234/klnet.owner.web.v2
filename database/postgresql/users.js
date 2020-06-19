'use strict';

const pgsqlPool = require("../pool.js").pgsqlPool
const basicauth = require("basic-auth");

const getUserInfo = (request, response) => {
    const sql = {
        text: "select user_type,user_email,to_char(insert_Date,'YYYY/MM/DD hh24:mi:ss') as insert_date, \n" +
        	  " user_phone,user_name,social_link_yn,to_char(social_link_date,'YYYY/MM/DD hh24:mi:ss') as social_link_date, \n"+
        	  " kakao_id,to_char(kakao_login_date,'YYYY/MM/DD hh24:mi:ss') as kakao_login_date,naver_id, \n" +
        	  " to_char(naver_login_date,'YYYY/MM/DD hh24:mi:ss') as naver_login_date,face_id, to_char(face_login_date,'YYYY/MM/DD hh24:mi:ss') as face_login_date, \n"+
        	  "  google_id,to_char(google_login_date,'YYYY/MM/DD hh24:mi:ss') as google_login_date \n"+
        	  "  from own_comp_user where user_no = $1 limit 1",
        values: [request.session.sUser.userno],
        //rowMode: 'array',
    }
console.log(sql);
    pgsqlPool.connect(function(err,conn,done) {
        if(err){
            console.log("err" + err);
            response.status(400).send(err);
        }

        conn.query(sql, function(err,result){
            done();
            if(err){
                console.log(err);
                response.status(400).send(err);
            }
            console.log(result);
            
            if(result != null) {
            	console.log(result.rows[0]);
                response.status(200).json(result.rows);
            } else {
                response.status(200).json([]);
            }

        });

        // conn.release();
    });
}


const setSocialLoginInfo = (provider,providerid, token , social_token) => {
console.log(">>>>provider:",provider,"providerid:",providerid,"token:",token);
let sql ={};
if(provider == "kakao") {
    sql = {
        text: "WITH UPSERT AS ("+
              " UPDATE OWN_COMP_USER SET "+
              "  token_local=$1 , token_kakao = $2, kakao_login_date= now()"+
        	  "  WHERE kakao_id=$3 RETURNING*) "+
        	  " INSERT INTO OWN_COMP_USER (USER_NO,KAKAO_ID,TOKEN_KAKAO,TOKEN_LOCAL,KAKAO_LOGIN_DATE) "+
        	  "  SELECT 'M'||to_char(now(),'YYYYMMDDhh24miss'), $4,$5,$6 ,now() WHERE NOT EXISTS ( SELECT * FROM UPSERT)",
        values: [token, social_token, providerid, providerid,social_token,token],
        rowMode: 'array',
    }
} else if (provider == "naver") {
    sql = {
        text: "WITH UPSERT AS ("+
              " UPDATE OWN_COMP_USER SET "+
              "  token_local=$1 , token_naver=$2, naver_login_date= now()"+
        	  "  WHERE naver_id=$3 RETURNING*) "+
        	  " INSERT INTO OWN_COMP_USER (USER_NO,NAVER_ID,TOKEN_NAVER,TOKEN_LOCAL,NAVER_LOGIN_DATE) "+
        	  "  SELECT 'M'||to_char(now(),'YYYYMMDDhh24miss'), $4,$5,$6,now() WHERE NOT EXISTS ( SELECT * FROM UPSERT)",
        	  values: [token, social_token, providerid, providerid,social_token,token],
        rowMode: 'array',
    }
} else if (provider == "google") {
    sql = {
        text: "WITH UPSERT AS ("+
              " UPDATE OWN_COMP_USER SET "+
              "  token_local=$1 , token_google =$2,google_login_date= now()"+
        	  "  WHERE google_id=$3 RETURNING*) "+
        	  " INSERT INTO OWN_COMP_USER (USER_NO,google_ID,TOKEN_google,TOKEN_LOCAL,google_LOGIN_DATE) "+
        	  "  SELECT 'M'||to_char(now(),'YYYYMMDDhh24miss'), $4,$5,$6,now() WHERE NOT EXISTS ( SELECT * FROM UPSERT)",
        	  values: [token, social_token, providerid, providerid,social_token,token],
        rowMode: 'array',
    }
} else if (provider == "facebook") {
    sql = {
        text: "WITH UPSERT AS ("+
              " UPDATE OWN_COMP_USER SET "+
              "  token_local=$1 , token_case =$2, face_login_date= now()"+
        	  "  WHERE face_id=$2 RETURNING*) "+
        	  " INSERT INTO OWN_COMP_USER (USER_NO,FACE_ID,TOKEN_FACE,token_local,google_LOGIN_DATE) "+
        	  "  SELECT 'M'||to_char(now(),'YYYYMMDDhh24miss'), $4,$5,$6,now() WHERE NOT EXISTS ( SELECT * FROM UPSERT)",
        	  values: [token, social_token, providerid, providerid,social_token,token],
        rowMode: 'array',
    }
}

console.log(sql);
    pgsqlPool.connect(function(err,conn,done) {

        if(err){
            console.log("err" + err);
        }

        conn.query(sql, function(err,result){
             done();
            if(err){
                console.log(err);
            }
            console.log(">>>",result);
            return result;
        });
    });
}

const setUserToken = (user, token) => {

const sql = {
        text: "UPDATE OWN_COMP_USER SET token_local=$1 , local_login_date= now() WHERE user_no=$2",
        values: [token, user.userno],
        rowMode: 'array',
    }

console.log("db token insert:",sql);
    pgsqlPool.connect(function(err,conn,done) {

        if(err){
            console.log("err" + err);
        }

        conn.query(sql, function(err,result){
             done();
            if(err){
                console.log(err);
            }
           // console.log(">>>",result);
            return "ok";
        });
    });
}


const setUser = (email,inputpassword,phone,name,company,kakaoid,tokenkakao,naverid,tokennaver,faceid,tokenface,googleid,tokengoogle) => {
	//console.log(">>>>pro:",device,"db id:",id);
	console.log(">>>>email:",email,"inputpassword :",inputpassword);
	const setsql = {
            text: "insert into own_comp_user(user_no,user_type,user_email,local_pw,insert_date,user_phone,user_name," +
                  "svc_use_yn,del_yn,user_company,kakao_id,token_kakao,naver_id,token_naver,face_id,token_face,google_id,token_google) values (replace(to_char(nextval('auth_user_id_seq'),'M000000'),' ',''),'O'," +
                  "$1,$2,now(),$3,$4,'Y','N',$5,$6,$7,$8,$9,$10,$11,$12,$13)",
            values: [email,inputpassword,phone,name,company,kakaoid,tokenkakao,naverid,tokennaver,faceid,tokenface,googleid,tokengoogle]
       }
	 pgsqlPool.connect(function(err,conn) {
		 if(err){
	            console.log("err" + err);
	        }
      conn.query(setsql);
	 });
	}


const setLocalUser = (id,password,phone,name,email,kakaoid,tokenkakao,naverid,tokennaver,faceid,tokenface,googleid,tokengoogle,linkyn) => {

	const setsql = {
            text: "insert into own_comp_user(user_no,user_type,user_email,local_pw,insert_date,user_phone,user_name," +
                  "svc_use_yn,del_yn,local_id,kakao_id,token_kakao,naver_id,token_naver,face_id,token_face,google_id,token_google,social_link_yn) values (replace(to_char(nextval('auth_user_id_seq'),'M000000'),' ',''),'O'," +
                  "$1,$2,now(),$3,$4,'Y','N',upper($5),$6,$7,$8,$9,$10,$11,$12,$13,$14)",
            values: [email,password,phone,name,id,kakaoid,tokenkakao,naverid,tokennaver,faceid,tokenface,googleid,tokengoogle,linkyn]
       }
	 pgsqlPool.connect(function(err,conn) {
		 if(err){
	            console.log("err" + err);
	        }
      conn.query(setsql);
	 });
	}

const setUpdateSocailUser = (kakaoid,tokenkakao,naverid,tokennaver,faceid,tokenface,googleid,tokengoogle,userId) => {
	const sql = {
	        text: "UPDATE OWN_COMP_USER SET kakao_id=$1 , token_kakao=$2, naver_id=$3, token_naver=$4, face_id=$5, token_face=$6," +
	        	  "google_id=$7,token_google=$8,social_link_yn='Y' WHERE upper(local_id)=upper($9)",
	        values: [kakaoid,tokenkakao,naverid,tokennaver,faceid,tokenface,googleid,tokengoogle,userId],
	        rowMode: 'array',
	    }

	    pgsqlPool.connect(function(err,conn,done) {

	        if(err){
	            console.log("err" + err);
	        }

	        conn.query(sql, function(err,result){
	             done();
	            if(err){
	                console.log(err);
	            }
	            return "ok";
	        });
	    });
}


const getUserNotice = (request, response) => {

    let sql = "select coalesce(count(*),0) as noti_cnt \n";
        sql += "from own_user_notice where user_no = '"+request.session.sUser.userno+"' and message_type ='W' \n";
        sql += "and read_yn = 'N' \n";
    
    
    
    console.log(sql);
    pgsqlPool.connect(function(err,conn,done) {
        if(err){
            console.log("err" + err);
            response.status(400).send(err);
        }

        conn.query(sql, function(err,result){
            done();
            if(err){
                console.log(err);
                response.status(400).send(err);
            }
           // console.log(result);
            
            if(result != null) {
            	console.log("data",result.rows[0]);
                response.status(200).json(result.rows);
            } else {
                response.status(200).json([]);
            }

        });

        // conn.release();
    });
}


const getUserMessage = (request, response) => {
	
	const selectSql1 = "select 1 from own_user_notice where  user_no = '"+request.session.sUser.userno+"' and message_type ='W' and read_yn='N' \n";

	let selectSql2 = "select user_no,message_type,message_seq,read_yn,read_Date,message,message_insert_date \n";
	selectSql2 += "from own_user_notice where user_no = '"+request.session.sUser.userno+"' and message_type ='W' \n";
	selectSql2 += " order by message_insert_date desc \n";
    
    const updateSql = "update own_user_notice set read_yn='Y', read_date=now() where  user_no = '"+request.session.sUser.userno+"' and message_type ='W' and read_yn='N' \n";


    pgsqlPool.connect(function(err,conn,done) {
        if(err){
            console.log("err" + err);
            response.status(400).send(err);
        }

        conn.query(selectSql1, function(err,result){
           
            if(err){
                console.log(err);
                conn.release();
                response.status(400).send(err);
            }
           // console.log(result);
            
            if(result.rowCount > 0) {
            	console.log("select success");
            	
            	  conn.query(updateSql, function(err,result){
                      if(err){
                          console.log(err);
                          response.status(400).send(err);
                      }
                     // console.log(result);
                      
                      if(result.rowCount > 0) {
                    	  console.log("update success");
                          conn.query(selectSql2, function(err,result){
                              done();
                              if(err){
                                  console.log(err);
                                  response.status(400).send(err);
                              }
                             // console.log(result);
                              
                              if(result != null) {
                              	console.log("data",result.rows);
                                  response.status(200).send(result.rows);
                              } else {
                                  response.status(200).send([]);
                              }

                          });
  
                      } else { 
                          console.log("update failed");
                          response.status(200).send([]);
                      }

                  });
     	
            } else {
            	console.log("no select");
                conn.query(selectSql2, function(err,result){
                done();
                        if(err){
                            console.log(err);
                            response.status(400).send(err);
                        }
                       // console.log(result);
                        
                        if(result != null) {
                        	console.log("data",result.rows);
                            response.status(200).send(result.rows);
                        } else {
                            response.status(200).send([]);
                        }

                    });
            }

        });

        // conn.release();
    });
}

module.exports = {
    getUserInfo,
    setUserToken,
    setUser,
    setLocalUser,
    setSocialLoginInfo,
    setUpdateSocailUser,
    getUserMessage,
    getUserNotice
}