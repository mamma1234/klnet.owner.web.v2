'use strict';

const request = require('request');
const convert = require('xml-js');
const config = require('./uniPassConfig');

// 서비스ID : API001
// 서비스명 : 화물통관 진행 정보
// 서비스명 : retriveCargCsclPrgsInfo
// 서비스설명 : 수입화물의 일반정보와 진행상태별 정보 제공
const API001 = (req, res) => {

    if( !req.body.blYy ) {
        res.status(401).send('NO_BLYY');
    }
    if( !req.body.mblNo) {
        res.status(401).send('NO_MBLNO');
    }

    // let authorization = req.headers['authorization'];
    // if (!authorization) {
    //     res.status(401).send('Unauthorization');
    // } else {
    // CORS 처리를 위한 response HEADER 처리
    const OPTIONS = {
        "Access-Control-Allow-Origin":"*",
        "Access-Control-Allow-Methods":"GET,POST,PUT,DELETE,OPTIONS",
        "Access-Control-Allow-Max-Age":"3600",
        "Access-Control-Allow-Headers":"Origin,Accept,X-Requested,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers,Authorization"
    }
    // API URL 조합한다.
    let uni_url = config.UNI_PASS_URL+config.IMPORT_URL+'?&crkyCn='+config.UNI_API_KEY_IMPORT+'&blYy='+req.body.blYy+'&mblNo='+req.body.mblNo;
    // console.log(uni_url);
    request({
        // url:'https://unipass.customs.go.kr:38010/ext/rest/cargCsclPrgsInfoQry/retrieveCargCsclPrgsInfo?&crkyCn=x240d195q172y239h040w070v0&blYy=2020&mblNo=NSSLASHA20D00262',
        // url:'https://unipass.customs.go.kr:38010/ext/rest/cargCsclPrgsInfoQry/retrieveCargCsclPrgsInfo?&crkyCn=x240d195q172y239h040w070v0&blYy=2020&mblNo=COAU7223267940',
        url : uni_url,
        method:'GET'
    }, (error, apiRes, xml ) => {
        apiRes.headers = OPTIONS;
        if(error) {
            console.log('UNI-PASS API001 Error:', error);
            res.status(error.statusCode).send(error.statusCode);
        } else {
            if( apiRes.statusCode == 200 ) {
                let json = convert.xml2json(xml, {compact:true,spaces:4});
                let jsonParse = JSON.parse( json );
                let checkVo = jsonParse.cargCsclPrgsInfoQryRtnVo;
                
                // API 데이터 표준 XML -> json -> json Parse 처리하여 _text가 붙는다.
                let returnList = [];
                // ntceInfo 데이터는 오류일경우 데이터(_text)가 존재하고 정상일 경우 데이터(_text)가 없다.
                if( !checkVo.ntceInfo.hasOwnProperty('_text') ) {
                    // console.log( "단건", checkVo.ntceInfo );
                    // 오류가 아니면서(ntceInfo._text) tCnt가 0 인 경우 데이터가 없음.
                    if( 0 == checkVo.tCnt._text ) {
                        // 조회 정보가 없는 경우
                        let returnValue = {
                            "message":'NO_DATA',
                            "mbl_no":'',
                            "hbl_no":'',
                            "clearance":'',
                            "clearance_date":'',
                            "mt_trgt_carg_yn_nm":'',
                        }
                        returnList.push( returnValue );
                        res.status(200).send(returnList);
                    } else {
                        // console.log( checkVo.tCnt );
                        // 조회 정보가 존재 하는 경우
                        if( 0 < checkVo.tCnt._text ) {
                            const returnValue = {
                                "message":'',
                                "mbl_no":jsonParse.cargCsclPrgsInfoQryRtnVo.cargCsclPrgsInfoQryVo.mblNo._text,
                                "hbl_no":jsonParse.cargCsclPrgsInfoQryRtnVo.cargCsclPrgsInfoQryVo.hblNo._text,
                                "clearance":jsonParse.cargCsclPrgsInfoQryRtnVo.cargCsclPrgsInfoDtlQryVo[0].cargTrcnRelaBsopTpcd._text,
                                "clearance_date":jsonParse.cargCsclPrgsInfoQryRtnVo.cargCsclPrgsInfoDtlQryVo[0].prcsDttm._text,
                                "mt_trgt_carg_yn_nm":jsonParse.cargCsclPrgsInfoQryRtnVo.cargCsclPrgsInfoQryVo.mtTrgtCargYnNm._text,
                            }
                            returnList.push( returnValue );
                        } else {
                            const returnValue = {
                                "message":'',
                                "mbl_no":jsonParse.cargCsclPrgsInfoQryRtnVo.cargCsclPrgsInfoQryVo.mblNo._text,
                                "hbl_no":jsonParse.cargCsclPrgsInfoQryRtnVo.cargCsclPrgsInfoQryVo.hblNo._text,
                                "clearance":'',
                                "clearance_date":'',
                                "mt_trgt_carg_yn_nm":jsonParse.cargCsclPrgsInfoQryRtnVo.cargCsclPrgsInfoQryVo.mtTrgtCargYnNm._text,
                            }
                            returnList.push( returnValue );
                        }
                        res.status(200).send( returnList );
                    }
                } else {
                    // console.log( "다건", checkVo.ntceInfo );
                    // 다건의 경우 URL 재 호출
                    // cargMtNo 항목을 추출하여 다건의 갯수만큼 loop
                    const loop = jsonParse.cargCsclPrgsInfoQryRtnVo.cargCsclPrgsInfoQryVo;

                    let returnList = [];
                    let count = 0;
                    loop.forEach( element =>{
                        // console.log("2");
                        let cargMtNo = element.cargMtNo._text;
                        // API URL 조합한다.
                        let uni_url2 = config.UNI_PASS_URL+config.IMPORT_URL+'?&crkyCn='+config.UNI_API_KEY_IMPORT+'&cargMtNo='+cargMtNo;
                        // console.log(uni_url2);
                        getExportApiList(uni_url2).then(function( returnValue ){
                            count++;
                            returnList.push(returnValue);
                            if( loop.length == count ) {
                                res.status(200).send( returnList );
                            }
                        }).catch(function( err ){
                            res.status(401).send( err );
                        });
                    });
                }
            }
        }
    });
}

