import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import axios from 'axios';

import wizardStyle from "assets/jss/material-dashboard-pro-react/components/wizardStyle.js";

class Wizard extends React.Component {
  constructor(props) {
	  //console.log("wizard value:",props);
    super(props);
    var width;
    if (this.props.steps.length === 1) {
      width = "100%";
    } else {
      if (window.innerWidth < 600) {
        if (this.props.steps.length !== 3) {
          width = "50%";
        } else {
          width = 100 / 3 + "%";
        }
      } else {
        if (this.props.steps.length === 2) {
          width = "50%";
        } else {
          width = 100 / 3 + "%";
        }
      }
    }
    
    this.state = {
      currentStep: 0,
      color: this.props.color,
      nextButton: this.props.steps.length > 1 ? true : false,
      previousButton: false,
      finishButton: this.props.steps.length === 1 ? true : false,
      width: width,
      movingTabStyle: {
        transition: "transform 0s"
      },
      allStates: {},
      provider:'',
      kakaoid:'',tokenkakao:'',naverid:'',tokennaver:'',
	  faceid:'',tokenface:'',googleid:'',tokengoogle:'',
	  socialuser:''
    };
    
    this.navigationStepChange = this.navigationStepChange.bind(this);
    this.refreshAnimation = this.refreshAnimation.bind(this);
    this.previousButtonClick = this.previousButtonClick.bind(this);
    this.previousButtonClick = this.previousButtonClick.bind(this);
    this.finishButtonClick = this.finishButtonClick.bind(this);
    this.updateWidth = this.updateWidth.bind(this);
  }
  wizard = React.createRef();
  componentDidMount() {
    if(this.props.setvalue.user) {
    	//console.log("user info:",this.props.setvalue.user);
    	this.setState({currentStep:2,
    				   previousButton:false,
    				   nextButton:false,
    				   finishButton:true,
    				   provider:this.props.setvalue.user.provider,
    				   kakaoid:this.props.setvalue.user.provider === "kakao"?this.props.setvalue.user.userid:'',
    	    		   tokenkakao:this.props.setvalue.user.provider === "kakao"?this.props.setvalue.user.accessToken:'',
    	    	       naverid:this.props.setvalue.user.provider === "naver"?this.props.setvalue.user.userid:'',
    	    	       tokennaver:this.props.setvalue.user.provider === "naver"?this.props.setvalue.user.accessToken:'',
    	    	       faceid:this.props.setvalue.user.provider === "facebook"?this.props.setvalue.user.userid:'',
    	    	       tokenface:this.props.setvalue.provider === "facebook"?this.props.setvalue.user.accessToken:'',
    	    	       googleid:this.props.setvalue.user.provider === "google"?this.props.setvalue.user.userid:'',
    	    	       tokengoogle:this.props.setvalue.user.provider === "google"?this.props.setvalue.user.accessToken:'',
    	    	       socialuser:this.props.setvalue.user.username	   
    	});

    	this.refreshAnimation(2);
        window.addEventListener("resize", this.updateWidth);
    } else {
    	this.refreshAnimation(0);
        window.addEventListener("resize", this.updateWidth);
    }
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWidth);
  }
  updateWidth() {
    this.refreshAnimation(this.state.currentStep);
  }
  navigationStepChange(key) {
    if (this.props.steps && !this.props.setvalue) {
      var validationState = true;
      if (key > this.state.currentStep) {
        for (var i = this.state.currentStep; i < key; i++) {
          if (this[this.props.steps[i].stepId].sendState !== undefined) {
            this.setState({
              allStates: {
                ...this.state.allStates,
                [this.props.steps[i].stepId]: this[
                  this.props.steps[i].stepId
                ].sendState()
              }
            });
          }
          if (
            this[this.props.steps[i].stepId].isValidated !== undefined &&
            this[this.props.steps[i].stepId].isValidated() === false
          ) {
            validationState = false;
            break;
          }
        }
      }
      if (validationState) {
        this.setState({
          currentStep: key,
          nextButton: this.props.steps.length > key + 1 ? true : false,
          previousButton: key > 0 ? true : false,
          finishButton: this.props.steps.length === key + 1 ? true : false
        });
        this.refreshAnimation(key);
      }
    }
  }
  nextButtonClick() {
    if (
      (this.props.validate &&
        ((this[this.props.steps[this.state.currentStep].stepId].isValidated !==
          undefined &&
          this[
            this.props.steps[this.state.currentStep].stepId
          ].isValidated()) ||
          this[this.props.steps[this.state.currentStep].stepId].isValidated ===
            undefined)) ||
      this.props.validate === undefined
    ) {
    	//인증
    	//console.log(">>>>>>>실명인증");
    	//window.open("/authpage/phonepopup", "auth_popup", "width=430,height=640,scrollbar=yes");
    	
      if (
        this[this.props.steps[this.state.currentStep].stepId].sendState !==
        undefined
      ) {
        this.setState({
          allStates: {
            ...this.state.allStates,
            [this.props.steps[this.state.currentStep].stepId]: this[
              this.props.steps[this.state.currentStep].stepId
            ].sendState()
          }
        });
        
        console.log(this.state);
      }

      var key = this.state.currentStep + 1;
      this.setState({
        currentStep: key,
        nextButton: this.props.steps.length > key + 1 ? true : false,
        previousButton: key > 0 ? true : false,
        finishButton: this.props.steps.length === key + 1 ? true : false
      });
      this.refreshAnimation(key);
    }
  }
  previousButtonClick() {
    if (
      this[this.props.steps[this.state.currentStep].stepId].sendState !==
      undefined
    ) {
      this.setState({
        allStates: {
          ...this.state.allStates,
          [this.props.steps[this.state.currentStep].stepId]: this[
            this.props.steps[this.state.currentStep].stepId
          ].sendState()
        }
      });
    }
    var key = this.state.currentStep - 1;
    if (key >= 0) {
      this.setState({
        currentStep: key,
        nextButton: this.props.steps.length > key + 1 ? true : false,
        previousButton: key > 0 ? true : false,
        finishButton: this.props.steps.length === key + 1 ? true : false
      });
      this.refreshAnimation(key);
    }
  }
  finishButtonClick() {

    if (
      (this.props.validate === false &&
        this.props.finishButtonClick !== undefined) ||
      (this.props.validate &&
        ((this[this.props.steps[this.state.currentStep].stepId].isValidated !==
          undefined &&
          this[
            this.props.steps[this.state.currentStep].stepId
          ].isValidated()) ||
          this[this.props.steps[this.state.currentStep].stepId].isValidated ===
            undefined) &&
        this.props.finishButtonClick !== undefined)
    ) {
      this.setState(
        {
          allStates: {
            ...this.state.allStates,
            [this.props.steps[this.state.currentStep].stepId]: this[
              this.props.steps[this.state.currentStep].stepId
            ].sendState()
          }
        },
        () => {
          //this.props.finishButtonClick(this.state.allStates);
          //this.props.finishButtonClick("회원가입이 완료 되었습니다.(no Database)");
        	console.log(">>>>",this.state.allStates.step1);
        	console.log(">>>>",this.state.allStates);
        	return axios ({
    			url:'/auth/join',
    			method:'POST',
    			//headers:{'Authorization':'Bearer '+this.props.store.token},
    			data: {provider:this.state.provider?this.state.provider:'local',
    				   email : this.state.allStates.step1 !== undefined?this.state.allStates.step1.email:'socail',
    				   password : this.state.allStates.step1 !== undefined?this.state.allStates.step1.password:'test',
    				   name : this.state.allStates.step2 !== undefined?this.state.allStates.step2.name?this.state.allStates.step2.name:this.state.socialuser:this.state.socialuser,
    				   phone: this.state.allStates.step2 !== undefined?this.state.allStates.step2.phone:'',
    				   company: this.state.allStates.step2 !== undefined?this.state.allStates.step2.company:'',
    				   kakaoid:this.state.kakaoid,
    				   tokenkakao:this.state.tokenkakao,
    				   naverid:this.state.naverid,
    				   tokennaver:this.state.tokennaver,
    				   faceid:this.state.faceid,
    				   tokenface:this.state.tokenface,
    				   googleid:this.state.googleid,
    				   tokengoogle:this.state.tokengoogle, 
    				   }
    		}).then(res=>this.props.finishButtonClick("success"))
    		.catch(err => {
    			if(err.response.status === 401 ){
    				this.props.finishButtonClick("401");	
    			} else {
    				this.props.finishButtonClick(err);	
    			}
    		});
        }
      );
    }
  }
  refreshAnimation(index) {
    var total = this.props.steps.length;
    var li_width = 100 / total;
    var total_steps = this.props.steps.length;
    var move_distance =
      this.wizard.current.children[0].offsetWidth / total_steps;
    var index_temp = index;
    var vertical_level = 0;

    var mobile_device = window.innerWidth < 600 && total > 3;

    if (mobile_device) {
      move_distance = this.wizard.current.children[0].offsetWidth / 2;
      index_temp = index % 2;
      li_width = 50;
    }

    this.setState({ width: li_width + "%" });

    var step_width = move_distance;
    move_distance = move_distance * index_temp;

    var current = index + 1;

    if (current === 1 || (mobile_device === true && index % 2 === 0)) {
      move_distance -= 8;
    } else if (
      current === total_steps ||
      (mobile_device === true && index % 2 === 1)
    ) {
      move_distance += 8;
    }

    if (mobile_device) {
      vertical_level = parseInt(index / 2, 10);
      vertical_level = vertical_level * 38;
    }
    var movingTabStyle = {
      width: step_width,
      transform:
        "translate3d(" + move_distance + "px, " + vertical_level + "px, 0)",
      transition: "all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)",
      paddingTop:"0px",
      paddingBottom:"0px",
      top:"-1px"
    };
    this.setState({ movingTabStyle: movingTabStyle });
  }
  render() {
    const { classes, title, subtitle, color, steps } = this.props;
    return (
      <div className={classes.wizardContainer} ref={this.wizard}>
          <div className={classes.wizardNavigation}>
            <ul className={classes.nav}>
              {steps.map((prop, key) => {
                return (
                  <li
                    className={classes.steps}
                    key={key}
                    style={{ width: this.state.width }}
                  >
                    <a
                      //href="#pablo"
                      style={{paddingTop:"0px",paddingBottom:"0px"}}
                      className={classes.stepsAnchor}
                      onClick={e => {
                        e.preventDefault();
                        this.navigationStepChange(key);
                      }}
                    >
                      {prop.stepName}
                    </a>
                  </li>
                );
              })}
            </ul>
            <div
              className={classes.movingTab + " " + classes[color]}
              style={this.state.movingTabStyle}
            >
              {steps[this.state.currentStep].stepName}
            </div>
          </div>
          <div className={classes.content} style={{marginTop:'0',paddingTop:'10px',paddingBottom:'10px'}}>
            {steps.map((prop, key) => {
              const stepContentClasses = cx({
                [classes.stepContentActive]: this.state.currentStep === key,
                [classes.stepContent]: this.state.currentStep !== key
              });
              return (
                <div className={stepContentClasses} key={key}>
                  <prop.stepComponent
                    innerRef={node => (this[prop.stepId] = node)}
                    allStates={this.state.allStates}
                  />
                </div>
              );
            })}
          </div>
          <div className={classes.footer}>
            <div className={classes.left}>
              {this.state.previousButton ? (
                <Button
                  className={this.props.previousButtonClasses}
                  onClick={() => this.previousButtonClick()}
                >
                  {this.props.previousButtonText}
                </Button>
              ) : null}
            </div>
            <div className={classes.right}>
              {this.state.nextButton ? (
                <Button
                  color="rose"
                  className={this.props.nextButtonClasses}
                  onClick={() => this.nextButtonClick()}
                >
                  {this.props.steps[this.state.currentStep].stepId === "step2"?"실명인증":this.props.nextButtonText}
                </Button>
              ) : null}
              {this.state.finishButton ? (
                <Button
                  color="rose"
                  className={this.finishButtonClasses}
                  onClick={() => this.finishButtonClick()}
                >
                  {this.props.finishButtonText}
                </Button>
              ) : null}
            </div>
            <div className={classes.clearfix} />
          </div>
      </div>
    );
  }
}

Wizard.defaultProps = {
  color: "rose",
  title: "Here should go your title",
  subtitle: "And this would be your subtitle",
  previousButtonText: "Previous",
  previousButtonClasses: "",
  nextButtonClasses: "",
  nextButtonText: "Next",
  finishButtonClasses: "",
  finishButtonText: "Finish"
};

Wizard.propTypes = {
  classes: PropTypes.object.isRequired,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      stepName: PropTypes.string.isRequired,
      stepComponent: PropTypes.object.isRequired,
      stepId: PropTypes.string.isRequired
    })
  ).isRequired,
  color: PropTypes.oneOf([
    "primary",
    "warning",
    "danger",
    "success",
    "info",
    "rose"
  ]),
  title: PropTypes.string,
  subtitle: PropTypes.string,
  previousButtonClasses: PropTypes.string,
  previousButtonText: PropTypes.string,
  nextButtonClasses: PropTypes.string,
  nextButtonText: PropTypes.string,
  finishButtonClasses: PropTypes.string,
  finishButtonText: PropTypes.string,
  finishButtonClick: PropTypes.func,
  validate: PropTypes.bool
};

export default withStyles(wizardStyle)(Wizard);
