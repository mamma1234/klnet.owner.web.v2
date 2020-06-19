'use strict';

const pgsqlPool = require("../pool.js").pgsqlPool
const basicauth = require("basic-auth");
const sUser = require('../../models/sessionUser');

const getTrackingList = (request, response) => {
	  
    request.session.sUser = sUser;
   let sqlText ="";
  //  sqlText += "select coalesce(bb.totalcnt,0) as totalcnt,coalesce(bb.full_out,0) as full_out, \n";
  //  sqlText += " coalesce(bb.mt_out,0) as mt_out,coalesce(bb.mt_in,0) as mt_in, \n";
  //  sqlText += " coalesce(bb.full_in,0) as full_in,aa.* from ( \n";
  //  sqlText += "select curpage,mbl_no,bkg_no,tot_page,req_seq,bl_bkg,book_mark,ie_type,carrier_code, \n";
  //  sqlText += " (select image_yn from own_code_cuship where id = carrier_code )as image_yn, \n";
  //  sqlText += " (select line_code from own_code_cuship where id = carrier_code )as line_code, \n";
  //  sqlText += " (select nm_kor from own_code_cuship where id = carrier_code ) as line_nm, \n";
  //  sqlText += " (select url from own_code_cuship where id = carrier_code ) as line_url, \n";
  //  sqlText += " vsl_name,voyage,last_current,pol,start_db,start_day, \n";
  //  sqlText += " case when sign(start_cnt) = 1 then '-'||start_cnt  \n";
  //  sqlText += " 	when sign(start_cnt) = 0 then 'D-Day' else '+'||ABS(start_cnt) end start_cnt, \n";
  //  sqlText += " case when sign(end_cnt) = 1 then '-'||end_cnt \n";
  //  sqlText += " 	when sign(end_cnt) = 0 then 'D-Day' else '+'||ABS(end_cnt) end end_cnt,\n";
  //  sqlText += " pod,end_db,end_day,coalesce(substring(start_day,0,5), to_char(now(), 'YYYY') ) bl_yy from ( \n";
  //  sqlText += " select mbl_no,bkg_no,count(*) over()/10+1 as tot_page,floor(((row_number() over()) -1) /10 +1) as curpage, \n";
  //  sqlText += " req_seq,bl_bkg, book_mark, ie_type,carrier_code,vsl_name,voyage,last_current,pol,pod, \n";
  //  sqlText += " case when (pol_atd is not null and pol_atd !='') or to_timestamp(pol_etd,'yyyymmdd') < now() then 'A' else 'E' end as start_db, \n";
  //  sqlText += " to_char(to_date(case when (pol_atd is not null and pol_atd !='') then pol_atd else pol_etd end,'yyyymmdd'),'YYYY/MM/DD') as start_day, \n"; 
  //  sqlText += " coalesce(to_date(case when (pol_atd is not null and pol_atd !='') then pol_atd else pol_etd end,'yyyymmdd')-current_Date,0) as start_cnt, \n";	 
  //  sqlText += " case when (pod_ata is not null and pod_ata !='') or to_timestamp(pod_eta,'yyyymmdd') < now() then 'A' else 'E' end as end_db, \n";
  //  sqlText += " to_char(to_date(case when (pod_ata is not null and pod_ata !='') then pod_ata else pod_eta end,'yyyymmdd'),'YYYY/MM/DD') as end_day, \n";
  //  sqlText += " coalesce(to_date(case when (pod_ata is not null and pod_ata !='') then pod_ata else pod_eta end,'yyyymmdd')-current_Date,0) as end_cnt \n";
  //  //sqlText += "  case when (pod_eta is null or pod_eta='') or (pol_atd is null or pol_atd='') or (to_date(pol_atd,'yyyymmdd') > current_Date) then '0' \n";
  //  //sqlText += "  else (cast(case when current_Date = to_date(pol_atd,'yyyymmdd') then 1 else current_Date-to_date(pol_atd,'yyyymmdd') end as integer)/ \n";
  //  //sqlText += "  cast(to_date(pod_eta,'yyyymmdd')- to_date(pol_atd,'yyyymmdd') as integer) *100) end as percent \n";
  //  sqlText += " from \n";
  //  sqlText += " ( select a.book_mark,a.mbl_no,a.bkg_no, b.* from  \n";
  //  sqlText += " ( select * from own_user_request  where user_no = '"+request.session.sUser.userno+"') a \n";
  //  sqlText += " ,own_tracking_bl_new b \n";
  //  //sqlText += " on a.bl_bkg = b.bl_bkg \n";
  //  sqlText += " where a.req_seq = b.req_seq \n";
  //  if(request.body.ietype != "" && request.body.ietype != "A") {
  // 	 sqlText += " and b.ie_type = '"+request.body.ietype+"' \n";
  //  }
   
  //  if(request.body.dategb == "A" ) {
  // 	 sqlText += " and case when (b.pod_ata is not null and b.pod_ata != '') then b.pod_ata else b.pod_eta end between '"+request.body.from+"' and '"+request.body.to+"' \n";
  //  } else {
  // 	 sqlText += " and case when (b.pol_atd is not null and b.pol_atd != '') then b.pol_atd else b.pol_etd end between '"+request.body.from+"' and '"+request.body.to+"' \n";
  //  }
   
  //  if(request.body.blbk != "") {
  // 	 sqlText += " and b.bl_bkg = '"+request.body.blbk+"' \n";
  //  }
  //  if(request.body.start != "") {
  // 	 sqlText += " and b.pol = '"+request.body.start+"' \n";
  //  }
  //  if(request.body.end != "") {
  // 	 sqlText += " and b.pod = '"+request.body.end+"' \n";
  //  }
  //  if(request.body.line != "") {
  // 	 sqlText += " and b.carrier_code = '"+request.body.line+"' \n";
  //  }
  // sqlText += " order by case when a.book_mark='Y' then 0 else 1 end ,case when (pol_atd is not null and pol_atd !='') then pol_atd else pol_etd end \n";
  //  sqlText += ")x)a where curpage = '"+request.body.num+"' \n";
  //  sqlText += " ) aa left outer join \n";
  //  sqlText += " (select count(*) as totalcnt,count(case when ie_type='I' and full_outgate_date is not null then 1 end ) as full_out, \n";
  //  sqlText += " count(case when ie_type='E' and mt_outgate_date is not null then 1 end ) as mt_out, \n";
  //  sqlText += " count(case when ie_type='I' and mt_ingate_date is not null then 1 end ) as mt_in, \n";
  //  sqlText += " count(case when ie_type='E' and full_ingate_date is not null then 1 end ) as full_in,bl_bkg,ie_type \n";
  //  sqlText += " from own_dem_det group by bl_bkg,ie_type) bb \n";
  //  sqlText += " on aa.bl_bkg = bb.bl_bkg \n";
  //  sqlText += " and aa.ie_type= bb.ie_type \n";
  //  sqlText += " order by case when aa.book_mark='Y' then 0 else 1 end,start_day \n";

  sqlText += " select a.req_seq ,a.user_no ,a.carrier_code ,a.bl_bkg ,a.ie_type \n";
  sqlText += "       ,a.cntr_no ,a.mbl_no ,a.bkg_no ,a.bl_yy ,a.web_seq ,a.book_mark \n";
  sqlText += "       ,a.vsl_code, a.vsl_name ,a.voyage ,a.pol, a.pod \n";
  sqlText += "       ,a.pol_atd, a.pol_etd \n";
  sqlText += "       ,a.vsl_code, a.vsl_name ,a.voyage ,a.pol, a.pod \n";
  sqlText += "       ,pol_atd, pol_etd \n";
  sqlText += "       ,case when (a.pol_atd is null or a.pol_atd ='')  \n";
  sqlText += "             then case when to_timestamp(a.pol_etd,'yyyymmdd') < now()  \n";
  sqlText += "                       then 'A' \n";
  sqlText += "                       else 'E' \n";
  sqlText += "                   end \n";
  sqlText += "             else 'A' \n";
  sqlText += "        end as start_db \n";
  sqlText += "       ,case when (pol_atd is null or pol_atd ='') \n";
  sqlText += "             then to_char(to_date(pol_etd,'yyyymmdd'),'YYYY/MM/DD') \n";
  sqlText += "             else to_char(to_date(pol_atd,'yyyymmdd'),'YYYY/MM/DD') \n";
  sqlText += "        end as start_day \n";
  sqlText += "       ,case when sign(coalesce(to_date(case when (pol_atd is null or pol_atd ='') then pol_etd else pol_atd end,'yyyymmdd')-current_Date,0)) = 1 \n";
  sqlText += "             then '-'||coalesce(to_date(case when (pol_atd is null or pol_atd ='') then pol_etd else pol_atd end,'yyyymmdd')-current_Date,0)  \n";
  sqlText += "             when sign(coalesce(to_date(case when (pol_atd is null or pol_atd ='') then pol_etd else pol_atd end,'yyyymmdd')-current_Date,0)) = 0 \n";
  sqlText += "             then 'D-Day' \n";
  sqlText += "             else '+'||ABS(coalesce(to_date(case when (pol_atd is null or pol_atd ='') then pol_etd else pol_atd end,'yyyymmdd')-current_Date,0))  \n";
  sqlText += "        end start_cnt \n";
  sqlText += "       ,case when (a.pod_ata is null or a.pod_ata ='')  \n";
  sqlText += "             then case when to_timestamp(a.pod_eta,'yyyymmdd') < now()  \n";
  sqlText += "                       then 'A' \n";
  sqlText += "                       else 'E' \n";
  sqlText += "                   end \n";
  sqlText += "             else 'A' \n";
  sqlText += "        end as end_db \n";
  sqlText += "       ,case when (pod_ata is null or pod_ata ='') \n";
  sqlText += "             then to_char(to_date(pod_eta,'yyyymmdd'),'YYYY/MM/DD') \n";
  sqlText += "             else to_char(to_date(pod_ata,'yyyymmdd'),'YYYY/MM/DD') \n";
  sqlText += "        end as end_day \n";
  sqlText += "       ,case when sign(coalesce(to_date(case when (pod_ata is null or pod_ata ='') then pod_eta else pod_ata end,'yyyymmdd')-current_Date,0)) = 1 \n";
  sqlText += "             then '-'||coalesce(to_date(case when (pod_ata is null or pod_ata ='') then pod_eta else pod_ata end,'yyyymmdd')-current_Date,0) \n";
  sqlText += "             when sign(coalesce(to_date(case when (pod_ata is null or pod_ata ='') then pod_eta else pod_ata end,'yyyymmdd')-current_Date,0)) = 0 \n";
  sqlText += "             then 'D-Day' \n";
  sqlText += "             else '+'||ABS(coalesce(to_date(case when (pod_ata is null or pod_ata ='') then pod_eta else pod_ata end,'yyyymmdd')-current_Date,0)) \n";
  sqlText += "        end end_cnt \n";
  sqlText += "       ,case when (a.bkg_no is not null or a.bkg_no != '') and (a.mbl_no is not null or a.mbl_no != '') \n";
  sqlText += "             then a.bl_bkg \n";
  sqlText += "             when (a.bkg_no is not null or a.bkg_no != '') and (a.mbl_no is null or a.mbl_no = '') \n";
  sqlText += "             then '('||a.bl_bkg||')' \n";
  sqlText += "             else a.bl_bkg \n";
  sqlText += "        end as view_bl_bkg  \n";
  sqlText += "       ,c.image_yn ,c.line_code ,c.nm_kor as line_nm ,c.url as line_url \n";
  sqlText += "       ,(select d.move_name from own_tracking_loc_new d where d.req_seq= a.req_seq and move_time is not null and move_time !='' and substring(move_time, 0, 9) <= to_char(now(), 'YYYYMMDD') order by loc_seq asc limit 1) as last_status \n";
  sqlText += "       ,(select case when length(move_time)>=12 then to_char(to_timestamp(substring(move_time,0,12),'yyyymmddhh24mi'),'yyyy/mm/dd hh24:mi')   \n";
  sqlText += "                else to_char(to_timestamp(move_time,'yyyymmdd'),'yyyy/mm/dd') end  from own_tracking_loc_new d where d.req_seq = a.req_seq and move_time is not null and move_time !='' and substring(move_time, 0, 9) <= to_char(now(), 'YYYYMMDD')   \n";
  sqlText += "                order by loc_seq asc limit 1) as last_status_time \n";
  sqlText += "       ,coalesce(d.totalcnt,0) as totalcnt \n";
  sqlText += "       ,coalesce(d.full_out,0) as full_out  \n";
  sqlText += "       ,coalesce(d.mt_out,0) as mt_out \n";
  sqlText += "       ,coalesce(d.mt_in,0) as mt_in  \n";
  sqlText += "       ,coalesce(d.full_in,0) as full_in  \n";
  sqlText += "       ,tot_page, curpage  \n";
  sqlText += "   from ( \n";
  sqlText += "         select a.req_seq ,a.user_no ,a.carrier_code ,a.bl_bkg ,a.ie_type \n";
  sqlText += "               ,a.cntr_no ,a.mbl_no ,a.bkg_no ,a.bl_yy ,a.web_seq ,a.book_mark \n";
  sqlText += "       ,a.vsl_code, a.vsl_name ,a.voyage ,a.pol, a.pod \n";
  sqlText += "       ,a.pol_atd, a.pol_etd,a.pod_ata, a.pod_eta \n";
  sqlText += "               ,count(*) over()/10+1 as tot_page \n";
  sqlText += "               ,floor(((row_number() over()) -1) /10 +1) as curpage \n";
  sqlText += "           from ( \n";
  sqlText += "                 select a.req_seq ,a.user_no ,a.carrier_code ,a.bl_bkg ,a.ie_type \n";
  sqlText += "                       ,row_number() over( partition by a.user_no, a.carrier_code, a.bl_bkg, a.ie_type order by a.web_seq desc) seq \n";
  sqlText += "                       ,a.cntr_no ,a.mbl_no ,a.bkg_no \n";
  sqlText += "                       ,substring(a.start_date,0 ,5) as bl_yy \n";
  sqlText += "                       ,a.web_seq ,a.book_mark \n";
  sqlText += "       ,b.vsl_code, b.vsl_name ,b.voyage ,b.pol, b.pod \n";
  sqlText += "       ,b.pol_atd, b.pol_etd,b.pod_ata, b.pod_eta \n";
  sqlText += "                   from own_user_request a \n";
  sqlText += "                  left outer join own_tracking_bl_new b on a.req_seq = b.req_seq and a.user_no = b.user_no and a.carrier_code = b.carrier_code and a.bl_bkg = b.bl_bkg \n";
  sqlText += "                  where a.user_no = '"+request.session.sUser.userno+"' \n";
  if(request.body.ietype != "" && request.body.ietype != "A") {
      sqlText += " and a.ie_type = '"+request.body.ietype+"' \n";
  }
  if(request.body.line != "") {
      sqlText += " and a.carrier_code = '"+request.body.line+"' \n";
  }
  if(request.body.blbk != "") {
      sqlText += " and a.bl_bkg = '"+request.body.blbk+"' \n";
  }
  if(request.body.from != "Invalid date" && request.body.to != "Invalid date" ) {
    if(request.body.blbk == "") {
        if(request.body.dategb == "A" ) {
            sqlText += " and case when (b.pod_ata is not null and b.pod_ata != '') then b.pod_ata else b.pod_eta end between '"+request.body.from+"' and '"+request.body.to+"' \n";
        } else {
            sqlText += " and case when (b.pol_atd is not null and b.pol_atd != '') then b.pol_atd else b.pol_etd end between '"+request.body.from+"' and '"+request.body.to+"' \n";
        }
    }
}
if(request.body.start != "") {
    sqlText += " and b.pol = '"+request.body.start+"' \n";
}
if(request.body.end != "") {
    sqlText += " and b.pod = '"+request.body.end+"' \n";
}
  // sqlText += " --                  order by case when a.book_mark='Y' then 0 else 1 end \n";
  sqlText += "                 ) a \n";
  sqlText += "         where a.seq = 1 \n";
  sqlText += "         ) a \n";
  
  sqlText += " left outer join own_code_cuship c on a.carrier_code = c.id \n";
  sqlText += " left outer join (select count(*) as totalcnt  \n";
  sqlText += "                   ,count(case when ie_type='I' and full_outgate_date is not null then 1 end ) as full_out  \n";
  sqlText += "                   ,count(case when ie_type='E' and mt_outgate_date is not null then 1 end ) as mt_out  \n";
  sqlText += "                   ,count(case when ie_type='I' and mt_ingate_date is not null then 1 end ) as mt_in  \n";
  sqlText += "                   ,count(case when ie_type='E' and full_ingate_date is not null then 1 end ) as full_in,bl_bkg,ie_type  \n";
  sqlText += "               from own_dem_det d \n";
  sqlText += "               group by bl_bkg,ie_type) d \n";
  sqlText += " on a.bl_bkg = d.bl_bkg  and a.ie_type= d.ie_type \n";
  sqlText += "where curpage = '"+request.body.num+"' \n";
  sqlText += "order by case when a.book_mark='Y' then 0 else 1 end,start_day \n";

  // sqlText += "select aa.mbl_no ,aa.bkg_no \n";
  // sqlText += ",case when (aa.bkg_no is not null or aa.bkg_no != '') and (aa.mbl_no is not null or aa.mbl_no != '') then aa.bl_bkg \n";
  // sqlText += " when (aa.bkg_no is not null or aa.bkg_no != '') and (aa.mbl_no is null or aa.mbl_no = '') then '('||aa.bl_bkg||')' \n";
  // sqlText += "else aa.bl_bkg end as view_bl_bkg \n";
  // sqlText += ",aa.bl_bkg, \n";
  // sqlText += " aa.carrier_code, aa.vsl_code ,aa.voyage ,aa.last_status ,aa.last_status_time,aa.ie_type ,aa.pol \n";
  // sqlText += ", case when aa.vsl_name is null or aa.vsl_name = '' \n";
  // sqlText += "   then (select ship_nm from own_vsl_info where ship_imo = aa.vsl_code and ship_nm is not null limit 1 ) \n";
  // sqlText += "   else aa.vsl_name \n";
  // sqlText += " end vsl_name \n";
  // sqlText += ",aa.start_db ,aa.start_day ,aa.pod ,aa.end_db ,aa.end_day ,aa.curpage, aa.tot_page \n";
  // sqlText += ",case when sign(aa.start_cnt) = 1 then '-'||aa.start_cnt \n";
  // sqlText += "      when sign(aa.start_cnt) = 0 then 'D-Day' else '+'||ABS(aa.start_cnt) end start_cnt, \n";
  // sqlText += " case when sign(aa.end_cnt) = 1 then '-'||end_cnt \n";
  // sqlText += "      when sign(aa.end_cnt) = 0 then 'D-Day' else '+'||ABS(aa.end_cnt) end end_cnt \n";
  // sqlText += ",aa.book_mark ,aa.image_yn ,aa.line_code ,aa.line_nm ,aa.line_url ,aa.bl_yy ,aa.seq ,aa.req_seq \n";
  // sqlText += " req_seq,coalesce(bb.totalcnt,0) as totalcnt,coalesce(bb.full_out,0) as full_out \n";
  // sqlText += ",coalesce(bb.mt_out,0) as mt_out,coalesce(bb.mt_in,0) as mt_in \n";
  // sqlText += ",coalesce(bb.full_in,0) as full_in \n";
  // sqlText += "from ( \n";
  // sqlText += "select a.mbl_no ,a.bkg_no ,a.bl_bkg ,a.carrier_code, a.vsl_code ,a.vsl_name ,a.voyage ,a.ie_type ,a.pol \n";
  // sqlText += ",a.start_db ,a.start_day ,a.start_cnt ,a.pod ,a.end_db ,a.end_day ,a.end_cnt,a.last_status,a.last_status_time \n";
  // sqlText += ",a.book_mark ,a.image_yn ,a.line_code ,a.line_nm ,a.line_url ,a.bl_yy ,a.seq ,a.req_seq \n";
  // sqlText += ",count(*) over()/10+1 as tot_page,floor(((row_number() over()) -1) /10 +1) as curpage \n";
  // sqlText += "from ( \n";
  // sqlText += "select a.mbl_no ,a.bkg_no ,a.bl_bkg ,a.carrier_code, b.vsl_code, b.vsl_name ,b.voyage ,a.ie_type ,b.pol \n";
  // sqlText += ",case when (pol_atd is not null and pol_atd !='') or to_timestamp(pol_etd,'yyyymmdd') < now() then 'A' else 'E' end as start_db \n";
  // sqlText += ",to_char(to_date(case when case when (pol_atd is not null and pol_atd !='') then pol_atd else pol_etd end = '' then null  else case when (pol_atd is not null and pol_atd !='') then pol_atd else pol_etd end end,'yyyymmdd'),'YYYY/MM/DD') as start_day \n";
  // sqlText += ",coalesce(to_date(case when (pol_atd is not null and pol_atd !='') then pol_atd else pol_etd end,'yyyymmdd')-current_Date,0) as start_cnt \n";
  // sqlText += ",b.pod \n";
  // sqlText += ",case when (pod_ata is not null and pod_ata !='') or to_timestamp(pod_eta,'yyyymmdd') < now() then 'A' else 'E' end as end_db \n";
  // sqlText += ",to_char(to_date(case when case when (pod_ata is not null and pod_ata !='') then pod_ata else pod_eta end = '' then null  else case when (pod_ata is not null and pod_ata !='') then pod_ata else pod_eta end end,'yyyymmdd'),'YYYY/MM/DD') as end_day \n";
  // sqlText += ",coalesce(to_date(case when (pod_ata is not null and pod_ata !='') then pod_ata else pod_eta end,'yyyymmdd')-current_Date,0) as end_cnt \n";
  // sqlText += ",a.book_mark ,c.image_yn ,c.line_code ,c.nm_kor as line_nm ,c.url as line_url \n";
  // sqlText += ",coalesce(substring(start_date,0,5), to_char(now(), 'YYYY') ) bl_yy \n";
  // sqlText += ",row_number() over( partition by b.user_no, a.carrier_code, a.bl_bkg order by b.web_seq desc) seq ,a.req_seq \n";
  // sqlText += ",(select d.move_name from own_tracking_loc_new d where d.req_seq= a.req_seq and move_time is not null and move_time !='' and substring(move_time, 0, 9) <= to_char(now(), 'YYYYMMDD') order by loc_seq asc limit 1) as last_status \n";
  // sqlText += ",(select case when length(move_time)>=12 then to_char(to_timestamp(substring(move_time,0,12),'yyyymmddhh24mi'),'yyyy/mm/dd hh24:mi')  \n";
  // sqlText += " else to_char(to_timestamp(move_time,'yyyymmdd'),'yyyy/mm/dd') end  from own_tracking_loc_new d where d.req_seq = a.req_seq and move_time is not null and move_time !='' and substring(move_time, 0, 9) <= to_char(now(), 'YYYYMMDD')  \n";
  // sqlText += " order by loc_seq asc limit 1) as last_status_time \n";
  // sqlText += "from own_user_request a \n";
  // if(request.body.blbk != "") {
  //     sqlText += "left outer join own_tracking_bl_new b on a.req_seq = b.req_seq \n";
  // }  else {
  //     sqlText += "inner join own_tracking_bl_new b on a.req_seq = b.req_seq \n";
  // }
  // sqlText += "left outer join own_code_cuship c on a.carrier_code = c.id \n";
  // sqlText += "where a.user_no = '"+request.session.sUser.userno+"' \n";

  // if(request.body.ietype != "" && request.body.ietype != "A") {
  //     sqlText += " and a.ie_type = '"+request.body.ietype+"' \n";
  // }
  
  // if(request.body.from != "Invalid date" && request.body.to != "Invalid date" ) {
  //     if(request.body.blbk == "") {
  //         if(request.body.dategb == "A" ) {
  //             sqlText += " and case when (b.pod_ata is not null and b.pod_ata != '') then b.pod_ata else b.pod_eta end between '"+request.body.from+"' and '"+request.body.to+"' \n";
  //         } else {
  //             sqlText += " and case when (b.pol_atd is not null and b.pol_atd != '') then b.pol_atd else b.pol_etd end between '"+request.body.from+"' and '"+request.body.to+"' \n";
  //         }
  //     }
  // }
  
  // if(request.body.blbk != "") {
  //     sqlText += " and a.bl_bkg = '"+request.body.blbk+"' \n";
  // }
  // if(request.body.start != "") {
  //     sqlText += " and b.pol = '"+request.body.start+"' \n";
  // }
  // if(request.body.end != "") {
  //     sqlText += " and b.pod = '"+request.body.end+"' \n";
  // }
  // if(request.body.line != "") {
  //     sqlText += " and b.carrier_code = '"+request.body.line+"' \n";
  // }
  // sqlText += "      ) a where seq=1 ) aa  \n";
  //  sqlText += " left outer join( \n";
  //  sqlText += "select count(*) as totalcnt \n";
  //  sqlText += ",count(case when ie_type='I' and full_outgate_date is not null then 1 end ) as full_out \n";
  //  sqlText += ",count(case when ie_type='E' and mt_outgate_date is not null then 1 end ) as mt_out \n";
  //  sqlText += ",count(case when ie_type='I' and mt_ingate_date is not null then 1 end ) as mt_in \n";
  //  sqlText += ",count(case when ie_type='E' and full_ingate_date is not null then 1 end ) as full_in,bl_bkg,ie_type \n";
  //  sqlText += "from own_dem_det group by bl_bkg,ie_type ) bb \n";
  //  sqlText += "on aa.bl_bkg = bb.bl_bkg  \n";
  //  sqlText += "and aa.ie_type= bb.ie_type  \n";
  //  sqlText += "where curpage = '"+request.body.num+"' \n";
  //  sqlText += "order by case when aa.book_mark='Y' then 0 else 1 end,start_day \n";
   
   
   
console.log(sqlText);
  pgsqlPool.connect(function(err,conn,done) {
      if(err){
          console.log("err" + err);
          response.status(400).send(err);
      }

      conn.query(sqlText, function(err,result){
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

const getMyBlList = (request, response) => {
    let sql = "";
    sql = " select row_number()over( order by insert_date desc) as num ";
    sql += " ,mbl_no as bl_no,carrier_code,to_char(insert_date,'YYYY/MM/DD') as insert_date, ie_type, bkg_no, cntr_no, ";
    sql += " (select b.nm_kor from own_code_cuship b where a.carrier_code = b.id group by id, nm_kor) as nm_kor"
    sql += " from own_user_request a";
    sql += " where 1=1 ";
    sql += " and user_no = '"+request.session.sUser.userno+"' ";
    if( '' != request.body.fromDate && '' != request.body.toDate ) {
        sql += " and to_char(insert_date , 'yyyymmdd') between '"+ request.body.fromDate +"' and  '" + request.body.toDate + "' " ;
    }
    if( '' != request.body.typeGubun) {
        sql += " and ie_type = '"+ request.body.typeGubun +"' ";
    }

    if( '' != request.body.carrierCode ) {
        sql += " and carrier_code = '"+ request.body.carrierCode +"'  ";
    }
    

    if( '' != request.body.searchKey) {
        sql += " and bl_bkg like upper('%"+ request.body.searchKey +"%') ";
    }
    sql += " and del_yn ='N' order by num";
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

            response.status(200).json(result.rows);
        });
    });
}
  
  const getPkMyBlList = (request, response) => {
        console.log('request.body',request.body);
        let cntrNumber = request.body.cntrNumber==""?null:request.body.cntrNumber;
        let sql = "";
        
        sql += " select bl_bkg " ;
        sql += " from own_user_request ";
        sql += " where 1=1 ";
        sql += " and user_no = upper('"+request.session.sUser.userno+"')";
        sql += " and carrier_code = upper('"+request.body.carrierCode+"') ";
        sql += " and bl_bkg = upper('"+request.body.bl_bkg+"') ";
        sql += " and ie_type = upper('"+request.body.ie_type+"') ";
        sql += " and del_yn = 'N'"
        sql += request.body.cntrNumber==""?" and cntr_no is null ":" and cntr_no = upper('"+cntrNumber+"')";

        console.log( sql );
	    pgsqlPool.connect(function(err,conn,done) {
            try{
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
                    if(result != null) {
                        response.status(200).json(result.rows);
                    } else {
                        response.status(200).json([]);
                    }
                });
            }catch(e) {
                console.log(e);
                done();
            	response.status(400).send(error);
            }

	        // conn.release();
	    });
  }

  const getPkMyUpdateBlList = (request, response) => {
    const carrierFormat = request.body.params.carrier_code.props.children.props.value;
    console.log('carrierFormat',carrierFormat);  
    const sql = {
      text: "select bl_bkg "
      +" from own_user_request "
      +" where user_no = upper($1) and carrier_code = upper($2) and bl_bkg = upper($3) and ie_type = upper($4) and cntr_no = upper($5) ",
        values: [request.session.sUser.userno
            ,carrierFormat
            ,request.body.params.bl_no
            ,request.body.params.ie_type
            ,request.body.params.cntr_no],
        // rowMode: 'array',
    }
    console.log( sql );
    try{
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
                if(result != null) {
                    response.status(200).json(result.rows);
                } else {
                    response.status(200).json([]);
                }
            });

            // conn.release();
        });
    }catch(e){
        console.log(e);
        done();
        response.status(400).send(error);
    }
}




  const deleteMyBlNo = (request, response) => {
        
        let sql = "" ;
        console.log('request.body.sendData.cntr_no',request.body.sendData.cntr_no)
        sql += " update own_user_request ";
        sql += " set del_yn = 'Y' ";
        sql += " ,update_user = upper('"+request.session.sUser.userno+"') ";
        sql += " ,update_date = now() "
        sql += " where carrier_code = upper('"+request.body.sendData.carrier_code+"') "
        sql += " and ie_type = upper('"+request.body.sendData.ie_type+"') "
        if(request.body.sendData.bl_no !=null && request.body.sendData.bkg_no != null) {
            sql += " and bl_bkg = upper('"+request.body.sendData.bl_no+"') ";
            sql += " and mbl_no = upper('"+request.body.sendData.bl_no+"') ";
            sql += " and bkg_no = upper('"+request.body.sendData.bkg_no+"') ";
        }else if (request.body.sendData.bkg_no == null) {
            sql += " and bl_bkg = upper('"+request.body.sendData.bl_no+"') ";
            sql += " and mbl_no = upper('"+request.body.sendData.bl_no+"') ";
        }else if (request.body.sendData.bl_no == null) {
            sql += " and bl_bkg = upper('"+request.body.sendData.bkg_no+"') ";
            sql += " and bkg_no = upper('"+request.body.sendData.bkg_no+"') ";
        }
        sql += request.body.sendData.cntr_no==null?" and cntr_no is null " : " and cntr_no = upper('"+request.body.sendData.cntr_no+"') "

      console.log( sql );
      try{
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
                if(result != null) {
                    response.status(200).json(result.rows);
                } else {
                    response.status(200).json([]);
                }
            });
        });
      }catch(e) {
        console.log(e);
        done();
        response.status(400).send(error);
      }
  }