// 다건의 경우 단건을 조회 하는 Request 결과 값으로 취합
// Promise 처리함.
function getExportApiList( uni_url2 ) {
    const OPTIONS = {
        "Access-Control-Allow-Origin":"*",
        "Access-Control-Allow-Methods":"GET,POST,PUT,DELETE,OPTIONS",
        "Access-Control-Allow-Max-Age":"3600",
        "Access-Control-Allow-Headers":"Origin,Accept,X-Requested,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers,Authorization"
    }
    let returnValue = {};
    return new Promise( function( resolve, reject ) {
        request({
            url:uni_url2,
            method:'GET'
        }, (error2, apiRes2, xml2 ) => {
            apiRes2.headers = OPTIONS;
            if(error2) {
                console.log('UNI-PASS API001 Error:', error2);
                reject(error2);
            } else {
                let json2 = convert.xml2json(xml2, {compact:true,spaces:4});
                let jsonParse2 = JSON.parse( json2 );
                let checkVo2 = jsonParse2.cargCsclPrgsInfoQryRtnVo;
                if( !checkVo2.ntceInfo.hasOwnProperty('_text') ) {
                    // console.log( "단건", checkVo2.ntceInfo );
                    if( 0 == checkVo2.tCnt._text ) {
                        // 조회 정보가 없는 경우
                        returnValue = {
                            "message":'NO_DATA',
                            "mbl_no":'',
                            "hbl_no":'',
                            "clearance":'',
                            "clearance_date":'',
                            "mt_trgt_carg_yn_nm":'',
                        }
                        // returnList.push( returnValue );
                        // res.status(200).send(returnList);
                    } else {
                        // console.log( checkVo2.tCnt );
                        // 조회 정보가 존재 하는 경우
                        if( 0 < checkVo2.tCnt._text ) {
                            returnValue = {
                                "message":'',
                                "mbl_no":jsonParse2.cargCsclPrgsInfoQryRtnVo.cargCsclPrgsInfoQryVo.mblNo._text,
                                "hbl_no":jsonParse2.cargCsclPrgsInfoQryRtnVo.cargCsclPrgsInfoQryVo.hblNo._text,
                                "clearance":jsonParse2.cargCsclPrgsInfoQryRtnVo.cargCsclPrgsInfoDtlQryVo[0].cargTrcnRelaBsopTpcd._text,
                                "clearance_date":jsonParse2.cargCsclPrgsInfoQryRtnVo.cargCsclPrgsInfoDtlQryVo[0].prcsDttm._text,
                                "mt_trgt_carg_yn_nm":jsonParse2.cargCsclPrgsInfoQryRtnVo.cargCsclPrgsInfoQryVo.mtTrgtCargYnNm._text,
                            }
                            // console.log(returnValue);
                            // returnList.push( returnValue );
                            // console.log( returnList );
                        } else {
                            returnValue = {
                                "message":'',
                                "mbl_no":jsonParse2.cargCsclPrgsInfoQryRtnVo.cargCsclPrgsInfoQryVo.mblNo._text,
                                "hbl_no":jsonParse2.cargCsclPrgsInfoQryRtnVo.cargCsclPrgsInfoQryVo.hblNo._text,
                                "clearance":'',
                                "clearance_date":'',
                                "mt_trgt_carg_yn_nm":jsonParse2.cargCsclPrgsInfoQryRtnVo.cargCsclPrgsInfoQryVo.mtTrgtCargYnNm._text,
                            }
                            // returnList.push( returnValue );
                        }
                    }
                } else {
                    returnValue = {
                        "message":'NOT_EXISTS_CASE',
                        "mbl_no":'',
                        "hbl_no":'',
                        "clearance":'',
                        "clearance_date":'',
                        "mt_trgt_carg_yn_nm":'',
                    }
                    // returnList.push( returnValue );
                }
            }
            resolve(returnValue);
        });
    });
}


