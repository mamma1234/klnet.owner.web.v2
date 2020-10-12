'use strict';

const pgsqlPool = require("../pool.js").pgsqlPool
const basicauth = require("basic-auth");
const sUser = require('../../models/sessionUser');


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

      pgsqlPool.connect(function(err,conn,release) {
          if(err){
              console.log("err" + err);
              response.status(400).send(err);
          } else {
              console.log("sql : " + sql.text);
              conn.query(sql, function(err,result){
            	  release();
                  if(err){
                      console.log(err);
                      response.status(400).send(err);
                  } else {
                      //response.status(200).send({'record':result.rows, 'field':result.fields.map(f => f.name)});
                      //console.log(result);
                      response.status(200).json(result.rows);
                      // console.log(result.fields.map(f => f.name));
                  }
              });
          }
  
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

    pgsqlPool.connect(function(err,conn,release) {
        if(err){
            console.log("err" + err);
            response.status(400).send(err);
        } else {
            console.log("sql : " + sql.text);
            conn.query(sql, function(err,result){
            	release();
                if(err){
                    console.log(err);
                    response.status(400).send(err);
                } else {
                    //response.status(200).send({'record':result.rows, 'field':result.fields.map(f => f.name)});
                    //console.log(result);
                    response.status(200).json(result.rows);
                    // console.log(result.fields.map(f => f.name));
                }
            });
        }

        // conn.release();
    });
}

  const getPortCodeInfo = (request, response) => {
    const sql = {
        text: "select port_code,port_name from own_code_port order by port_code",
       // values: [sUser.userno],
        rowMode: 'array',
    }

    pgsqlPool.connect(function(err,conn,release) {
        if(err){
            console.log("err" + err);
            response.status(400).send(err);
        } else {
            conn.query(sql, function(err,result){
            	release();
                if(err){
                    console.log(err);
                    response.status(400).send(err);
                } else {
                    console.log(result);
                    
                    if(result != null) {
                        //console.log(result.rows[0]);
                        response.status(200).json(result.rows);
                    } else {
                    	release();
                        response.status(200).json([]);
                    }

                }
    
            });

        }


        // conn.release();
    });
}



const getCustomLineCode = (request, response) => {
                      
    let sql = 
        " select id, case when nm is not null then '['|| nm || ']' else '[ No Name ]' end as nm " +
        " from own_code_cuship " +
        " where view_yn='Y'"        
                                            


    pgsqlPool.connect(function(err,client,release) {
        if(err){
            console.log("err" + err);
            response.status(400).send(err);
        } else {
            client.query(sql, function(err,result){
            	release();
                if(err){
                    console.log(err);
                    response.status(400).send(err);
                } else {
                    response.status(200).send(result.rows);
                }
            });

        }
    
    });
    
}



const getErrorLogList = (request, response) => {
    //console.log(">>>>>>>", request.body);
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
        pgsqlPool.connect(function(err,client,release) {
            if(err){
                console.log("err" + err);
                response.status(400).send(err);
            } else {
                client.query(sql, function(err,result){
                	release();
                    if(err){
                        console.log(err);
                        response.status(400).send(err);
                    } else {
                        response.status(200).send(result.rows);
                    }
                });

            }
        
        });
    }catch(e) {
        done();
        console.log(e);
    }
}




const getUserData = (request, response) => {
    //console.log(">>>>>>>", request.body);
    let sql = "";
        sql += " select * from ( ";
        sql += " select count(*) over()/10+1 as tot_page,floor(((row_number() over()) -1) /10 +1) as curpage, * from own_comp_user ";
        sql += " where 1=1 "
        sql += request.body.userno==""?" ":" and user_no ='"+ request.body.userno+"' ";
        
        sql += " order by user_no desc ";
        sql +=")a where curpage ='"+request.body.num+"' ";
        console.log(sql);
    try{    
        pgsqlPool.connect(function(err,client,release) {
            if(err){
                console.log("err" + err);
                response.status(400).send(err);
            } else {
                client.query(sql, function(err,result){
                	release();
                    if(err){
                        console.log(err);
                        response.status(400).send(err);
                    } else {
                        response.status(200).send(result.rows);
                    }
                });

            }
        
        });
    }catch(e) {
        done();
        console.log(e);
    }
}

