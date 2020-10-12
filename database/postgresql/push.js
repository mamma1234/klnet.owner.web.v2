
const pgsqlPool = require("../pool.js").pgsqlPool
const basicauth = require("basic-auth");
const sUser = require('../../models/sessionUser');






const createPushUser = (request, response) => {
    console.log(request.body.deviceId)

    let sql = "";
    //유저생성
    sql += " INSERT INTO own_push_user "
    sql += " (user_no, device_id, fcm_token, device_os, push_use_yn, push_send_time_fm, push_send_time_to, device_model, last_recieve_date, insert_date) "
    sql += " VALUES( '" + sUser.userno + "', "
    sql += " '"+ request.body.deviceId +"', "
    sql += " '"+ request.body.fcm_token +"', "
    sql += " '"+ request.body.deviceOS +"', "
    sql += " 'Y', "
    sql += " '0000', "
    sql += " '2359', "
    sql += " '"+ request.body.deviceModel +"', "
    sql += " null, "
    sql += " now()); "
    //유저세팅 기본값
    sql +=" insert into own_push_user_setting (user_no, device_id, service_gubun, service_use_yn ) "
    sql +=" values('"+sUser.userno+"', '"+request.body.deviceId+"','NT', 'Y'),"
    sql +=" ('"+sUser.userno+"', '"+request.body.deviceId+"','DD', 'Y'),"
    sql +=" ('"+sUser.userno+"', '"+request.body.deviceId+"','TR', 'Y');"



    console.log(sql);
    pgsqlPool.connect(function(err,conn,release) {
        if(err){
            console.log("err" + err);
            release();
            response.status(400).send(err);
        } else {
            conn.query(sql, function(err,result){
                // done();
                if(err){
                    console.log(err);
                    release();
                    response.status(400).send(err);
                } else {
                    if(result != null) {
                    	release();
                        response.status(200).json(result.rows);
                    } else {
                    	release();
                        response.status(200).json([]);
                    }
                }
            });

        }

    });
}

const checkPushUser = (request, response) => {
    console.log(request.body.deviceId)
    let sql ="";
    sql += " select *, "
    sql += " (select service_use_yn from own_push_user_setting where user_no = a.user_no and device_id = a.device_id and service_gubun ='NT') as noti_service, "
    sql += " (select service_use_yn from own_push_user_setting where user_no = a.user_no and device_id = a.device_id and service_gubun ='DD') as demdet_service, "
    sql += " (select service_use_yn from own_push_user_setting where user_no = a.user_no and device_id = a.device_id and service_gubun ='TR') as tracking_service "
    sql += " from own_push_user a"
    sql += " where 1=1 "
    sql += " and user_no ='"+ sUser.userno +"'"
    sql += " and device_id = '"+ request.body.deviceId +"'"
    sql += " order by insert_date desc "

    console.log(sql);
    pgsqlPool.connect(function(err,conn,release) {
        if(err){
            console.log("err" + err);
            release();
            response.status(400).send(err);
        } else {
            conn.query(sql, function(err,result){
                // done();
                if(err){
                    console.log(err);
                    release();
                    response.status(400).send(err);
                } else {
                    if(result != null) {
                    	release();
                        response.status(200).json(result.rows);
                    } else {
                    	release();
                        response.status(200).json([]);
                    }
                }
            });

        }

    });
}

const deletePushUser = (request, response) => {
    let sql = "";

    sql +=" delete from own_push_user "
    sql +=" where user_no='"+sUser.userno+"'"
    sql +=" and device_id='"+request.body.deviceId+"';"
    sql +=" delete from own_push_user_setting "
    sql +=" where user_no='"+sUser.userno+"'"
    sql +=" and device_id='"+request.body.deviceId+"';"
    


    console.log(sql);
    pgsqlPool.connect(function(err,conn,release) {
        if(err){
            console.log("err" + err);
            release();
            response.status(400).send(err);
        } else {
            conn.query(sql, function(err,result){
                // done();
                if(err){
                    console.log(err);
                    release();
                    response.status(400).send(err);
                } else {
                    if(result != null) {
                    	release();
                        response.status(200).json(result.rows);
                    } else {
                    	release();
                        response.status(200).json([]);
                    }
                }
            });

        }

    });    
}
const updatePushToken = (request, response) => {
    let sql = "";
    
    sql += " update own_push_user set fcm_token = '"+request.body.fcmToken+"'"
    sql += " where user_no='"+sUser.userno+"'"
    sql += " AND device_id='"+request.body.deviceId+"'"
    console.log(sql);
    pgsqlPool.connect(function(err,conn,release) {
        if(err){
            console.log("err" + err);
            release();
            response.status(400).send(err);
        } else {
            conn.query(sql, function(err,result){
                // done();
                if(err){
                    console.log(err);
                    release();
                    response.status(400).send(err);
                } else {
                    if(result != null) {
                    	release();
                        response.status(200).json(result.rows);
                    } else {
                    	release();
                        response.status(200).json([]);
                    }
                }
            });

        }

    });        
}

const pushUserSettingUpdate = (request, response) => {
    let sql = "";
    
    sql += " update own_push_user set "

    if(request.body.updateGubun === "startTime") {
        sql += " push_send_time_fm = '"+request.body.param+"' "
    }else if (request.body.updateGubun === "endTime") {
        sql += " push_send_time_to = '"+request.body.param+"' "
    }else if (request.body.updateGubun === "any") {
        sql += " push_send_time_fm ='0000', push_send_time_to ='2359' "
    }
    else {
        return;
    }

    sql += " where user_no='"+sUser.userno+"'"
    sql += " AND device_id='"+request.body.deviceId+"'"
    console.log(sql);
    pgsqlPool.connect(function(err,conn,release) {
        if(err){
            console.log("err" + err);
            release();
            response.status(400).send(err);
        } else {
            conn.query(sql, function(err,result){
                // done();
                if(err){
                    console.log(err);
                    release();
                    response.status(400).send(err);
                } else {
                    if(result != null) {
                    	release();
                        response.status(200).json(result.rows);
                    } else {
                    	release();
                        response.status(200).json([]);
                    }
                }
            });

        }

    });        
}

const pushServiceGubun = (request, response) => {
    let sql = "";
    let yn = request.body.param === true?"Y":"N"

    sql += " update own_push_user_setting set service_use_yn = '"+yn+"'";
    sql += " where user_no='"+sUser.userno+"'"
    sql += " and device_id='"+request.body.deviceId+"'"
    
    if(request.body.updateGubun === "NOTICE") {
        sql += " and service_gubun = 'NT' "
    }else if (request.body.updateGubun === "DEMDET") {
        sql += " and service_gubun = 'DD' "
    }else if (request.body.updateGubun === "TRACKING") {
        sql += " and service_gubun = 'TR' "
    }


    console.log(sql);
    pgsqlPool.connect(function(err,conn,release) {
        if(err){
            console.log("err" + err);
            release();
            response.status(400).send(err);
        } else {
            conn.query(sql, function(err,result){
                // done();
                if(err){
                    console.log(err);
                    release();
                    response.status(400).send(err);
                } else {
                    if(result != null) {
                    	release();
                        response.status(200).json(result.rows);
                    } else {
                    	release();
                        response.status(200).json([]);
                    }
                }
            });

        }

    });        
}


module.exports = {
    createPushUser,
    checkPushUser,
    deletePushUser,
    updatePushToken,
    pushUserSettingUpdate,
    pushServiceGubun,
}