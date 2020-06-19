import React from "react";
import axios from 'axios';
import queryString from 'query-string';





export default function PhonePopup(props) {
	
	const query = queryString.parse(window.location.search);
	
	React.useEffect(() => {
		
		 return axios ({
				url:'/auth/sertify',
				method:'POST',
				data: {mdltkn:query.mdl_tkn}
			}).then(res=>{
				window.opener.kcbResultForm.RSLT_CD.value = res.data.RSLT_CD;
				window.opener.kcbResultForm.RSLT_MSG.value = res.data.RSLT_MSG;
				window.opener.kcbResultForm.TEL_NO.value = res.data.TEL_NO;
				window.opener.kcbResultForm.RSLT_NAME.value = res.data.RSLT_NAME;
				window.opener.event_popup();
				window.self.close();
			}
			)
			.catch(err => {
				alert(err);
			});

		    return () => {
		      console.log('cleanup');
		     // window.removeEventListener("touchmove",handleTouchMove);
		    };
	}, []);
	
  return (
		  <p></p>
  );
}

