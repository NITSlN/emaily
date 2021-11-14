import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { withRouter } from "react-router";
import formFields from './formFields'
import * as actions from '../../actions'


function SurveyReview({ onCancel, formValues ,submitSurvey,history}) {
  const reviewDetails = _.map(formFields,({name,label}) =>{
      return(
          <div>
              <label>{label}</label>
              <div>
                  {formValues[name]}
              </div>
          </div>
      )
  })
  
    return (
    <div>
      <h4>Please confirm the details</h4>
      {reviewDetails}
      <button onClick={onCancel} className="btn-flat darken-3 white-text  grey">
        Back
      </button>
      <button 
      onClick={()=>submitSurvey(formValues,history)}
      className="btn-flat white-text green right">
        Send
        <i className="material-icons black-text right">email</i>
      </button>
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log(state)
  return { formValues: state.form.surveyForm.values } // return object is passed as props
}
export default connect(mapStateToProps,actions)(withRouter(SurveyReview))
