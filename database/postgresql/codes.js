'use strict';

const pgsqlPool = require("../pool.js").pgsqlPool
const basicauth = require("basic-auth");


const getPortCode = (request, response) => {

	  const portCode=request.body.portCode+"%";
	console.log("입력Keyword:"+portCode);
       const sql = {
                    text: "select distinct PORT_CODE, PORT_NAME from own_code_port \n" +
                    	  " where (PORT_CODE LIKE upper($1)) \n"+
                          " and COALESCE(PORT_TYPE,' ') LIKE (CASE WHEN NATION_CODE = 'KR' THEN 'P' ELSE '%%' END) \n",
                    values: [portCode],
                    //rowMode: 'array',
                }
            
	    console.log("쿼리:"+sql);

      pgsqlPool.connect(function(err,conn,done) {
          if(err){
              console.log("err" + err);
              response.status(400).send(err);
          }
          console.log("sql : " + sql.text);
          conn.query(sql, function(err,result){
              done();
              if(err){
                  console.log(err);
                  response.status(400).send(err);
              }
  
              //response.status(200).send({'record':result.rows, 'field':result.fields.map(f => f.name)});
              //console.log(result);
              response.status(200).json(result.rows);
              // console.log(result.fields.map(f => f.name));
  
          });
  
          // conn.release();
      });
}

const getPortTrackingCode = (request, response) => {

	  const portCode="%"+request.body.portCode+"%";
	console.log("입력Keyword:"+portCode);
     const sql = {
                  text: "select distinct PORT_CODE, PORT_NAME from own_code_port \n" +
                  	    " where ( PORT_CODE LIKE upper($1) or port_name like upper($1) ) \n"+
                        " and COALESCE(PORT_TYPE,' ') LIKE (CASE WHEN NATION_CODE = 'KR' THEN 'P' ELSE '%%' END) \n",
                  values: [portCode],
                  //rowMode: 'array',
              }
          
	    console.log("쿼리:"+sql);

    pgsqlPool.connect(function(err,conn,done) {
        if(err){
            console.log("err" + err);
            response.status(400).send(err);
        }
        console.log("sql : " + sql.text);
        conn.query(sql, function(err,result){
            done();
            if(err){
                console.log(err);
                response.status(400).send(err);
            }

            //response.status(200).send({'record':result.rows, 'field':result.fields.map(f => f.name)});
            //console.log(result);
            response.status(200).json(result.rows);
            // console.log(result.fields.map(f => f.name));

        });

        // conn.release();
    });
}

  const getPortCodeInfo = (request, response) => {
    const sql = {
        text: "select port_code,port_name from own_code_port order by port_code",
       // values: [request.session.sUser.userno],
        rowMode: 'array',
    }

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
            	//console.log(result.rows[0]);
                response.status(200).json(result.rows);
            } else {
                response.status(200).json([]);
            }

        });

        // conn.release();
    });
}



const getCustomLineCode = (request, response) => {
                      
    let sql = 
        " select id, case when nm is not null then '['|| nm || ']' else '[ No Name ]' end as nm " +
        " from own_code_cuship " +
        " where view_yn='Y'"        
                                            


    pgsqlPool.connect(function(err,client,done) {
        if(err){
        console.log("err" + err);
        response.status(400).send(err);
        }
        client.query(sql, function(err,result){
        done();
        if(err){
            console.log(err);
            response.status(400).send(err);
        }
        response.status(200).send(result.rows);
        });
    
    });
    
}



const getErrorLogList = (request, response) => {
    console.log(">>>>>>>", request.body);
    let sql = "";
        sql += " select * from ( ";
        sql += " select count(*) over()/10+1 as tot_page,floor(((row_number() over()) -1) /10 +1) as curpage, ";
        sql += " error_date, seq, sql_state, message, detail, hint, context, name from own_error_log ";
        sql += " where 1=1 "
        request.body.seq==""?" ":"and seq ="+ request.body.seq;
        
        if(request.body.fromDate != "" && request.body.toDate != "") {
            " and error_date between to_timestamp('"+request.body.fromDate+"','yyyymmdd') and to_timestamp('"+request.body.toDate+"','yyyymmdd') "
        }else if(request.body.fromDate != "" && request.body.toDate == "") {
            " and error_date > to_timestamp('"+request.body.fromDate+"','yyyymmdd24') ";
        }else if(request.body.fromDate == "" && request.body.toDate != "") {
            " and error_date < to_timestamp('"+request.body.toDate+"','yyyymmdd24') ";
        }else {

        }
        sql += " order by error_date desc ";
        sql +=")a where curpage ='"+request.body.num+"'";
        console.log(sql);
    try{    
        pgsqlPool.connect(function(err,client,done) {
            if(err){
            console.log("err" + err);
            response.status(400).send(err);
            }
            client.query(sql, function(err,result){
            done();
            if(err){
                console.log(err);
                response.status(400).send(err);
            }
            response.status(200).send(result.rows);
            });
        
        });
    }catch(e) {
        done();
        console.log(e);
    }
}




