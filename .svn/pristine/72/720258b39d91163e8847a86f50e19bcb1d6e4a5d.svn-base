'use strict';

const pgsqlPool = require("../pool.js").pgsqlPool
const basicauth = require("basic-auth");
const sUser = require('../../models/sessionUser');

const getDemDetList = (request, response) => {
	request.session.sUser = sUser;
    console.log( request.body );
    let sql_string = "";
    let params = [];

    sql_string =
    "select a.line_code as line_code, a.ie_type, a.bl_bkg, a.cntr_no, b.type_size, a.mbl_no, a.hbl_no, b.bkg_no, b.vsl_code, b.vsl_name, b.voyage, b.ter_ref_no, b.pol, b.pod "+
        ", to_char(to_date(b.eta,'YYYYMMDD'), 'YYYY-MM-DD') as eta, eta_time "+
        ", to_char(to_date(b.etd,'YYYYMMDD'), 'YYYY-MM-DD') as etd, etd_time "+
        ", to_char(to_timestamp(b.ata||b.ata_time,'YYYYMMDDHH24MI'),'YYYY-MM-DD HH24:MI') as ata, b.ata_time "+
        ", to_char(to_date(b.atd,'YYYYMMDD'), 'YYYY-MM-DD') as atd, b.atd_time "+
        ", to_char(to_timestamp(b.unloading_date,'YYYYMMDDHH24MI'), 'YYYY-MM-DD') as unloading_date "+
        ", to_char(to_timestamp(b.loading_date,'YYYYMMDDHH24MI'), 'YYYY-MM-DD') as loading_date "+
        ", to_char(to_timestamp(b.full_outgate_date,'YYYYMMDDHH24MI'), 'YYYY-MM-DD') as full_outgate_date "+
        ", to_char(to_timestamp(b.full_ingate_date,'YYYYMMDDHH24MI'), 'YYYY-MM-DD') as full_ingate_date "+
        ", to_char(to_timestamp(b.mt_outgate_date,'YYYYMMDDHH24MI'), 'YYYY-MM-DD') as mt_outgate_date "+
        ", to_char(to_timestamp(b.mt_ingate_date,'YYYYMMDDHH24MI'), 'YYYY-MM-DD') as mt_ingate_date "+
        ", b.ret_date, b.dem_date, b.osc_date "+
        ", trim(to_char(b.dem_amount,'999,999,999,999')) as dem_amount "+
        ", trim(to_char(b.dem_vat,'999,999,999,999')) as dem_vat "+
        ", b.dem_unit "+
        ", trim(to_char(b.det_amount,'999,999,999,999')) as det_amount "+
        ", trim(to_char(b.det_vat,'999,999,999,999')) as det_vat "+
        ", b.det_unit "+
        ", trim(to_char(b.combin_amount,'999,999,999,999')) as combin_amount "+
        ", trim(to_char(b.combin_vat,'999,999,999,999')) as combin_vat "+
        ", b.combin_unit  "+
        ", trim(to_char(b.osc_amount,'999,999,999,999')) as osc_amount "+
        ", trim(to_char(b.osc_vat,'999,999,999,999')) as osc_vat "+
        ", b.osc_unit "+
        ", a.remark "+
        "from own_user_dem_det a "+
        " left outer join own_dem_det b "+
        "   on a.line_code = b.line_code "+
        "  and a.bl_bkg = b.bl_bkg "+
        "  and a.cntr_no = b.cntr_no "+
        "where a.user_no = $1 ";

        params.push( request.session.sUser.userno );
        console.log("> request.session.sUser.userno :"+request.session.sUser.userno );
        sql_string += "order by a.line_code, a.insert_date desc ";

    const sql = {
        text: sql_string,
        values: params,
        rowMode: 'array',
    }

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
            response.status(200).json(result.rows);
            // console.log(result.fields.map(f => f.name));

        });

        // conn.release();
    });
}

const getTarrifList = (request, response) => { 
    //console.log(">> request.body :"+request.body);
    const sql = {
        text: "select bound, cntr_type, cntr_size, date1, date2, "+
              "       case when m_gubun = '1' then 'KRW' "+
              "            when m_gubun = '2' then 'USD' end m_gubun "+
              ", trim(to_char(cast(charge as float),'999,999,999,999'))  as charge "+
              ", to_char(to_date(begin_date,'YYYYMMDD'), 'YYYY-MM-DD') as begin_date "+
              ", to_char(to_date(expire_date,'YYYYMMDD'), 'YYYY-MM-DD') as expire_date "+
              "from mfedi_tcs_do_charge  "+
              "where line_code is not null  "+
              "and line_code = $1 "+
              "and dem_det_type = '1' "+  
            //   "and cntr_type = $2 "+
            //   "and cntr_size = $3 "+
              "order by line_code, bound, dem_det_type, cntr_type, cntr_size, date1, date2, begin_date, expire_date ",
              //values: [request.body.lineCode, request.body.cntrType, request.body.cntrSize],
              values: [request.body.lineCode],
        rowMode: 'array',
    }

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
            response.status(200).json(result.rows);
            // console.log(result.fields.map(f => f.name));

        });

        // conn.release();
    });
}
  
module.exports = {
    getDemDetList,
    getTarrifList,
}