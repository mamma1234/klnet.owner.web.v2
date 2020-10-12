'use strict';
const express = require("express");

const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
//const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
//const auth = require('basic-auth');
require('dotenv').config();
const cookieSession = require('cookie-session');

const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth');

// const { sequelize } = require('./models');
const passportConfig = require('./passport');
const bodyParser = require("body-parser");
const dao = require('./database/');

const apiService = require('./apiService/openApi');
const uniPassApiService = require('./apiService/uniPassOpenApi');
const downloadExcel = require('./downLoadFile/downloadService');
// const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn, isVerifyToken } = require('./routes/middlewares');

const app = express();
// sequelize.sync();
passportConfig(passport);
const swaggerRouter = require('./swagger/swaggerDoc'); //swagger 설정 정의
const sUser = require('./models/sessionUser');
const useragent = require('express-useragent');
//console.log("sUser:",sUser);


const java = require('java');

const jarFile = __dirname + path.sep +'lib'+path.sep+'OkCert3-java1.5-2.2.3.jar';
java.classpath.push(jarFile);
app.set('trust proxy',true);
app.use(useragent.express());
app.set('views', path.join(__dirname, 'views')); //템플리트 엔진을 사용 1
app.set('view engine', 'pug'); //템플리트 엔진을 사용 2
app.use(swaggerRouter);//swagger API
app.use(morgan('dev')); //morgan: 요청에 대한 정보를 콘솔에 기록
app.use(express.static(path.join(__dirname, 'public'))); //static: 정적인 파일을 제공, public 폴더에 정적 폴더를 넣는다.
app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({ limit:"50mb",extended: false }));

app.use(cookieParser('nodebirdsecret')); //cookie-parser: 요청에 동봉된 쿠키를 해석

/*app.use(cookieSession({   //express-session: 세션 관리용 미들웨어, 로그인 드의 이유로 세션을 구현할 때 유용하다.
    resave: false,
    saveUninitialized: false,
    secret: 'nodebirdsecret',
    cookie: {
        httpOnly: true,
        secure: false,
        rolling:true,
        //store:sessionStore,
        //saveUninitialized:true,
        maxAge: 1000 * 60 * 60, // 유효기간 1시간
    },
}));*/

	 
// app.use(cookieSession({
//     keys: ['node_yun'],
//     cookie: {
//       maxAge: 1000 * 60 * 60 // 유효기간 1시간
//     }
// }));
app.use(flash()); //connect-flash: 일회성 메시지들을 웹 브라우저에 나타낼 때 사용한다. cookie-parser와 express-session 뒤에 위치해야한다.
app.use(passport.initialize());
//app.use(passport.session());

/*
2020.01.21 pdk ship 개발 혹은 테스트 기간중 아래 세션 체크 로직 편의상 막아도 됨

app.route(/^((?!\/auth\/|\/login).)*$/s).all(function(req, res, next) {    
	var path = req.params[0];
	console.log("(server.js) path:",path);
    // if (req.isAuthenticated !== undefined && req.isAuthenticated()){
    if (req.isAuthenticated()){
      console.log('로그인 정보 남아 있음.', req.session.sUser);
      next();
    } else {
      var fullUrl = req.protocol + '://' + req.headers.host + req.originalUrl;
      console.log( fullUrl );
      console.log('로그인 정보 없음 예외 처리');
      // console.log(req.headers.host);
      // return res.redirect('http://' + req.headers.host + '/login/?redirect=' + fullUrl);
      //return res.redirect('http://' + req.headers.host + '/login');

      // return;
      // const err = new Error('Not Found');
      // err.status = 404;
      // next(err);

      // req.logout();
      // req.session.destroy();
      // res.redirect('/');   
      // return res.redirect('http://' + req.headers.host + '/auth/');
      // return res.redirect('/auth/logout');
      // next('/auth/logout');
      next('not login');
    }

	// if ( req.session.user ) { 
	// 	console.dir( req.session.user );
	// 	console.log('로그인 정보 남아 있음.');
	// 	next();
	// } else {
	// 	var fullUrl = req.protocol + '://' + req.headers.host + req.originalUrl;
	// 	console.log( fullUrl );
  //       console.log('로그인 정보 없음 예외 처리');
  //       console.log(req.headers.host);
  //       // return res.redirect('http://' + req.headers.host + '/login/?redirect=' + fullUrl);
  //       //return res.redirect('http://' + req.headers.host + '/login');

  //       return;
  // }
})
*/