// 서비스ID : API002
// 서비스명 : 수출신고번호별 수출이행 내역
// 서비스명 : retrieveExpDclrNoPrExpFfmnBrkd
// 서비스설명 : 수출신곡번호별 수출이행내역 및 잔량 정보 제공
const API002 = (req, res) => {
    if( !req.body.mblNo) {
        res.status(401).send('NO_MBLNO');
    }
    
    // CORS 처리를 위한 response HEADER 처리
    let OPTIONS = {
        "Access-Control-Allow-Origin":"*",
        "Access-Control-Allow-Methods":"GET,POST,PUT,DELETE,OPTIONS",
        "Access-Control-Allow-Max-Age":"3600",
        "Access-Control-Allow-Headers":"Origin,Accept,X-Requested,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers,Authorization"
    }
    
    // API URL 조합한다.
    let uni_url = config.UNI_PASS_URL+config.EXPORT_URL+'?&crkyCn='+config.UNI_API_KEY_EXPORT+'&blNo='+req.body.mblNo;
    // console.log(uni_url);
    request({
        // url : 'https://unipass.customs.go.kr:38010/ext/rest/expDclrNoPrExpFfmnBrkdQry/retrieveExpDclrNoPrExpFfmnBrkd?crkyCn=c250r165v102q229m080h090a0&blNo=MIQOSEL001873',
        url : uni_url,
        method:'GET'
    }, (error, apiRes, xml ) => {
        apiRes.headers = OPTIONS;
        if(error) {
            console.log('UNI-PASS API002 Error:', error);
            res.status(error.statusCode).send(error.statusCode);
        } else {
            if( apiRes.statusCode == 200 ) {
                let json = convert.xml2json(xml, {compact:true,spaces:4});
                let jsonParse = JSON.parse( json );
                let checkVo = jsonParse.expDclrNoPrExpFfmnBrkdQryRtnVo;

                let returnList = [];
                // console.log( checkVo );
                // 정상 적인 경우
                if ( 1 == checkVo.tCnt._text ) {
                    // 단건 조회 한 경우
                    let returnValue = {
                        'message' : '',
                        'exp_dclr_no':jsonParse.expDclrNoPrExpFfmnBrkdQryRtnVo.expDclrNoPrExpFfmnBrkdBlNoQryRsltVo.expDclrNo._text,
                        'tkof_dt':jsonParse.expDclrNoPrExpFfmnBrkdQryRtnVo.expDclrNoPrExpFfmnBrkdBlNoQryRsltVo.tkofDt._text,
                        'shpm_cmpl_yn':jsonParse.expDclrNoPrExpFfmnBrkdQryRtnVo.expDclrNoPrExpFfmnBrkdBlNoQryRsltVo.shpmCmplYn._text,
                    }
                    returnList.push( returnValue );
                    // console.log(returnList  );
                    res.status(200).send(returnList);
                } else if ( 1 < checkVo.tCnt._text ) {
                    // 다건 조회 한 경우
                    jsonParse.expDclrNoPrExpFfmnBrkdQryRtnVo.expDclrNoPrExpFfmnBrkdBlNoQryRsltVo.forEach( element =>{
                        let returnValue = {
                            'message' : '',
                            'exp_dclr_no':element.expDclrNo._text,
                            'tkof_dt':element.tkofDt._text,
                            'shpm_cmpl_yn':element.shpmCmplYn._text,
                        }
                        returnList.push( returnValue );
                    });
                    // console.log(returnList  );
                    res.status(200).send(returnList);
                } else if ( 0 == checkVo.tCnt._text ) {
                    // 오류 난 경우
                    let returnValue = {
                        'message' : 'NO_DATA',
                        'exp_dclr_no':'',
                        'tkof_dt':'',
                        'shpm_cmpl_yn':'',
                    }
                    returnList.push( returnValue );
                    // console.log(returnList  );
                    res.status(200).send(returnList);
                } else if ( 0 > checkVo.tCnt._text ) {
                    // 오류 난 경우
                    let returnValue = {
                        'message' : checkVo.ntceInfo._text,
                        'exp_dclr_no':'',
                        'tkof_dt':'',
                        'shpm_cmpl_yn':'',
                    }
                    returnList.push( returnValue );
                    // console.log(returnList  );
                    res.status(200).send(returnList);
                }
            }
        }
    });

}


module.exports = {
    API001,
    API002,
}