const getBookMark = (request, response) => {

    const sql = {
        text: "select seq,vsl_name,ie_type,pol,pod from own_book_mark"+
        	  " where user_no =$1  and menu_code='T'  order by seq",
        values: [request.session.sUser.userno,],
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

            //response.status(200).send({'record':result.rows, 'field':result.fields.map(f => f.name)});
            response.status(200).json(result.rows);
            // console.log(result.fields.map(f => f.name));
        });

        // conn.release();
    });
}

const getCntrList = (request, response) => {

    const sql = {
            text: " select * "+
                  " from ( select a.req_seq, a.carrier_code, a.bl_bkg, a.cntr_no "+
                  "    ,(row_number() over( partition by a.req_seq, a.carrier_code, a.bl_bkg, a.cntr_no order by b.loc_seq asc)) as seq "+
                  "   ,to_char(to_timestamp(substr(move_time,1,12),'YYYYMMDDhh24mi'),'YYYY-MM-DD hh24:mi') as move_time "+
                  " ,vsl_name,voyage_no,loc_name,move_name "+
                  " from own_tracking_cntr_new a "+
                  " left outer join own_tracking_loc_new b "+
                  " on a.req_seq = b.req_seq and a.user_no = b.user_no and a.bl_bkg = b.bl_bkg and a.cntr_no = b.cntr_no "+
                  " where a.req_seq=$1 and a.carrier_code= $2 and a.bl_bkg= $3 and move_time is not null and move_time !='' "+
                  " and substring(b.move_time, 0, 9) <= to_char(now(), 'YYYYMMDD') ) a "+
                  " where seq=1",
            values: [request.body.reqseq, request.body.carriercode, request.body.blbk],
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

            //response.status(200).send({'record':result.rows, 'field':result.fields.map(f => f.name)});
            response.status(200).json(result.rows);
            // console.log(result.fields.map(f => f.name));
        });

        // conn.release();
    });
}
  