app.use('/', pageRouter); // 2020.04.17 pdk ship Login 필요 없는 페이지 정의 혹은 Login 전 접근해야 하는 페이지 정의

app.route(/^((?!\/auth\/|\/api\/).)*$/s).all(isVerifyToken,function(req, res, next) {    
	var path = req.params[0];
  //console.log("(server.js) path:",path);

//  if ( req.session.sUser.userno ) { 
//     console.dir( req.session.sUser );
//     console.log('로그인 정보 남아 있음.');
//     console.log(req.originalUrl);
     next();
  //} else {
    
//     var fullUrl = req.protocol + '://' + req.headers.host + req.originalUrl;
//    // console.log( fullUrl );
//     console.log('로그인 정보 없음 예외 처리');
//     //console.log(req.headers.host);
//     req.logout();
//     //res.clearCookie('connect.sid');

	  //     return res.status(401).json({ errorcode: 401, error: 'unauthorized' });
//  }
	  
});

app.use('/auth', authRouter);


app.use(bodyParser.json()); //요청의 본문을 해석해주는 미들웨어 1
app.use(bodyParser.urlencoded({ extended: true })); //요청의 본문을 해석해주는 미들웨어 2


// const oracleConfig = require('./config_oracle.js');
// const pgsqlConfig = require('./config_postgresql.js');



//데이터베이스 사용 방법 아래 API 참조
//ORACLE API https://oracle.github.io/node-oracledb/doc/api.html
//POSTGRES API https://node-postgres.com/api
//DB별 서비스별 klnet.owner.web\database\oracle\, klnet.owner.web\database\postgresql\ 위치에 파일 만들고 쿼리별 함수 선언
//위 함수를 해당 파일의 module에 module.exports 를 등록하여 사용
//get, post, put, delete 등 method 별로 exports한 함수를 맵핑하여 사용
//하위 예시 참조
//klnet.owner.web\database\oracle\template.js
//klnet.owner.web\database\postgresql\template.js 

//ORACLE API https://oracle.github.io/node-oracledb/doc/api.html
//POSTGRES API https://node-postgres.com/api

