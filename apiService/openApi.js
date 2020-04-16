'use strict';

const pgsqlPool = require("../database/pool.js").pgsqlPool


const apiScheduleInfo = (request, response) => {
    let authorization = request.headers['authorization'];

    if (!authorization) {
        response.status(401).send('Unauthorization');
    } else if (authorization) {
        let tmp = authorization.split(' ');
        

        let buf = new Buffer(tmp[1], 'base64');

        let plain_auth = buf.toString();

        let creds = plain_auth.split(':');
        
        let username = creds[0];
        let password = creds[1];

        console.log(username);

        if((username =="dipark@seavantage.com") && (password =="klnet1234")) {
            console.log(request);

                if ((request.query.carrierCode == (null||undefined)) || (request.query.datafrom == (null || undefined)) || (request.query.datato == (null || undefined))) {
                    response.status(400).send('bad request');
                    return;
                }
            

            const carrierCode = request.query.carrierCode.toUpperCase();
            const datafrom = request.query.datafrom;
            const datato = request.query.datato;
             
            // let sql = " select line_code, vessel_name, voyage_no, call_sign, route_code, a.port_code as pol, a.eta, a.etb, a.etd, b.port_code as calling_port, coalesce(b.eta, b.etb) as calling_eta, b.etd as calling_etd " +
            //           " from mfedi_tcs_vsl_sch a, mfedi_tcs_vsl_sch_port b " +
            //           " where a.voyage_sid = b.voyage_sid " +
            //           " and line_code ='"+carrierCode+"'" +
            //           " and a.etd between substr('"+ datafrom +"',1,8) and substr('"+datato+"', 1, 8)" +
            //           " order by a.voyage_sid, b.route_seq ";

                      
            let sql = 
                      " select line_code, vessel_name, voyage_no, call_sign, route_code, a.port_code as pol, a.eta, a.etb, a.etd, b.port_code as calling_port, coalesce(b.eta, b.etb) as calling_eta, b.etd as calling_etd " +
                      " from mfedi_tcs_vsl_sch a, mfedi_tcs_vsl_sch_port b " +
                      " where a.voyage_sid = b.voyage_sid " +
                      " and line_code ='"+carrierCode+"' " +
                      " and to_number(a.etd,'99999999') >= to_number(substr('"+datafrom+"',1,9),'99999999') " +
                      " and to_number(a.etd,'99999999') <= to_number(substr('"+datato+"',1,9),'99999999') " + 
                      " order by a.voyage_sid, b.route_seq ";
                       
                                                 



            console.log("query == ",sql);    
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
            



        }else {
            response.status(401);
            response.send('authorizationError');
        }
    
    }

}

module.exports = {
	apiScheduleInfo
}