'use strict';

const oraclePool = require("../pool.js").oraclePool
const pgsqlPool = require("../pool.js").pgsqlPool
// const oracledb = require('oracledb');


const getCarrierInfo = (request, response) => {
	const sql = "SELECT A.line_code ,'['||A.LINE_CODE||'] '||B.CNAME_KR AS line_name "
        +" FROM TCS_ESHIP_CONFIG A,TCS_COMP_HEADER_TBL B"
	      +" WHERE A.KLNET_ID = B.KLNET_ID(+)"
        +" ORDER BY A.LINE_CODE ASC";

    oraclePool.getConnection(function(err,conn,done) {
        if(err){
            console.log("err" + err);
            response.status(400).send(err);
        }

        conn.execute(sql,{},{outFormat:oraclePool.OBJECT},(error, results) => {
            if (error) {
                response.status(400).json({ "error": error.message });
                return;
            }

            // console.log(results.json);
            // console.log(results);
            // response.send(results.rows);
            response.status(200).json(results.rows);
            conn.close();
            
        });
        // conn.release();
    });
}

const getScheduleList = (request, response) => {
	console.log(">>>>>> FCL_SCHEDULE_HEADER log");
	console.log (">>PARAM1:"+request.body.carrierCode);
	console.log (">>PARAM2:"+request.body.startPort);
	console.log (">>PARAM3:"+request.body.endPort);
	console.log (">>PARAM4:"+request.body.startDate);
	console.log (">>PARAM5:"+request.body.endDate);
	console.log (">>PARAM6:"+request.body.vesselName);
	
/*     let sql = "select a.line_code,a.vsl_name,a.voyage_no,a.svc,to_char(to_date(a.etd,'YYYYMMDD'),'YYYY-MM-DD') as start_day,a.port_code as start_port, \n "
    + "to_char(to_date(b.eta,'YYYYMMDD'),'YYYY-MM-DD') as end_day,b.port_code as end_port \n"
    + "from own_vsl_Sch_20200408 a, own_vsl_sch_20200408 b \n"
    + "where a.line_code = b.line_code and a.voyage_no = b.voyage_no and a.vsl_name = b.vsl_name and a.svc = b.svc and a.port_code = '"+request.body.startPort+"' \n"
    + "and b.port_code = '"+request.body.endPort+"' and a.etd between '"+request.body.startDate+"' and '"+request.body.endDate+"' and a.etd <= b.eta \n"
    if(request.body.carrierCode != "") {
        sql= sql + "AND a.line_code ='"+request.body.carrierCode+"' \n";	
    }
    if(request.body.vesselName != "") {
        sql = sql + "AND a.vsl_name LIKE '%"+request.body.vesselName+"%' \n";	
    }
    sql = sql + "order by a.etd, a.line_Code, a.vsl_name, a.voyage_no, svc, b.eta" */

    let sql = "select line_code,vsl_name,voyage_no,to_char(to_date(start_date,'YYYYMMDD'),'YYYY-MM-DD') as start_day, start_port_code as start_port, \n "
    + "to_char(to_date(end_date,'YYYYMMDD'),'YYYY-MM-DD') as end_day,end_port_code as end_port, '[' || line_code || '] ' || vsl_name as title, to_date(start_date,'YYYYMMDD') as start, to_date(start_date,'YYYYMMDD') as end, \n"
    + "'true' as \"allDay\" from own_vsl_sch \n"
    + "where start_port_code = '"+request.body.startPort+"' and end_port_code = '"+request.body.endPort+"'  \n"
    + "and start_date >= '"+request.body.startDate+"' and start_date <= '"+request.body.endDate+"' \n"
    if(request.body.carrierCode != "") {
        sql= sql + "and line_code ='"+request.body.carrierCode+"' \n";	
    }
    if(request.body.vesselName != "") {
        sql = sql + "and vsl_name LIKE '%"+request.body.vesselName+"%' \n";	
    }
    sql = sql + "group by line_Code, vsl_name, voyage_no, start_port_code, end_port_code, start_date, end_date \n"
    sql = sql + "order by start_date, line_Code, vsl_name, voyage_no, end_date"
            
            console.log ("query:" +sql);

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
                    console.log(result);
                    response.status(200).json(result.rows);
                    // console.log(result.fields.map(f => f.name));
        
                });
        
                // conn.release();
            });
}