const getUserData = (request, response) => {
    console.log(">>>>>>>", request.body);
    let sql = "";
        sql += " select * from ( ";
        sql += " select count(*) over()/10+1 as tot_page,floor(((row_number() over()) -1) /10 +1) as curpage, * from own_comp_user ";
        sql += " where 1=1 "
        sql += request.body.userno==""?" ":" and user_no ='"+ request.body.userno+"' ";
        
        sql += " order by user_no desc ";
        sql +=")a where curpage ='"+request.body.num+"' ";
        console.log(sql);
    try{    
        pgsqlPool.connect(function(err,client,done) {
            if(err){
            console.log("err" + err);
            response.status(400).send(err);
            }
            client.query(sql, function(err,result){
            done();
            if(err){
                console.log(err);
                response.status(400).send(err);
            }
            response.status(200).send(result.rows);
            });
        
        });
    }catch(e) {
        done();
        console.log(e);
    }
}

const getUserRequest = (request, response) => {
    console.log(">>>>>>>", request.body);
    let sql = "";
        sql += " select * from ( ";
        sql += " select count(*) over()/10+1 as tot_page,floor(((row_number() over()) -1) /10 +1) as curpage, * from own_user_request ";
        sql += " where 1=1 "
        sql += request.body.req_seq==""?" ":" and req_seq ='"+ request.body.req_seq + "' ";
        sql += request.body.userno==""?" ":" and user_no ='"+ request.body.userno + "' ";
        sql += request.body.carrier_code==""?" ":" and carrier_code ='"+ request.body.carrier_code + "' ";
        sql += request.body.bl_bkg==""?" ":" and bl_bkg ='"+ request.body.bl_bkg + "' ";
        sql += request.body.ie_type==""?" ":" and ie_type ='"+ request.body.ie_type + "' ";
        sql += " order by user_no desc ";
        sql +=")a where curpage ='"+request.body.num+"'";
        console.log(sql);
    try{    
        pgsqlPool.connect(function(err,client,done) {
            if(err){
            console.log("err" + err);
            response.status(400).send(err);
            }
            client.query(sql, function(err,result){
            done();
            if(err){
                console.log(err);
                response.status(400).send(err);
            }
            response.status(200).send(result.rows);
            });
        
        });
    }catch(e) {
        done();
        console.log(e);
    }
}


const getTerminalInfo = (request, response) => {
    console.log(">>>>>>>", request.body);
    let sql = "";
        sql += " select * from ( ";
        sql += " select count(*) over()/10+1 as tot_page,floor(((row_number() over()) -1) /10 +1) as curpage, * from own_terminal_info ";
        sql += " where 1=1 "
        sql += request.body.terminal==""?" ":" and terminal ='"+ request.body.terminal + "' ";
        sql += " order by terminal desc ";
        sql +=")a where curpage ='"+request.body.num+"'";
        console.log(sql);
    try{    
        pgsqlPool.connect(function(err,client,done) {
            if(err){
            console.log("err" + err);
            response.status(400).send(err);
            }
            client.query(sql, function(err,result){
            done();
            if(err){
                console.log(err);
                response.status(400).send(err);
            }
            response.status(200).send(result.rows);
            });
        
        });
    }catch(e) {
        done();
        console.log(e);
    }
}



const getCodecuship = (request, response) => {
    console.log(">>>>>>>", request.body);
    let sql = "";
        sql += " select * from ( ";
        sql += " select count(*) over()/10+1 as tot_page,floor(((row_number() over()) -1) /10 +1) as curpage, * from own_code_cuship ";
        sql += " where 1=1 "
        sql += request.body.id==""?" ":" and id ='"+ request.body.id + "' ";
        sql += request.body.lineCode==""?" ":" and line_code ='"+ request.body.lineCode + "' ";
        sql += " order by id desc ";
        sql +=")a where curpage ='"+request.body.num+"'";
        console.log(sql);
    try{    
        pgsqlPool.connect(function(err,client,done) {
            if(err){
            console.log("err" + err);
            response.status(400).send(err);
            }
            client.query(sql, function(err,result){
            done();
            if(err){
                console.log(err);
                response.status(400).send(err);
            }
            response.status(200).send(result.rows);
            });
        
        });
    }catch(e) {
        done();
        console.log(e);
    }
}


module.exports = {
        getPortCodeInfo,
        getPortTrackingCode,
        getCustomLineCode,
        getPortCode,
        getErrorLogList,
        getUserData,
        getUserRequest,
        getTerminalInfo,
        getCodecuship
}