const getUserSetting = (request, response) => {

    const sql = {
        text: "select search_gb,search_name,search_pol,search_pod,search_eta,search_etd,"+
              " notice_eta_yn,notice_eta_value,notice_etd_yn,notice_etd_value,"+
              " notice_det_yn,notice_det_value,notice_dem_yn,notice_dem_value,"+
        	  " notice_inspect_yn,notice_inspect_off_yn,notice_email_yn,notice_email_value,"+
        	  " notice_sms_yn,notice_sms_value from own_user_ui_setting where user_no = $1",
        values: [request.session.sUser.userno],
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
            if(result != null) {
            	response.status(200).json(result.rows);
            } else {
            	response.status(200).json([]);
            }
            //response.status(200).send({'record':result.rows, 'field':result.fields.map(f => f.name)});
            //response.status(200).json(result.rows);
            // console.log(result.fields.map(f => f.name));
        });

        // conn.release();
    });
}

const getCntrDetailList = (request, response) => {

    const sql = {
        text: "select req_seq, to_char(to_timestamp(case when substr(move_time,1,12) = '' then null else substr(move_time,1,12) end,'YYYYMMDDhh24mi'),'YYYY-MM-DD hh24:mi') as move_time,"+
              " case when loc_name='' or loc_name is null then loc_code else loc_name end  loc_name"+
              ",move_name from own_tracking_loc_new "+
              " where req_seq= $1 and carrier_code = $2 "+
        	  "   and bl_bkg = $3 "+
        	  "   and cntr_no is not null and cntr_no = $4 "+
        	  "   order by loc_seq ",
        values: [request.body.reqseq,request.body.carriercode, request.body.blno, request.body.cntrno],
        //rowMode: 'array',
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
            if(result != null) {
            	response.status(200).json(result.rows);
            } else {
            	response.status(200).json([]);
            }
            //response.status(200).send({'record':result.rows, 'field':result.fields.map(f => f.name)});
            //response.status(200).json(result.rows);
            // console.log(result.fields.map(f => f.name));
        });

        // conn.release();
    });
}



