const getScheduleDetailList = (request, response) => {
	console.log(">>>>>> FCL_SCHEDULE_DETAIL log");
	console.log (">>PARAM1:"+request.body.carrierCode);
	console.log (">>PARAM2:"+request.body.vesselName);
	console.log (">>PARAM3:"+request.body.voyage);
	console.log (">>PARAM4:"+request.body.startDate);
	console.log (">>PARAM5:"+request.body.endDate);
	console.log (">>PARAM6:"+request.body.svc);
	
//    let sql = "select line_Code,voyage_no,vsl_name,svc,eta,etd,port_code from own_vsl_Sch where line_code = '"+request.body.carrierCode+"' \n"
//    + "and vsl_name = '"+request.body.vesselName+"' and voyage_no = '"+request.body.voyage+"' \n"
//    + "and etd >= replace('"+request.body.startDate+"','-','') and eta <= replace('"+request.body.endDate+"','-','') \n"
//    + "order by etd "

/*     const sql = {
        text: "select to_char(to_date(eta,'YYYYMMDD'),'YYYY-MM-DD'),to_char(to_date(etd,'YYYYMMDD'),'YYYY-MM-DD'),port_code from own_vsl_Sch_20200408 where line_code = $1 \n "
        + "and vsl_name = $2 and voyage_no = $3 \n"
        + "and etd >= replace($4,'-','') and eta <= replace($5,'-','') and svc = $6 \n"
        + "order by eta,etd ",
        values: [request.body.carrierCode,request.body.vesselName,request.body.voyage,request.body.startDate,request.body.endDate,request.body.svc],
        rowMode: 'array',
    } */

/*     const sql = {
        text: "select act_vsl_name, act_voyage_no, port_date, port_code port from ( \n"
        + "(select act_vsl_name, act_voyage_no, to_char(to_date(start_date,'YYYYMMDD'),'YYYY-MM-DD') port_date, pol port_code \n"
        + "from own_vsl_sch where line_code = $1 and vsl_name = $2 and voyage_no = $3 \n"
        + "and start_port_code = $4 and end_port_code = $5 group by start_date, pol, act_vsl_name, act_voyage_no ) \n"
        + "union all \n"
        + "(select act_vsl_name, act_voyage_no, to_char(to_date(end_date,'YYYYMMDD'),'YYYY-MM-DD') port_date, pod port_code \n "
        + "from own_vsl_sch where line_code = $1 and vsl_name = $2 and voyage_no = $3 \n"
        + "and start_port_code = $4 and end_port_code = $5 \n"
        + "order by end_date, end_port_code) ) a",
        values: [request.body.carrierCode,request.body.vesselName,request.body.voyage,request.body.startPort,request.body.endPort],
        rowMode: 'array',
    } */

    const sql = {
        text: "select act_vsl_name, act_voyage_no, pol || ' (' || to_char(to_date(coalesce(pol_date,start_date),'YYYYMMDD'),'YYYY-MM-DD') || ')', \n"
        + "pod || ' (' || to_char(to_date(coalesce(pod_date,end_date),'YYYYMMDD'),'YYYY-MM-DD') || ')' \n "
        + "from own_vsl_sch where line_code = $1 and vsl_name = $2 and voyage_no = $3 \n"
        + "and start_port_code = $4 and end_port_code = $5 \n"
        + "order by coalesce(pol_date,start_date), coalesce(pod_date,end_date), end_port_code, start_port_code",
        values: [request.body.carrierCode,request.body.vesselName,request.body.voyage,request.body.startPort,request.body.endPort],
        rowMode: 'array',
    }
            
            console.log ("query:" +sql);

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
                    console.log(result);
                    response.status(200).json(result.rows);
                    // console.log(result.fields.map(f => f.name));
        
                });
        
                // conn.release();
            });
}

const getPortCodeInfo = (request, response) => {
	  let sql = "";
	  const portCode=request.body.portCode.substr(0,3);
	console.log("입력Keyword:"+portCode);

	    sql = "SELECT P.PORT_CODE,P.PORT_NAME FROM MFEDI.CODE_PORT P"
		      +",MFEDI. TCS_CODE_PORT A "
		      +" WHERE P.PORT_CODE = A.ISO_PORT"
		      +" AND (P.PORT_CODE LIKE upper('%"+portCode+"%') or P.PORT_NAME LIKE upper('%"+portCode+"%'))"
		      +" AND NVL(P.PORT_TYPE,' ') LIKE (CASE WHEN P.NATION_CODE = 'KR' THEN 'P' ELSE '%%' END)"
		      +" AND P.PORT_NAME IS NOT NULL"
		      +" AND A.LINE_CODE IN ( SELECT LINE_CODE FROM MFEDI.TCS_ESHIP_CONFIG)"
		      +" GROUP BY P.PORT_CODE,P.PORT_NAME";
	    
	    console.log("쿼리:"+sql);

    oraclePool.getConnection(function(err,conn,done) {
        if(err){
            console.log("err" + err);
            response.status(400).send(err);
        }

        conn.execute(sql,{},{outFormat:oraclePool.OBJECT},(error, results) => {
            if (error) {
                response.status(400).json({ "error": error.message });
                return;
            }

            // console.log(results.json);
            // console.log(results.rows);
            // response.send(results.rows);
    
            response.status(200).json(results.rows);
            conn.close();
            
        });
        // conn.release();
    });
}


module.exports = {
	    getCarrierInfo,
	    getScheduleList,
	    getPortCodeInfo,
	    getScheduleDetailList,
	}