const getUserRequest = (request, response) => {
    //console.log(">>>>>>>", request.body);
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
        pgsqlPool.connect(function(err,client,release) {
            if(err){
                console.log("err" + err);
                response.status(400).send(err);
            } else {
                client.query(sql, function(err,result){
                	release();
                    if(err){
                        console.log(err);
                        response.status(400).send(err);
                    } else {
                        response.status(200).send(result.rows);
                    }
                });

            }
        
        });
    }catch(e) {
        //done();
    	release();
        console.log(e);
    }
}


const getTerminalInfo = (request, response) => {
    //console.log(">>>>>>>", request.body);
    let sql = "";
        sql += " select * from ( ";
        sql += " select count(*) over()/10+1 as tot_page,floor(((row_number() over()) -1) /10 +1) as curpage, * from own_terminal_info ";
        sql += " where 1=1 "
        sql += request.body.terminal==""?" ":" and terminal ='"+ request.body.terminal + "' ";
        sql += " order by terminal desc ";
        sql +=")a where curpage ='"+request.body.num+"'";
        console.log(sql);
    try{    
        pgsqlPool.connect(function(err,client,release) {
            if(err){
                console.log("err" + err);
                response.status(400).send(err);
            } else {

                client.query(sql, function(err,result){
                	release();
                    if(err){
                        console.log(err);
                        response.status(400).send(err);
                    } else {
                        response.status(200).send(result.rows);
                    }
                });
            }
        
        });
    }catch(e) {
        //done();
    	release();
        console.log(e);
    }
}



const getCodecuship = (request, response) => {
    //console.log(">>>>>>>", request.body);
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
        pgsqlPool.connect(function(err,client,release) {
            if(err){
                console.log("err" + err);
                response.status(400).send(err);
            } else {

                client.query(sql, function(err,result){
                	release();
                    if(err){
                        console.log(err);
                        response.status(400).send(err);
                    } else {
                        response.status(200).send(result.rows);
                    }
                });
            }
        
        });
    }catch(e) {
        done();
        console.log(e);
    }
}
const getPortLocation = (req,res) => {

    const port = req.body.portCode;
    let sql = "";
    
    sql += " select port_code, port_name, a.nation_code, (select nation_kname from own_code_nation b where a.nation_code = b.nation_code limit 1) as nation_kname "
    sql += " , (select nation_ename from own_code_nation b where a.nation_code = b.nation_code limit 1) as nation_ename , port_ename, float8(wgs84_x) as wgs84_x, float8(wgs84_y) as wgs84_y "
    sql += " from own_code_port a"
    sql += " where wgs84_x is not null "
    sql += " and wgs84_y is not null ";
    port == "" ? sql +="" : sql += " and port_code = '" + port + "'" 
    console.log(sql);
    try{    
        pgsqlPool.connect(function(err,client,release) {
            if(err){
                console.log("err" + err);
                res.status(400).send(err);
            } else {
                client.query(sql, function(err,result){
                	release();
                    if(err){
                        console.log(err);
                        res.status(400).send(err);
                    } else {
                        res.status(200).send(result.rows);
                    }
                });
            
            }
        });
    }catch(e) {
        //done();
    	release();
        console.log(e);
    }
}
const createApiKey = (req,res) => {

    let userId = req.body.user.id;
    let userNo = req.body.user.no;
    const b = new Buffer.from(userId + " " + userNo);
    const s = b.toString('base64');
    
    let sql = "";

    sql += " update own_comp_user set api_service_key = '"+ s + "' ";
    sql += " where user_no = '"+ userNo +"' ";
    sql += " and local_id = '" + userId +"' ";

    console.log(sql);
    try{    
        pgsqlPool.connect(function(err,client,release) {
            if(err){
                console.log("err" + err);
                res.status(400).send(err);
            } else {
                client.query(sql, function(err,result){
                	release();
                    if(err){
                        console.log(err);
                        res.status(400).send(err);
                    } else {
                        res.status(200).send(s);
                    }
                });
            }
        
        });
    }catch(e) {
        //done();
    	release();
        console.log(e);
    }

}
const duplicateCheck =(req,res) => {
    //console.log(req.body);

    let sql = "";

    sql += " select api_service_key ";
    sql += " from own_comp_user "
    sql += " where 1=1 "
    sql += " and user_no = upper('"+req.body.user.no+"') "
    sql += " and local_id = upper('"+req.body.user.id+"') "

    console.log(sql);
    try{    
        pgsqlPool.connect(function(err,client,release) {
            if(err){
                console.log("err" + err);
                res.status(400).send(err);
            } else {
                client.query(sql, function(err,result){
                    // done();
                    if(err){
                        console.log(err);
                        res.status(400).send(err);
                    } else {
                        res.status(200).send(result.rows);
                    }
                });    

            }
        });
    }catch(e) {
        //done();
    	release();
        console.log(e);
    }
}