const getCarrierInfo = (request, response) => {
    const kname = request.body.knm;
    const ename = request.body.enm;
    const sql = {
        text: " select id,line_code,nm_kor,nm from OWN_CODE_CUSHIP where 1=1 and nm_kor like '%"+kname+"%' and nm like '%"+ename+"%'",
        //values: [request.body.carriercode, request.body.blno, request.body.cntrno],
        rowMode: 'array',
    }
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
}

const setUserSetting = (request, response) => {

    const sql = {
        text: "WITH UPSERT AS ("+
              " UPDATE OWN_USER_UI_SETTING SET "+
              "  SEARCH_GB=$1 , SEARCH_NAME= $2, SEARCH_POL=$3 , SEARCH_POD =$4, SEARCH_ETA=$5,"+
              "  SEARCH_ETD=$6, NOTICE_ETA_YN= $7, NOTICE_ETA_VALUE=$8, NOTICE_ETD_YN= $9 ,NOTICE_ETD_VALUE=$10, "+
        	  "  NOTICE_DET_YN=$11, NOTICE_DET_VALUE= $12, NOTICE_DEM_YN=$13, NOTICE_DEM_VALUE=$14, NOTICE_INSPECT_YN= $15, "+
        	  "  NOTICE_INSPECT_OFF_YN= $16, NOTICE_EMAIL_YN= $17 , NOTICE_EMAIL_VALUE=$18, NOTICE_SMS_YN= $19, NOTICE_SMS_VALUE= $20, "+
        	  "  INSERT_DATE= NOW() WHERE USER_NO=$21 AND  SERVICE_TYPE ='T' RETURNING*) "+
        	  " INSERT INTO OWN_USER_UI_SETTING (USER_NO,SERVICE_TYPE,SEARCH_GB,SEARCH_NAME,SEARCH_POL,  "+
        	  "     SEARCH_POD,SEARCH_ETA,SEARCH_ETD,NOTICE_ETA_YN,NOTICE_ETA_VALUE, "+
        	  "     NOTICE_ETD_YN,NOTICE_ETD_VALUE,NOTICE_DET_YN,NOTICE_DET_VALUE,NOTICE_DEM_YN, "+
        	  "     NOTICE_DEM_VALUE,NOTICE_INSPECT_YN,NOTICE_INSPECT_OFF_YN,NOTICE_EMAIL_YN,NOTICE_EMAIL_VALUE, "+
        	  "     NOTICE_SMS_YN,NOTICE_SMS_VALUE, INSERT_ID,INSERT_DATE) "+
        	  "          	    SELECT $21,'T',$1,$2,$3,"+  
        	  "         $4,$5,$6,$7,$8, "+
        	  "         $9,$10,$11,$12, "+
        	  "         $13,$14,$15,$16, "+
        	  "         $17,$18,$19,$20,$21,now() WHERE NOT EXISTS ( SELECT * FROM UPSERT)",
        values: [request.body.col0, request.body.col1, request.body.col2,request.body.col3,request.body.col4,
        		request.body.col5,request.body.col6,request.body.col7,request.body.col8,request.body.col9,
        		request.body.col10,request.body.col11,request.body.col12,request.body.col13,request.body.col14,
        		request.body.col15,request.body.col16,request.body.col17,request.body.col18,request.body.col19,request.session.sUser.userno
        		],
        rowMode: 'array',
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
            if(result != null) {
            	response.status(200).json(result.rows);
            } else {
            	response.status(200).json([]);
            }
            //response.status(200).send({'record':result.rows, 'field':result.fields.map(f => f.name)});
            //response.status(200).json(result.rows);
            // console.log(result.fields.map(f => f.name));
        });

        // conn.release();
    });
}