app.get("/auth/getTestQuerySample", dao.postgresql.getTestQuerySample);
//위치
app.get("/loc/downloadExcel",downloadExcel.blExcelDownload);
app.get("/loc/getTestSimple", dao.postgresql.getTestSimple);
//app.post("/loc/getPortLocation",dao.postgresql.getPortLocation);
app.post("/loc/getPort",dao.postgresql.getPort);
app.post("/loc/getCustomLineCode", dao.pgcodes.getCustomLineCode);
app.get("/loc/getTestQuerySample", dao.postgresql.getTestQuerySample);
app.get("/loc/getTestQueryParamSample", dao.postgresql.getTestQueryParamSample);
app.post("/loc/getTestQueryAttibuteSample", dao.postgresql.getTestQueryAttibuteSample);
app.post("/loc/getTrackingTerminal", dao.pgtracking.getTrackingTerminal);
//app.post("/loc/getCustomLineCode", dao.tracking.getCustomLineCode);
app.post("/loc/getTrackingList", dao.pgtracking.getTrackingList);
app.post("/loc/getMyBlList", dao.pgtracking.getMyBlList);
app.post("/loc/setUserBLUpdate", dao.pgtracking.setUserBLUpdate);
app.post("/loc/getPkMyBlList", dao.pgtracking.getPkMyBlList);
app.post("/loc/getPkMyUpdateBlList", dao.pgtracking.getPkMyUpdateBlList);
app.post("/loc/deleteMyBlNo", dao.pgtracking.deleteMyBlNo);
app.post("/loc/getBookMark", dao.pgtracking.getBookMark);
app.post("/loc/getCntrList", dao.pgtracking.getCntrList);
app.post("/loc/getCntrDetailList", dao.pgtracking.getCntrDetailList);
app.post("/loc/saveBlList", dao.pgtracking.saveBlList);
app.post("/loc/insertBlRequest",dao.pgtracking.insertBlRequest);
app.post("/loc/getDemdetDtlCurrent",dao.pgtracking.getDemdetDtlCurrent);
app.post("/loc/getdemdetCurrent", dao.pgtracking.getdemdetCurrent);
app.post("/loc/getDemdetCntrList", dao.pgtracking.getDemdetCntrList);
app.post("/loc/getHotInfo", dao.tracking.getHotInfo);
app.post("/loc/getImportDemDetList", dao.pgdemdet.getImportDemDetList);
app.post("/loc/getExportDemDetList", dao.pgdemdet.getExportDemDetList);
app.post("/loc/getTarrifList", dao.pgdemdet.getTarrifList);
app.post("/loc/getScrapManageList", dao.pgtracking.getScrapManageList);
app.post("/loc/getScrapLineCodeList", dao.pgtracking.getScrapLineCodeList);
app.post("/loc/getLineScrapingResultData", dao.pgtracking.getLineScrapingResultData);
app.post("/loc/getHeaderForLine", dao.pgtracking.getHeaderForLine);
app.post("/loc/getImportTerminalActivity", dao.pgtracking.getImportTerminalActivity);
app.post("/loc/getExportTerminalActivity", dao.pgtracking.getExportTerminalActivity);
app.post("/loc/getDemDetPort", dao.pgdemdet.getDemDetPort);
app.post("/loc/getDemDetInTerminal",dao.pgdemdet.getDemDetInTerminal);
app.post("/loc/getDemDetOutTerminal",dao.pgdemdet.getDemDetOutTerminal);
app.post("/loc/getTsTracking", dao.pgtracking.getTsTracking);
app.post("/loc/checkCntrNumber", dao.pgtracking.getTrackingDate);
app.post("/loc/getContainerMovement", dao.pgtracking.getContainerMovement);


//공통

app.post("/com/getBoardSearch", dao.postgresql.getBoardSearch);
app.post("/com/getDemDetOsc", dao.postgresql.getDemDetOsc);
app.post("/com/getThreadSearch", dao.postgresql.getThreadSearch);
app.post("/com/getImportingList", dao.pgstat.getImportingList);
app.post("/com/getExportingList", dao.pgstat.getExportingList);
app.post("/com/getCarrierStatList", dao.pgstat.getCarrierStatList);
app.post("/com/getCarrierStatInfo", dao.pgstat.getCarrierStatInfo);
app.post("/com/getExportStatInfo", dao.pgstat.getExportStatInfo);
app.post("/com/getImportStatInfo", dao.pgstat.getImportStatInfo);
app.post("/com/getDemdetStatInfo", dao.pgstat.getDemdetStatInfo);
app.post("/com/getStatInfo", dao.pgstat.getStatInfo);
app.post("/com/getUserSetting", dao.pgtracking.getUserSetting);
app.post("/com/getCarrierInfo", dao.pgtracking.getCarrierInfo);
app.post("/com/setUserSetting", dao.pgtracking.setUserSetting);
app.post("/com/getUserInfo", dao.pgusers.getUserInfo);
app.get("/com/getPortCodeInfo", dao.pgcodes.getPortCodeInfo);
app.post("/com/getPortCode", dao.pgcodes.getPortCode);
app.post("/com/getTrackingPortCode", dao.pgcodes.getPortTrackingCode);
app.post("/com/getUserInfoSample", dao.postgresql.getUserInfoSample);
app.post("/com/getImpFlowSample", dao.oracle.getImpFlowSample);
app.post("/com/getExpFlowSample", dao.oracle.getExpFlowSample);
app.post("/com/getBoardList", dao.pgboard.getBoardList);
app.post("/com/getBoardDetail", dao.pgboard.getBoardDetail);
app.post("/com/saveBoard", dao.pgboard.saveBoard);
app.post("/com/deleteBoard", dao.pgboard.deleteBoard);
app.post("/com/getBoardDataList", dao.pgboard.getBoardDataList);
app.post("/com/saveAttach", dao.pgboard.saveAttach);
app.post("/com/getBoardAttach", dao.pgboard.getBoardAttach);
app.post("/com/boardAttachDown", function (req, res) {
  if(req.body.fileName == undefined || req.body.filePath == undefined){
    res.status(400).send("");
  } else {
    res.download("/OWNER" + "/" + req.body.filePath + "/" + req.body.fileName, req.body.fileName);
  }
});
//코드

