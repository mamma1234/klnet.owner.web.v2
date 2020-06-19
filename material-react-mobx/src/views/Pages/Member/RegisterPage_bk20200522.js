import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import Timeline from "@material-ui/icons/Timeline";
import Code from "@material-ui/icons/Code";
import Group from "@material-ui/icons/Group";
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
// import LockOutline from "@material-ui/icons/LockOutline";
import Check from "@material-ui/icons/Check";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import InfoArea from "components/InfoArea/InfoArea.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Wizard from "components/Wizard/KlnetWizard.js";
import Step1 from "views/Pages/Member/RegisterSteps/Step1.js";
import Step2 from "views/Pages/Member/RegisterSteps/Step2.js";
import Step3 from "views/Pages/Member/RegisterSteps/Step3.js";
import styles from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";

const useStyles = makeStyles(styles);

export default function RegisterPage(props) {
  const [checked, setChecked] = React.useState([]);
  const handleToggle = value => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };
  const classes = useStyles();
  
  function handleState (e) {
	 if(e ==="success") {
		 alert("회원가입에 성공하였습니다."); 
		 props.onClose();
	 } else if (e ==="401") {
		 alert("이미 등록된 아이디입니다."); 
	 } else {
		 alert(e);
	 }
  }
  
  return (
    <div style={{minHeight:"495px"}}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <InfoArea
                    title="Marketing"
                    description="We've created the marketing campaign of the website. It was a very interesting collaboration."
                    icon={Timeline}
                    iconColor="rose"
                  />
                  <InfoArea
                    title="Fully Coded in HTML5"
                    description="We've developed the website with HTML5 and CSS3. The client has access to the code using GitHub."
                    icon={Code}
                    iconColor="primary"
                  />
                  <InfoArea
                    title="Built Audience"
                    description="There is also a Fully Customizable CMS Admin Dashboard for this product."
                    icon={Group}
                    iconColor="info"
                  />
                </GridItem>
                <GridItem xs={12} sm={8} md={6}>
                  <Wizard
                  	validate
	                  steps={[
	                    { stepName: "Step1", stepComponent: Step1, stepId: "step1" },
	                    { stepName: "Step2", stepComponent: Step2, stepId: "step2" },
	                    { stepName: "Step3", stepComponent: Step3, stepId: "step3" }
	                  ]}
	                  //title="Build Your Profile"
	                  //subtitle="This information will let us know more about you."
	                  finishButtonClick={e => handleState(e)}
                />
                </GridItem>
              </GridContainer>
    </div>
  );
}