const saveBlList = ( request, response ) => {
    // console.log( request.body );
    
    let dataRows = request.body.dataRows;
    let count = 0;
    let error = null;
    let insertConditions = " INSERT INTO own_user_request(req_seq, user_no, carrier_code, bl_bkg, ie_type, cntr_no, mbl_no, bkg_no, start_date, insert_date, insert_user)";
    for( let i = 0; i < dataRows.length; i++ ){
        // $1 user_no
        let userNo = request.session.sUser.userno;
        // $2 carrier_code
        let ie_gubun = dataRows[i][0];
        // $3 bl_bkg
        let carrier_code = dataRows[i][1];
        let bl_no = "";
        let bk_no = "";
        
        // BL NO & BK NO 입력 확인
        if (( 'null' == dataRows[i][2] || '' == dataRows[i][2] || null == dataRows[i][2] ) ||( 'null' == dataRows[i][3] || '' == dataRows[i][3] || null == dataRows[i][3] )) {
            break;
        } else {
            bl_no = dataRows[i][2];
            bk_no = dataRows[i][3];
        }
        // $5 cntr_no 
        let cntr_no = dataRows[i][4];

        insertConditions += " select to_char( now(), 'yyyymmddhh24miss' )||lpad(cast( nextval('user_request_seq') as varchar),6,'0') req_seq, "
        insertConditions += " '" + userNo + "' user_no, " 
        insertConditions += " '" + carrier_code+  "' carrier_code, "
        insertConditions += " '" + bl_no + "' bl_bkg, " 
        insertConditions += " '" + ie_gubun + "' ie_type, "
        insertConditions += " '" + cntr_no + "' cntr_no, "
        insertConditions += " '" + bl_no + "' mbl_no, "
        //insertConditions += " null hbl_no, "
        insertConditions += " '" + bk_no + "' bkg_no, "
        //insertConditions += " 'Y' tracking_yn, "
        //insertConditions += " null tracking_remark, "
        //insertConditions += " 'Y' dem_det_yn, "
        //insertConditions += " null dem_det_remark, "
        //insertConditions += " 'N' book_mark, "
        //insertConditions += " null customs_line_code, "
        //insertConditions += " 'N' current_status, "
        //insertConditions += " null scrap_result, "
        //insertConditions += " null scrap_start_date, "
        //insertConditions += " null scrap_end_date, "
        //insertConditions += " null scrap_log, "
        //insertConditions += " null web_seq, "
        insertConditions += " to_char(now(),'YYYYMMDD') start_date, "
        //insertConditions += " 'N' to_oracle, "
        //insertConditions += " 'N' del_yn, "
        //insertConditions += " 'N' close_yn, "
        insertConditions += " now() insert_date, "
        insertConditions += " '" + userNo + "' insert_user "
        //insertConditions += " null update_date, "
        //insertConditions += " null update_user "
        //insertConditions += " where not exists (select 1 from own_user_request b ";
        //insertConditions += " where b.user_no = '"+userNo+"' and b.carrier_code = '"+carrier_code+"' and b.bl_bkg = '"+bl_no+"' and b.ie_type = '"+ie_gubun+"' ) ";
        if( i != (dataRows.length-1) ) {
            insertConditions += " union all ";
        }
    }
    let sql = {
        text: insertConditions,
        // values: multi_params,
    }
    console.log( sql );
    pgsqlPool.connect( (err,conn,done) =>{
        if(err){
            console.log("err" + err);
            // response.status(400).send(err);
        }

        conn.query(sql, function(err,result){
            done();
            // console.log( result.command );
            if(err){
                error = err;
                console.log(err);
                // console.log(error);
                response.status(200).send(err);
                // response.status(400).send(err);
            } else {
                count += 1;
                console.log(count)
                // if(null != error){
                // } else {
                //     console.log("COUNT "+ count)
                //     response.status(200).json(count+"건 처리되었습니다.");
                // }
                // if ( count == dataRows.length) {
                    response.status(200).json(count+"건 처리되었습니다.");
                // }
            }
        });
    });
    // }
    // console.log( "최종>>>", error);

    // console.log( "<><><><><><><>"+error )
}


const insertBlRequest = ( request, response ) => {
    let sql ="";
            
        sql += " INSERT INTO own_user_request (req_seq, user_no, carrier_code, " ;
        sql += " bl_bkg, ie_type, cntr_no, mbl_no, hbl_no, bkg_no, tracking_yn, tracking_remark, "; 
        sql += " dem_det_yn, dem_det_remark, book_mark, customs_line_code, current_status, " ;
        sql += " scrap_result, scrap_start_date, scrap_end_date, scrap_log, web_seq, start_date, ";
        sql += " to_oracle, del_yn, close_yn, insert_date, insert_user, update_date, update_user) ";

        sql += " VALUES(to_char( now(), 'yyyymmddhh24miss' )||lpad(cast( nextval('user_request_seq') as varchar),6,'0'), upper('"+request.session.sUser.userno+"'), upper('"+request.body.carrierCode+"'), ";
        sql += " upper('"+request.body.bl_bkg+"'), upper('"+request.body.ie_type+"'), ";
        sql += request.body.cntrNumber==""?"null,":"upper('"+request.body.cntrNumber+"'), ";
        sql += request.body.bl_no==""?"null,":" upper('"+request.body.bl_no+"'), ";
        sql += " '',";
        sql += request.body.bkg_no==""?"null,":" upper('"+request.body.bkg_no+"'), "
        sql += " 'Y', '', ";
        sql += " 'Y', '', 'N', '', 'N', '', null, null, '', '', to_char(now(),'YYYYMMDD'), 'N', 'N', 'N', now(), upper('"+request.session.sUser.userno+"'), null, '') ",

    
    
    console.log('sql===',sql);
    
    try{
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
                if(result != null) {
                    
                    response.status(200).json(result.rows);
                } else {
                    response.status(200).json([]);
                }
            });
        });
    }catch(e) {
        console.log(e);
        done();
        response.status(400).send(error);
    }
}


const setUserBLUpdate = ( request, response ) => {
   
    const sql = {
        
        text: " UPDATE own_user_request set book_mark=$1 where req_seq=$2 and user_no=$3 and bl_bkg=$4",
        values: [request.body.bookmark,request.body.reqseq,request.session.sUser.userno, request.body.blbk],
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
            if(result != null) {
                
                response.status(200).json(result.rows);
            } else {
                response.status(200).json([]);
            }
        });
    });
}

const getDemdetDtlCurrent = (request, response) => {

    const sql = {
        text: "select * from own_dem_det "+
              " where req_seq= $1 "+
        	  "   and line_code = $2 "+
        	  "   and bl_bkg = $3 "+
        	  "   and ie_type = $4 "+
        	  "   order by update_date desc ",
        values: [request.body.reqseq,request.body.carriercode, request.body.blbkg, request.body.ietype],
        //rowMode: 'array',
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
            if(result != null) {
            	response.status(200).json(result.rows);
            } else {
            	response.status(200).json([]);
            }
        });

    });
}

const getdemdetCurrent = (request, response) => {

    const sql = {
        text: "select  (select terminal_kname from own_terminal_info where terminal = a.terminal) as terminal_name, \n"+
        	  " (select url from own_terminal_info where terminal = a.terminal) as terminal_url, activity ,osc_date, req_seq from ( \n"+
              " select bl_bkg,ie_type,req_seq,user_no, \n"+
              "   case when ie_Type='I' then case when mt_ingate_date is not null then 'EMPTY_IN' \n"+
              "        when full_outgate_date is not null then 'FULL_OUT' else 'UNLOAD' end  \n"+
              "   else case when load_date is not null then 'LOAD' \n"+
              "      when pol_ingate_time is not null then 'POL_IN'  \n"+
              "      when full_ingate_date is not null then 'FULL_IN' else 'EMPTY_OUT' end end ||' '|| \n"+
              "  to_date(substring(case when  ie_Type='I' then case when mt_ingate_date is not null then mt_ingate_date \n"+
              "  when full_outgate_date is not null then full_outgate_date else unload_date end \n"+
              "  else case when load_date is not null then load_date  \n"+
              "      when pol_ingate_time is not null then pol_ingate_time \n"+
              "      when full_ingate_date is not null then full_ingate_date \n"+
              "      else mt_outgate_date end end,0,8),'YYYYMMDD') as activity,  \n"+
              "  to_date(substring(case when  ie_Type='I' then \n"+
              "  case when mt_ingate_date is not null then mt_ingate_date \n"+
              "     when full_outgate_date is not null then full_outgate_date else unload_date end \n"+
              "  else case when load_date is not null then load_date \n"+
              "    when pol_ingate_time is not null then pol_ingate_time \n"+
              "    when full_ingate_date is not null then full_ingate_date \n"+
              "    else mt_outgate_date end end,0,8),'YYYYMMDD') as   move_time, \n"+
              " case when  ie_Type='I' then case when mt_ingate_date is not null then mt_ingate_terminal \n"+
              "     when full_outgate_date is not null then full_outgate_terminal else '' end \n"+
              "  else case when load_date is not null then pol_ingate_terminal  \n"+
              "  when pol_ingate_time is not null then pol_ingate_terminal \n"+
              "  when full_ingate_date is not null then full_ingate_terminal \n"+
              "  else mt_outgate_terminal end end as terminal, \n"+
              " case when osc_date is not null then to_char(to_Date(osc_Date,'YYYYMMDD'),'YYYY-MM-DD')||' ('||to_Date(osc_Date,'YYYYMMDD')-current_Date||' Days)' \n"+
              " else '-' end as osc_date, \n"+
              " case when ie_Type='I' and full_outgate_date is not null then 1 \n"+
              "  when ie_Type='E' and mt_outgate_date is not null then 0 \n"+
              "  when ie_Type='E' and full_ingate_date is not null then 1 \n"+
              "  when ie_Type='I' and mt_ingate_date is not null then 2 \n"+
              "  when ie_Type='E' and pol_ingate_time is not null then 2 \n"+
              "  when ie_Type='I' and unload_date is not null then 0 \n"+
              " else 3 end as loc_seq, cntr_no from own_dem_det \n"+
              " where bl_bkg= $1  \n"+
              " and ie_type= $2 )a \n"+
              " order by loc_seq,move_time desc \n"+
              " limit 1 \n",
        values: [request.body.blbkg,request.body.ietype],
        //rowMode: 'array',
    }
console.log("emdet:",sql);
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
            if(result != null) {
            	response.status(200).json(result.rows);
            } else {
            	response.status(200).json([]);
            }
        });

    });
}