app.post("/com/setExcelData", dao.postgresql.saveExcelData);
app.post("/com/getExcelSchLogList", dao.postgresql.getExcelSchLogList);
app.post("/com/getErrorLogList", dao.pgcodes.getErrorLogList);
app.post("/com/getUserData", dao.pgcodes.getUserData);
app.post("/com/getUserRequest", dao.pgcodes.getUserRequest);
app.post("/com/getTerminalInfo", dao.pgcodes.getTerminalInfo);
app.post("/com/getCodecuship", dao.pgcodes.getCodecuship);
app.post("/com/getUserSettingSample", dao.pgusers.getUserSettingSample);
app.post("/com/getPortLocation",dao.pgcodes.getPortLocation);
app.post("/com/getVslTypeList", dao.pgcodes.getVslTypeList);
app.post("/com/getVslInfoList", dao.pgcodes.getVslInfoList);
app.post("/com/getNationName", dao.pgcodes.getNationInfo);
//스케줄
app.post("/sch/getScheduleSample", dao.schedule.getScheduleSample);
app.post("/sch/getTestQueryAttibuteSample", dao.oracle.getTestQueryAttibuteSample);
app.post("/sch/snkMasterList", dao.postgresql.getSnkMasterList );
app.post("/sch/kmdMasterList", dao.postgresql.getKmdMasterList );
app.post("/sch/ymlMasterList", dao.postgresql.getYmlMasterList );
app.post("/sch/getCarrierInfo", dao.schedule.getCarrierInfo);
app.post("/sch/getScheduleList", dao.schedule.getScheduleList);
app.post("/sch/getPortCodeInfo", dao.schedule.getPortCodeInfo);
app.post("/sch/getLinePicInfo", dao.schedule.getLinePicInfo);
app.post("/sch/getScheduleDetailList", dao.schedule.getScheduleDetailList);
app.post("/sch/getSchedulePortCodeList", dao.schedule.getSchedulePortCodeList);
app.post("/sch/insertSchPortCode", dao.schedule.insertSchPortCode);
app.post("/sch/updateSchPortCode", dao.schedule.updateSchPortCode);
app.post("/sch/deleteSchPortCode", dao.schedule.deleteSchPortCode);
app.post("/sch/getServiceCarrierList", dao.schedule.getServiceCarrierList);
app.post("/sch/getTerminalScheduleList", dao.schedule.getTerminalScheduleList);
app.post("/sch/getTerminalCodeList", dao.schedule.getTerminalCodeList);
app.post("/sch/getTSCodeList", dao.schedule.getTSCodeList);
app.post("/sch/insertTSCode", dao.schedule.insertTSCode);
app.post("/sch/updateTSCode", dao.schedule.updateTSCode);
app.post("/sch/deleteTSCode", dao.schedule.deleteTSCode);
app.post("/sch/getPicCodeList", dao.schedule.getPicCodeList);
app.post("/sch/insertPicCode", dao.schedule.insertPicCode);
app.post("/sch/updatePicCode", dao.schedule.updatePicCode);
app.post("/sch/deletePicCode", dao.schedule.deletePicCode);
app.post("/sch/shipChargeList", dao.schedule.shipChargeList)

//사용자 알림
app.post("/com/getUserMessage", dao.pgusers.getUserMessage);
app.post("/com/getUserNotice", dao.pgusers.getUserNotice);
app.post("/com/getUserMoreNotice", dao.pgusers.getUserMoreNotice);
app.post("/com/createApikey", dao.pgcodes.createApiKey);
app.post("/com/duplicateCheck", dao.pgcodes.duplicateCheck);