const getVslTypeList = (request, response) => {
    //console.log(">>>>>>>", request.body);
    let sql = "";
        sql += " select * from ( ";
        sql += " select count(*) over()/10+1 as tot_page, floor(((row_number() over(order by insert_date desc))-1)/10+1) as curpage, * from own_vsl_type ";
        sql += " where 1=1 "
        sql += request.body.vsltype==""?" ":" and vsl_type ='"+ request.body.vsltype + "' ";
        sql += " order by insert_date desc ";
        sql += " ) a where curpage ='"+request.body.num+"' ";
        console.log(sql);
    try {    
        pgsqlPool.connect(function(err,client,release) {
            if(err) {
                console.log("err" + err);
                response.status(400).send(err);
            } else {
                client.query(sql, function(err,result) {
                    // done();
                    if(err) {
                        console.log(err);
                        response.status(400).send(err);
                    } else {
                        response.status(200).send(result.rows);
                    }
                });

            }
        });
    } catch(e) {
        done();
        console.log(e);
    }
}

const getVslInfoList = (request, response) => {
    console.log(">>>>>>>", request.body);
    let sql = "";
        sql += " select * from ( ";
        sql += " select count(*) over()/10+1 as tot_page, floor(((row_number() over())-1)/10+1) as curpage, * from own_vsl_info ";
        sql += " where 1=1 "
        sql += request.body.id==""?" ":" and id ='"+ request.body.id + "' ";
        sql += request.body.vsltype==""?" ":" and vsl_type ='"+ request.body.vsltype + "' ";
        sql += request.body.shipimo==""?" ":" and ship_imo ='"+ request.body.shipimo + "' ";
        sql += " order by id ";
        sql += " ) a where curpage ='"+request.body.num+"' ";
    console.log(sql);
    try {    
        pgsqlPool.connect(function(err,client,release) {
            if(err) {
                console.log("err" + err);
                response.status(400).send(err);
            } else {
                client.query(sql, function(err,result) {
                	release();
                    if(err) {
                        console.log(err);
                        response.status(400).send(err);
                    } else {
                        response.status(200).send(result.rows);
                    }
                });
            }
        });
    } catch(e) {
        //done();
    	release();
        console.log(e);
    }
}


const getNationInfo = (request, response) => {
    let sql = "";
        sql += " select nation_kname, nation_ename, nation_code "
        sql += " from own_code_nation "
        sql += " where 1=1 "
        sql += request.body.nationCode !== ""?" and nation_code = '"+request.body.nationCode +"' ":""
        sql += " order by nation_kname asc "
        //sql += " limit 1 "


    console.log(sql);
    try {    
        pgsqlPool.connect(function(err,client,release) {
            if(err) {
                console.log("err" + err);
                response.status(400).send(err);
            } else {
                client.query(sql, function(err,result) {
                	release();
                    if(err) {
                        console.log(err);
                        response.status(400).send(err);
                    } else {
                        response.status(200).send(result.rows);
                    }
                });
            }
        });
    } catch(e) {
        //done();
    	release();
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
        getCodecuship,
        getPortLocation,
        createApiKey,
        duplicateCheck,
        getVslTypeList,
        getVslInfoList,
        getNationInfo,
}