const getDemdetCntrList = (request, response) => {

    let sql = {};
    if ( "I" == request.body.ie_type ) {
        // 수입의 경우
        sql = {
            text: "select cntr_no,type_size ,b.berth_terminal,b.berth_date,  \n"+
            " to_char(to_timestamp(unload_date,'YYYYMMDDHH24MI'),'YYYY-MM-DD HH24:MI') as unload_date,  \n"+
            "     to_char(to_date(substring(dem_date,1,8),'YYYYMMDD'),'YYYY-MM-DD') as dem_date,  \n"+
            "     to_char(to_timestamp(full_outgate_date,'YYYYMMDDHH24MI'),'YYYY-MM-DD HH24:MI') as full_outgate_date,  \n"+
            "     to_char(to_date(substring(ret_date,1,8),'YYYYMMDD'),'YYYY-MM-DD') as ret_date,  \n"+
            "     to_char(to_timestamp(mt_ingate_date,'YYYYMMDDHH24MI'),'YYYY-MM-DD HH24:MI') as mt_ingate_date,  \n"+
            "     to_char(to_timestamp(mt_outgate_date,'YYYYMMDDHH24MI'),'YYYY-MM-DD HH24:MI') as mt_outgate_date,  \n"+
            "     to_char(to_timestamp(full_ingate_date,'YYYYMMDDHH24MI'),'YYYY-MM-DD HH24:MI') as full_ingate_date,  \n"+
            "     to_char(to_timestamp(pol_ingate_time,'YYYYMMDDHH24MI'),'YYYY-MM-DD HH24:MI') as pol_ingate_time, \n"+
            "     to_char(to_date(substring(osc_date,1,8),'YYYYMMDD'),'YYYY-MM-DD') as osc_date, \n"+
            "     to_char(to_timestamp(load_date,'YYYYMMDDHH24MI'),'YYYY-MM-DD HH24:MI') as load_date, \n"+
            //"     unload_terminal,full_outgate_terminal,mt_ingate_terminal,mt_outgate_terminal,full_ingate_terminal,pol_ingate_terminal \n"+
            "      (select  terminal_kname from own_terminal_info where terminal= a.unload_terminal) as  unload_terminal,\n"+
            "      (select  terminal_kname from own_terminal_info where terminal= a.full_outgate_terminal) as  full_outgate_terminal,\n"+
            "      (select  terminal_kname from own_terminal_info where terminal= a.mt_ingate_terminal) as  mt_ingate_terminal,\n"+
            "      (select  terminal_kname from own_terminal_info where terminal= a.mt_outgate_terminal) as  mt_outgate_terminal,\n"+
            "      (select  terminal_kname from own_terminal_info where terminal= a.full_ingate_terminal) as  full_ingate_terminal,\n"+
            "      (select  terminal_kname from own_terminal_info where terminal= a.pol_ingate_terminal) as  pol_ingate_terminal \n"+
            " from ( \n"+
            "    select cntr_no,type_size, unload_date, unload_terminal,dem_date, full_outgate_date,full_outgate_terminal, ret_date, mt_ingate_date, \n"+
            "       mt_ingate_terminal,mt_outgate_date, full_ingate_date, pol_ingate_time, osc_date, load_date, mt_outgate_terminal,full_ingate_terminal,pol_ingate_terminal \n"+
            "      ,case when $5::varchar is null or $5::varchar = '' \n "+
            "  then (select ship_nm from own_vsl_info where ship_imo = $6 and ship_nm is not null limit 1 ) \n "+
            "  else $5::varchar end vessel_name \n"+
            "      ,$7 voyage_no \n"+
            "      from own_dem_det a \n"+
            "      where a.user_no = $1 \n"+
            "      and a.line_code = $2 \n"+
            "       and a.ie_type = $3 \n"+
            "       and a.bl_bkg = $4 ) a \n"+
            " left outer join ( \n"+
            "     select a.vessel_name, a.voyage_no, a.auth_port_code, coalesce(a.load_begin_date, a.atb) berth_date, a.terminal berth_terminal \n"+
            "       from own_cal_sch a \n"+
            "  where a.vessel_name = case when $5::varchar is null or $5::varchar = '' \n "+
            "  then (select ship_nm from own_vsl_info where ship_imo = $6 and ship_nm is not null limit 1 ) \n "+
            "  else $5::varchar end \n "+
            "     and a.voyage_no = $7 \n"+
            "    and a.auth_port_code = substring($8, 3) \n"+
            "    and to_date(substring(coalesce(a.ata, a.atb) ,0,9), 'YYYYMMDD') between to_date($9, 'YYYYMMDD')-3 and to_date($9, 'YYYYMMDD')+7 \n"+
            "   order by coalesce(a.load_begin_date, a.atb) desc limit 1 \n"+
            " ) b \n"+
            " on a.vessel_name = b.vessel_name \n"+
            " and a.voyage_no = b.voyage_no \n",
            values: [request.session.sUser.userno, request.body.carrier_code, request.body.ie_type, request.body.bl_bkg
                , request.body.vsl_name, request.body.vsl_code, request.body.voyage_no, request.body.pod, request.body.eta],
        }
    } else {
        // 수출의 경우
        sql = {
            text: "select cntr_no,type_size , \n"+
            "     to_char(to_timestamp(unload_date,'YYYYMMDDHH24MI'),'YYYY-MM-DD HH24:MI') as unload_date, \n"+
            "           to_char(to_date(substring(dem_date,0,8),'YYYYMMDD'),'YYYY-MM-DD') as dem_date, \n"+
            "           to_char(to_timestamp(full_outgate_date,'YYYYMMDDHH24MI'),'YYYY-MM-DD HH24:MI') as full_outgate_date, \n"+
            "           to_char(to_date(substring(ret_date,0,8),'YYYYMMDD'),'YYYY-MM-DD') as ret_date, \n"+
            "           to_char(to_timestamp(mt_ingate_date,'YYYYMMDDHH24MI'),'YYYY-MM-DD HH24:MI') as mt_ingate_date, \n"+
            "           to_char(to_timestamp(mt_outgate_date,'YYYYMMDDHH24MI'),'YYYY-MM-DD HH24:MI') as mt_outgate_date, \n"+
            "           to_char(to_timestamp(full_ingate_date,'YYYYMMDDHH24MI'),'YYYY-MM-DD HH24:MI') as full_ingate_date, \n"+
            "           to_char(to_timestamp(pol_ingate_time,'YYYYMMDDHH24MI'),'YYYY-MM-DD HH24:MI') as pol_ingate_time, \n"+
            "           to_char(to_date(substring(osc_date,0,8),'YYYYMMDD'),'YYYY-MM-DD') as osc_date, \n"+
            "           to_char(to_timestamp(load_date,'YYYYMMDDHH24MI'),'YYYY-MM-DD HH24:MI') as load_date, \n"+
            //"           mt_outgate_terminal,full_ingate_terminal,pol_ingate_terminal, load_terminal \n"+
            "           (select  terminal_kname from own_terminal_info where terminal= a.mt_outgate_terminal) as  mt_outgate_terminal, \n"+
            "           (select  terminal_kname from own_terminal_info where terminal= a.full_ingate_terminal) as full_ingate_terminal, \n"+
            "           (select  terminal_kname from own_terminal_info where terminal= a.pol_ingate_terminal) as pol_ingate_terminal, \n"+
            "           (select  terminal_kname from own_terminal_info where terminal= a.load_terminal) as load_terminal   \n"+
            "   from own_dem_det a \n"+
            "   where user_no = $1 \n"+
            "   and line_code = $2 \n"+
            "   and ie_type = $3 \n"+
            "   and bl_bkg = $4 \n",
            values: [request.session.sUser.userno, request.body.carrier_code, request.body.ie_type, request.body.bl_bkg],
        }
    }
    console.log( sql );
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
            if(result != null) {
            	response.status(200).json(result.rows);
            } else {
            	response.status(200).json([]);
            }
        });

    });
}

const getScrapManageList = (request, response) => {

    let params = [];
    params.push(request.body.num);
    let sqlText = "select * from ( ";
    sqlText += " select no, line_code, web_scrap_id, web_scrap_yn, web_scrap_path, web_seq, web_scrp_url, web_scrp_param ";
    sqlText += " ,to_char(insert_date, 'yyyy-mm-dd hh24:mi:ss') insert_date, insert_user ";
    sqlText += " ,to_char(update_date, 'yyyy-mm-dd hh24:mi:ss') update_date, update_user ";
    sqlText += " ,to_char(job_start_date, 'yyyy-mm-dd hh24:mi:ss') job_start_date ";
    sqlText += " ,to_char(job_end_date, 'yyyy-mm-dd hh24:mi:ss') job_end_date ";
    sqlText += " ,polling_start_date, polling_end_date, customs_line_code ";
    sqlText += " ,count(*) over()/10+1 as totalcnt ";
    sqlText += " ,floor(((row_number() over( order by no )) -1) /10 +1) as curpage ";
    sqlText += "  from own_web_scrp_manage ";
    sqlText += "  where 1 = 1 ";

    if( request.body.carriercode != "") {
        sqlText += " and line_code like $2 ";
        params.push( '%'+request.body.carriercode+'%' );
    }

    sqlText += ")a where curpage = $1";

    sqlText += " order by no ";
    console.log(sqlText, params);
    const sql = {
        text: sqlText,
        values: params,
        //rowMode: 'array',
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
            if(result != null) {
            	response.status(200).json(result.rows);
            } else {
            	response.status(200).json([]);
            }
            //response.status(200).send({'record':result.rows, 'field':result.fields.map(f => f.name)});
            //response.status(200).json(result.rows);
            // console.log(result.fields.map(f => f.name));
        });

        // conn.release();
    });
    
}