//외부 api
app.get("/api/apiSchedule", apiService.apiScheduleInfo);
app.post("/com/balticApi", apiService.apiBaltic);
app.post("/com/scfiapi", apiService.apiscfi);
app.post("/com/teuApi", apiService.apiteuRank);
app.post("/com/searchship",apiService.seaventageShipSearch);
app.post("/com/searchTrack",apiService.seaventageTrackSearch);
// UNI PASS API 호출용 
app.post("/com/uniPassApiExportAPI001", uniPassApiService.API001);
app.post("/com/uniPassApiExportAPI002", uniPassApiService.API002);
app.post("/com/uniPassXtrnUserReqApreBrkd",uniPassApiService.API003);
app.post("/com/uniPassShedInfo", uniPassApiService.API005);
app.post("/com/uniPassApiFrwrLst", uniPassApiService.API006);
app.post("/com/uniPassApiFrwrBrkd", uniPassApiService.API007);
app.post("/com/uniPassApiFlcoLst", uniPassApiService.API008);
app.post("/com/uniPassApiFlcoBrkd", uniPassApiService.API009);
//app.post("/com/uniPassApiretrieveFlcoBrkd", uniPassApiService.API009);
app.post("/com/uniPassApiecmQry", uniPassApiService.API010);
app.post("/com/uniPassOvrsSplrSgn", uniPassApiService.API011);
app.post("/com/uniPassApiTrifFxrtInfo", uniPassApiService.API012);
app.post("/com/uniPassRetrieveLca",uniPassApiService.API013);
app.post("/com/uniPassRetrieveLcaDt",uniPassApiService.API014);
app.post("/com/uniPassApiSimlXamrttQry", uniPassApiService.API015);
app.post("/com/uniPassApiSimlFxamtQry", uniPassApiService.API016);
app.post("/com/uniPassExpFfmnPridShrtTrgtPrlst",uniPassApiService.API017);
app.post("/com/uniPassApiHsSgn",uniPassApiService.API018);
app.post("/com/uniPassApiStatsSgnBrkd", uniPassApiService.API019);
app.post("/com/uniPassCntrQry", uniPassApiService.API020);
app.post("/com/uniPassEtprRprtLst", uniPassApiService.API021);
app.post("/com/uniPassDclrCrfnVrfc", uniPassApiService.API022);
app.post("/com/uniPassApiBtcoVhclQry", uniPassApiService.API023);
app.post("/com/uniPassIoprRprtLst", uniPassApiService.API024);
app.post("/com/uniPassApiapfmPrcsStusQry", uniPassApiService.API025);
app.post("/com/uniPassApiShipCoLst", uniPassApiService.API026);
app.post("/com/uniPassApiShipCoBrkdQry", uniPassApiService.API027);
app.post("/com/uniPassPersEcms", uniPassApiService.API028);
app.post("/com/uniPassApiCcctLworCd", uniPassApiService.API029);
app.post("/com/uniPassApiSelectPassInfo", uniPassApiService.selectPassInfo);
app.post("/com/uniPassApiSelectShedInfo", uniPassApiService.selectShedInfo);
app.post("/com/uniPassApiSelectLcaInfo", uniPassApiService.selectLcaInfo);
app.post("/com/uniPassApiSelectCntrInfo", uniPassApiService.selectCntrInfo);
app.post("/com/uniPassApiSelectExpDclrInfo", uniPassApiService.selectExpDclrInfo);

// app.post("/com/uniPassApiRetrieveTrrt", uniPassApiService.API030);
// app.post("/com/uniPassApiPostNoPrCstmSgnQry", uniPassApiService.API031);
// app.post("/com/uniPassApiAlspEntsCdQry", uniPassApiService.API033);


//PUSH Service 
app.post("/api/pushUserInsert",dao.push.createPushUser);
app.post("/api/pushUserDelete",dao.push.deletePushUser);
app.post("/api/checkPushUser",dao.push.checkPushUser);
app.post("/api/updatePushToken",dao.push.updatePushToken);
app.post("/api/pushreciveTime",dao.push.pushUserSettingUpdate);
app.post("/api/pushreciveGubun",dao.push.pushServiceGubun)
// 공지 게시판
app.post("/api/getBoardList", dao.pgboard.getBoardMainList);
app.post("/api/getBoardDetail", dao.pgboard.getBoardDetail);
app.post("/api/getBoardAttach", dao.pgboard.getBoardAttach);
app.post("/api/boardAttachDown", function (req, res) {
  if(req.body.fileName == undefined || req.body.filePath == undefined){
    res.status(400).send("");
  } else {
    res.download("/OWNER" + "/" + req.body.filePath + "/" + req.body.fileName, req.body.fileName);
  }
});

app.post("/api/elasticHsSearch",async (req,res,next)=> {
	console.log("CONSLOE:",req.body.hs);
	var elasticsearch = require('elasticsearch');
	var client = new elasticsearch.Client({
		host:'http://172.25.1.143:9200/hs_navi',
	});
	try {
	const response = await client.search({
		body:{
		"size":1,
		"query":{
		"match":{
		"satmntPrdlstNm":{
		"query":req.body.hs
		}
		}
		}
		}});
	if(response.hits.total > 0) {
		return res.json(response.hits.hits[0]._source);
	} else {
		return res.send();
	}
	} catch(err) {
		next(err);
	}
});
app.post("/api/elasticImoSearch",async (req,res,next)=> {
	console.log("CONSLOE:",req.body.imo);
	var elasticsearch = require('elasticsearch');
	var client = new elasticsearch.Client({
		host:'http://172.25.1.89:9200/imo',
	});
	try {
	const response = await client.search({
		body:{
		"size":1,
		"query":{
		"match":{
		"name":req.body.imo
		}
		}
		}
		});
		if(response.hits.total.value > 0) {
			return res.json(response.hits.hits[0]._source);
		} else {
			return res.send();
		}
	} catch(err) {
		next(err);
	}
});

app.post("/auth/sertify", function (req,res) {
	
	const list = java.newInstanceSync("java.util.ArrayList"); 
	//console.log(list.getClassSync().getNameSync());
	java.newInstance("java.util.ArrayList", function(err, list) {
	  list.addSync("item1");
	  list.addSync("item2");
	  console.log("Inside the callback");
	  // console.log(list);
	  // console.log(list[0]);
	  console.log(list.toArraySync());
	  console.log(list.getSync(0));
	  console.log("Outside the callback");
	});
	list.addSync("product1");
	list.addSync("product2");
	console.log(list.getSync(0));
		
	
	const aTarget = "PROD" //테스트="TEST", 운영="PROD"
	const aCP_CD = "P21730000000";	// 회원사코드
	
	// const aLicense = "C:\\okcert3_license\\" + aCP_CD + "_IDS_01_" + aTarget + "_AES_license.dat";
	const aLicense = __dirname + path.sep +"lib"+path.sep+ aCP_CD + "_IDS_01_" + aTarget + "_AES_license.dat";
	//const aReqStr ='{"RETURN_URL":"http://localhost:3000/authpage/phonepopup", "SITE_NAME":"plismplus", "SITE_URL":"www.plismplus.com", "RQST_CAUS_CD":"00"}';


	/*const okcert = java.newInstanceSync("kcb.module.v3.OkCert"); 
	const case1 = okcert.callOkCertSync(aTarget, aCP_CD, aSvcName, aLicense, aReqStr);
	console.log(okcert.getClassSync().getNameSync());
	console.log('case1=', case1);*/


	const javaInstance = java.import('kcb.module.v3.OkCert')();
	let aSvcName = "";
	let case2;
	let aReqStr;

	if(req.body.mdltkn) {
		aSvcName = "IDS_HS_POPUP_RESULT"; //서비스명 (고정값)
		aReqStr ='{"MDL_TKN":'+req.body.mdltkn+'}';
		case2 = javaInstance.callOkCertSync(aTarget, aCP_CD, aSvcName, aLicense, aReqStr);
	} else {
		aSvcName = "IDS_HS_POPUP_START"; //서비스명 (고정값)
		aReqStr ='{"RETURN_URL":"https://www.plismplus.com/return_certify", "SITE_NAME":"plismplus", "SITE_URL":"www.plismplus.com", "RQST_CAUS_CD":"00"}';
		case2 = javaInstance.callOkCertSync(aTarget, aCP_CD, aSvcName, aLicense, aReqStr);
	}
	//console.log('case2=', case2);

	return res.send(case2);	
});

//에러 처리 미들웨어: error라는 템플릿 파일을 렌더링한다. 404에러가 발생하면 404처리 미들웨어에서 넣어준 값을 사용한다.
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});




const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