const getTrackingTerminal = (request, response) => {
    console.log(request.body)
    let sql = ""; 

    if(request.body.ie_type == "E") {
        sql += " select to_timestamp(mt_outgate_date,'YYYYMMDDHH24MI') mt_outgate_date, to_timestamp(full_ingate_date,'YYYYMMDDHH24MI') full_ingate_date, ";
        sql += " to_timestamp(mt_ingate_date,'YYYYMMDDHH24MI') mt_ingate_date, to_timestamp(load_date,'YYYYMMDDHH24MI') load_date, ";
        sql += " mt_outgate_terminal, full_ingate_terminal, mt_ingate_terminal, load_terminal, ";
        sql += " (select float8(wgs84_x) from own_terminal_info where terminal = mt_outgate_terminal) mt_outgate_terminal_x, ";
        sql += " (select float8(wgs84_y) from own_terminal_info where terminal = mt_outgate_terminal) mt_outgate_terminal_y, ";
        sql += " (select float8(wgs84_x) from own_terminal_info where terminal = full_ingate_terminal) full_ingate_terminal_x, ";
        sql += " (select float8(wgs84_y) from own_terminal_info where terminal = full_ingate_terminal) full_ingate_terminal_y, ";
        sql += " (select float8(wgs84_x) from own_terminal_info where terminal = mt_ingate_terminal) mt_ingate_terminal_x, ";
        sql += " (select float8(wgs84_y) from own_terminal_info where terminal = mt_ingate_terminal) mt_ingate_terminal_y, ";
        sql += " (select float8(wgs84_x) from own_terminal_info where terminal = load_terminal) load_terminal_x, ";
        sql += " (select float8(wgs84_y) from own_terminal_info where terminal = load_terminal) load_terminal_y, ";
    }else {
        sql += " select to_timestamp(unload_date,'YYYYMMDDHH24MI') unload_date, to_timestamp(full_outgate_date,'YYYYMMDDHH24MI') full_outgate_date, ";
        sql += " to_timestamp(mt_ingate_date,'YYYYMMDDHH24MI') mt_ingate_date, to_timestamp(mt_outgate_date,'YYYYMMDDHH24MI') mt_outgate_date, ";
        sql += " unload_terminal, full_outgate_terminal, mt_ingate_terminal, mt_outgate_terminal, ";
        sql += " (select float8(wgs84_x) from own_terminal_info where terminal = unload_terminal) unload_terminal_x, ";
        sql += " (select float8(wgs84_y) from own_terminal_info where terminal = unload_terminal) unload_terminal_y, ";
        sql += " (select float8(wgs84_x) from own_terminal_info where terminal = full_outgate_terminal) full_outgate_terminal_x, ";
        sql += " (select float8(wgs84_y) from own_terminal_info where terminal = full_outgate_terminal) full_outgate_terminal_y, ";
        sql += " (select float8(wgs84_x) from own_terminal_info where terminal = mt_ingate_terminal) mt_ingate_terminal_x, ";
        sql += " (select float8(wgs84_y) from own_terminal_info where terminal = mt_ingate_terminal) mt_ingate_terminal_y, ";
        sql += " (select float8(wgs84_x) from own_terminal_info where terminal = mt_outgate_terminal) mt_outgate_terminal_x, ";
        sql += " (select float8(wgs84_y) from own_terminal_info where terminal = mt_outgate_terminal) mt_outgate_terminal_y, ";
    }
    sql += " ie_type "
    sql += " from own_dem_det ";
    sql += " where 1=1 ";
    sql += " and req_seq = '"+ request.body.req_seq +"' ";

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
            if(result != null) {
            	response.status(200).json(result.rows);
            // } else {
            // 	response.status(200).json([]);
            }
            //response.status(200).send({'record':result.rows, 'field':result.fields.map(f => f.name)});
            //response.status(200).json(result.rows);
            // console.log(result.fields.map(f => f.name));
        });

        // conn.release();
    });
}

// tracking DEM, DET 정보(수입용)
// 1. OWN_DEM_DET 테이블 정보로 나타낸다.
// 2. 값이 없는 경우 OWN_CAL_SCH 테이블 정보를 조회한다.
const getImportTerminalActivity = (request, response) => {
    let sqlText = " select a.terminal, coalesce(b.terminal_kname, a.terminal) as terminal_name , activity_date \n ";
    sqlText += "       ,case when activity_date is null then null \n ";
    sqlText += "             else a.activity||' ('||substring(a.activity_date, 0, 9)||')' \n ";
    sqlText += "        end activity \n ";
    sqlText += "       ,a.req_seq \n ";
    sqlText += "       ,b.url as terminal_url \n ";
    sqlText += "   from ( \n ";
    sqlText += "         select case when mt_ingate_date is not null or mt_ingate_date != '' then mt_ingate_terminal \n ";
    sqlText += "                     when full_outgate_date is not null or full_outgate_date != '' then full_outgate_terminal \n ";
    sqlText += "                     when unload_date is not null or unload_date != '' then unload_terminal \n ";
    sqlText += "                     else null \n ";
    sqlText += "                end terminal \n ";
    sqlText += "               ,case when mt_ingate_date is not null or mt_ingate_date != '' then 'EMPTY IN' \n ";
    sqlText += "                     when full_outgate_date is not null or full_outgate_date != '' then 'FULL OUT' \n ";
    sqlText += "                     when unload_date is not null or unload_date != '' then 'UNLOAD' \n ";
    sqlText += "                     else null \n ";
    sqlText += "                end activity \n ";
    sqlText += "               ,case when mt_ingate_date is not null or mt_ingate_date != '' then mt_ingate_date \n ";
    sqlText += "                     when full_outgate_date is not null or full_outgate_date != '' then full_outgate_date \n ";
    sqlText += "                     when unload_date is not null or unload_date != '' then unload_date \n ";
    sqlText += "                     else null \n ";
    sqlText += "                end activity_date \n ";
    sqlText += "               ,case when osc_date is not null or osc_date != '' then to_char(to_Date(osc_Date,'YYYYMMDD'),'YYYY-MM-DD')||' ('||to_Date(osc_Date,'YYYYMMDD')-current_Date||' Days)' \n ";
    sqlText += "                     else '-' \n ";
    sqlText += "                end as osc_date \n ";
    sqlText += "               ,a.req_seq \n ";
    sqlText += "           from own_dem_det a \n ";
    sqlText += "          where req_seq = $1 \n ";
    sqlText += "          and user_no = $2 \n ";
    sqlText += "          and line_code = $3 \n ";
    sqlText += "          and ie_type = $4 \n ";
    sqlText += "          and bl_bkg = $5 \n ";
    sqlText += "          order by coalesce(update_date, insert_date ) desc  \n ";
    sqlText += "          limit 1 ) a \n ";
    sqlText += "  left outer join own_terminal_info b \n ";
    sqlText += "  on a.terminal = b.terminal \n ";
    const sql = {
        text: sqlText,
        values: [request.body.req_seq, request.session.sUser.userno, request.body.carrier_code, request.body.ie_type, request.body.bl_bkg],
        //rowMode: 'array',
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
            if(result != null) {
                if (result.rows.length > 0 ) {
                    // 수입의 경우 결과값이 없으면 OWN_CAL_SCH 테이블 조회
                    if ( null == result.rows[0].terminal ) {
                        getImportTerminalActivityFromCalSch( request, response );
                    } else {
                        response.status(200).json(result.rows);
                    }
                } else {
                    getImportTerminalActivityFromCalSch( request, response );
                }
            } else {
                getImportTerminalActivityFromCalSch( request, response );
                // getTerminalActivityFromSch()
            }
        });
    });
}


const getImportTerminalActivityFromCalSch = (request, response) => {

    // let params = [];

    let sqlText = " select a.terminal, coalesce(b.terminal_kname, a.terminal) as terminal_name \n ";
    sqlText += "       ,case when coalesce(a.load_begin_date, a.atb) is null then null \n ";
    sqlText += "             else 'BERTHING'||' ('||substring(coalesce(a.load_begin_date, a.atb), 0, 9)||')' \n ";
    sqlText += "        end activity \n ";
    sqlText += "       ,$1 req_seq \n ";
    sqlText += "       ,url as terminal_url \n ";
    sqlText += "   from own_cal_sch a \n ";
    sqlText += " left outer join own_terminal_info b \n ";
    sqlText += "   on a.terminal = b.terminal \n ";
    sqlText += "  where a.vessel_name = case when $2::varchar is null or $2::varchar = '' \n ";
    sqlText += "  then (select ship_nm from own_vsl_info where ship_imo = $3 and ship_nm is not null limit 1 ) \n ";
    sqlText += "  else $2::varchar end \n ";
    // sqlText += "    and a.voyage_no = $4 \n "; 20200616 사업팀 요청에 의해 제거
    sqlText += "    and a.auth_port_code = substring($4, 3) \n ";
    sqlText += "    and to_date(substring(coalesce(a.ata, a.atb) ,0,9), 'YYYYMMDD') between to_date($5, 'YYYYMMDD')-3 and to_date($5, 'YYYYMMDD')+7 \n ";
    sqlText += "    order by a.ata desc \n ";
    const sql = {
        text: sqlText,
        values: [request.body.req_seq, request.body.vsl_name, request.body.vsl_code, request.body.pod, request.body.eta],
        //rowMode: 'array',
    }
    console.log(sqlText);
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
            if(result != null) {
                response.status(200).json(result.rows);
            // } else {
                // response.status(200).json([]);
                // getTerminalActivityFromSch()
            }
        });
    });
}


// tracking DEM, DET 정보(수출용)
// 1. mt_outgate_date > full_ingate_date > pol_ingate_time > load_date > departure
// 2. berth 정보를 최우선으로 보여줘야함. (OWN_CAL_SCH)
// 3. OWN_DEM_DET 에서 Terminal, Terminal_ref_no 정보를 가지고 OWN_CAL_SCH 조회
// 4. OWN_CAL_SCH 데이터 없는 경우 OWN_DEM_DET 정보를 보여준다.
const getExportTerminalActivity = (request, response) => {

    // let params = [];

    let sqlText = "select a.terminal, coalesce(b.terminal_kname, a.terminal) as terminal_name \n ";
    sqlText += "      ,case when activity_date is null then null \n ";
    sqlText += "            else a.activity||' ('||substring(a.activity_date, 0, 9)||')' \n ";
    sqlText += "       end activity \n ";
    sqlText += "      ,a.req_seq \n ";
    sqlText += "      ,b.url \n ";
    sqlText += "      ,load_terminal_ref_no \n ";
    sqlText += "      ,case when activity_date is null then null \n ";
    sqlText += "      else substring(a.activity_date, 0, 9) \n ";
    sqlText += "      end activity_date \n ";
    sqlText += "      ,to_char(now(), 'YYYYMMDD') today \n ";
    sqlText += "  from ( \n ";
    sqlText += "        select case when load_date is not null or load_date != '' \n ";
    sqlText += "                     then load_terminal \n ";
    sqlText += "                     when pol_ingate_time is not null or pol_ingate_time != '' \n ";
    sqlText += "                     then pol_ingate_terminal  \n ";
    sqlText += "                     when full_ingate_date is not null or full_ingate_date != '' \n ";
    sqlText += "                     then full_ingate_terminal  \n ";
    sqlText += "                     when mt_outgate_date is not null or mt_outgate_date != '' \n ";
    sqlText += "                     then mt_outgate_terminal \n ";
    sqlText += "                     else null \n ";
    sqlText += "                end terminal \n ";
    sqlText += "               ,case when load_date is not null or load_date != '' \n ";
    sqlText += "                     then 'LOAD'  \n ";
    sqlText += "                     when pol_ingate_time is not null or pol_ingate_time != '' \n ";
    sqlText += "                     then 'POL IN'   \n ";
    sqlText += "                     when full_ingate_date is not null or full_ingate_date != '' \n ";
    sqlText += "                     then 'FULL IN' \n ";
    sqlText += "                     when mt_outgate_date is not null or mt_outgate_date != '' \n ";
    sqlText += "                     then 'EMPTY OUT' \n ";
    sqlText += "                     else null \n ";
    sqlText += "                 end activity \n ";
    sqlText += "                ,case when load_date is not null or load_date != '' then load_date \n ";
    sqlText += "                      when pol_ingate_time is not null or pol_ingate_time != '' then pol_ingate_time \n ";
    sqlText += "                      when full_ingate_date is not null or full_ingate_date != '' then full_ingate_date \n ";
    sqlText += "                      when mt_outgate_date is not null or mt_outgate_date != '' then mt_outgate_date \n ";
    sqlText += "                      else null \n ";
    sqlText += "                 end activity_date \n ";
    sqlText += "              ,case when osc_date is not null or osc_date != '' then to_char(to_Date(osc_Date,'YYYYMMDD'),'YYYY-MM-DD')||' ('||to_Date(osc_Date,'YYYYMMDD')-current_Date||' Days)'  \n ";
    sqlText += "                    else '-' \n ";
    sqlText += "               end as osc_date \n ";
    sqlText += "              ,a.req_seq, load_terminal_ref_no\n ";
    sqlText += "          from own_dem_det a \n ";
    sqlText += "          where req_seq = $1 \n ";
    sqlText += "          and user_no = $2 \n ";
    sqlText += "          and line_code = $3 \n ";
    sqlText += "          and ie_type = $4 \n ";
    sqlText += "          and bl_bkg = $5 \n ";
    sqlText += "          order by coalesce(update_date, insert_date ) desc  \n ";
    sqlText += "          limit 1 ) a \n ";
    sqlText += " left outer join own_terminal_info b  \n ";
    sqlText += " on a.terminal = b.terminal \n ";
    console.log(sqlText, request.body.req_seq, request.session.sUser.userno, request.body.carrier_code, request.body.ie_type, request.body.bl_bkg);
    const sql = {
        text: sqlText,
        values: [request.body.req_seq, request.session.sUser.userno, request.body.carrier_code, request.body.ie_type, request.body.bl_bkg],
        //rowMode: 'array',
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
            if(result != null) {
                if (result.rows.length > 0 ) {
                    // 수출의 경우 값이 있으면 Terminal, Terminal_ref_no 정보로 OWN_CAL_SCH
                    // OWN_CAL_SCH 값이 있으면 해당건을 우선으로 보여준다.
                    // mt_outgate_date > full_ingate_date > pol_ingate_time > load_date > departure
                    // BERTH 정보는 선석 스케줄에 있다
                    if ( null == result.rows[0].terminal ) {
                        response.status(200).json([]);
                    } else {
                        // activity 정보가 현재 시점 보다 과거의 경우 스케줄 정보를 보여준다.
                        console.log(result.rows[0].activity_date,  result.rows[0].today);
                        if (result.rows[0].activity_date < result.rows[0].today) {
                            getExportTerminalActivityFromCalSch( request, response , result);
                        } else {
                            response.status(200).json(result.rows);
                        }
                    }
                } else {
                    response.status(200).json([]);
                }
            } else {
                response.status(200).json([]);
                // getTerminalActivityFromSch()
            }
        });
    });
}

// 선석스케줄
// 우선 순위 ETD 보다 큰경우 가장 근접한게 1순위
// ETD 보다 큰게 없는 경우 MAX 값이 1순위
const getExportTerminalActivityFromCalSch = (request, response, beforeReuslt) => {

    let sqlText = " select * from (select a.terminal, coalesce(b.terminal_kname, a.terminal) as terminal_name \n ";
    sqlText += "       ,case when coalesce(a.load_end_date, a.atd) is null then null \n ";
    sqlText += "             else 'DEPARTURE'||' ('||substring(coalesce(a.load_end_date, a.atd), 0, 9)||')' \n ";
    sqlText += "        end activity \n ";
    sqlText += "       ,$1 req_seq \n ";
    sqlText += "       ,url as terminal_url \n ";
    sqlText += "       ,0 seq \n ";
    sqlText += "   from own_cal_sch a \n ";
    sqlText += " left outer join own_terminal_info b \n ";
    sqlText += "   on a.terminal = b.terminal \n ";
    sqlText += "  where a.terminal = $2 \n ";
    sqlText += "    and lpad(a.terminal_ref_no,3,'0') = $3 \n ";
    // sqlText += "    and a.auth_port_code = substring($3, 3) \n ";
    sqlText += "    and to_date(substring(coalesce(a.load_end_date, a.atd) ,0,9), 'YYYYMMDD') between to_date($4, 'YYYYMMDD')-3 and to_date($4, 'YYYYMMDD')+7 \n ";
    sqlText += "    and substring(coalesce(a.load_end_date, a.atd), 0, 9) >= $4 order by coalesce(a.load_end_date, a.atd) asc limit 1 ) a \n ";
    sqlText += "    union all \n ";
    sqlText += " select * from (select a.terminal, coalesce(b.terminal_kname, a.terminal) as terminal_name \n ";
    sqlText += "       ,case when coalesce(a.load_end_date, a.atd) is null then null \n ";
    sqlText += "             else 'DEPARTURE'||' ('||substring(coalesce(a.load_end_date, a.atd), 0, 9)||')' \n ";
    sqlText += "        end activity \n ";
    sqlText += "       ,$1 req_seq \n ";
    sqlText += "       ,url as terminal_url \n ";
    sqlText += "       ,1 seq \n ";
    sqlText += "   from own_cal_sch a \n ";
    sqlText += " left outer join own_terminal_info b \n ";
    sqlText += "   on a.terminal = b.terminal \n ";
    sqlText += "  where a.terminal = $2 \n ";
    sqlText += "    and lpad(a.terminal_ref_no,3,'0') = $3 \n ";
    // sqlText += "    and a.auth_port_code = substring($3, 3) \n ";
    sqlText += "    and to_date(substring(coalesce(a.load_end_date, a.atd) ,0,9), 'YYYYMMDD') between to_date($4, 'YYYYMMDD')-3 and to_date($4, 'YYYYMMDD')+7 \n ";
    sqlText += "    and substring(coalesce(a.load_end_date, a.atd), 0, 9) < $4 order by coalesce(a.load_end_date, a.atd) desc limit 1) a \n ";
    sqlText += "    order by seq asc limit 1 ";
    console.log(sqlText, beforeReuslt.rows[0].terminal, beforeReuslt.rows[0].load_terminal_ref_no
        , request.body.pol, request.body.etd, request.body.req_seq);
    const sql = {
        text: sqlText,
        values: [request.body.req_seq, beforeReuslt.rows[0].terminal, beforeReuslt.rows[0].load_terminal_ref_no
        // , request.body.pol
        , request.body.etd],
        //rowMode: 'array',
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
            // 수출의 경우 선석이 마지막 이므로 데이터가 있는 경우 해당 정보 보여준다.
            if(result != null) {
                if (result.rows.length > 0 ) {
                    if ( null == result.rows[0].terminal ) {
                        response.status(200).json(beforeReuslt.rows);
                    } else {
                        response.status(200).json(result.rows);
                    }
                } else {
                    response.status(200).json(beforeReuslt.rows);
                }
            } else {
                // 데이터가 없는 경우 이전에 조회 했던 내용을 보내준다
                response.status(200).json(beforeReuslt.rows);
            }
        });
    });
}
const getTsTracking = (request, response) => {
    console.log(request.body)
    let sql = "";
    sql += " select vessel, start_location as pol, end_location as pod from own_tracking_bl_ports_new ";
    sql += " where 1=1 ";
    sql += " and req_seq = '"+ request.body.reqseq+"' ";
    sql += " and carrier_code = '" +request.body.carrierCode+ "' ";
    sql += " and user_no = '"+request.session.sUser.userno+"'"
    sql += " order by seq "
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
            if(result != null) {
            	response.status(200).json(result.rows);
            } else {
            	response.status(200).json([]);
            }
            //response.status(200).send({'record':result.rows, 'field':result.fields.map(f => f.name)});
            //response.status(200).json(result.rows);
            // console.log(result.fields.map(f => f.name));
        });

        // conn.release();
    });
}

module.exports = {
	getTrackingList,
	getMyBlList,
	getBookMark,
	getCntrList,
	getUserSetting,
	getCntrDetailList,
	getCarrierInfo,
	setUserSetting,
    deleteMyBlNo,
    getPkMyBlList,
    getPkMyUpdateBlList,
    saveBlList,
    insertBlRequest,
    setUserBLUpdate,
    getDemdetDtlCurrent,
    getdemdetCurrent,
    getDemdetCntrList,
    getScrapManageList,
    getTrackingTerminal,
    getImportTerminalActivity,
    getExportTerminalActivity,
    getTsTracking
}