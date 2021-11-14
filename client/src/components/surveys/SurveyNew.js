// SurveyNew shows SurveyForm and SurveyFormReview
import React, { Component } from 'react'
import SurveyForm from './SurveyForm'
import SurveyReview from './SurveyReview'
import {reduxForm} from 'redux-form'

class SurveyNew extends Component {
  state = { showReview: false }

  renderContent() {
    if (this.state.showReview === false) {
      return (
        <SurveyForm
          onSurveySubmit={() => this.setState({ showReview: true })}
        />
      )
    }
    return (
      <SurveyReview
        onCancel={() => this.setState({ showReview: false })}
      />
    )
  }
  render() {
    return <div>{this.renderContent()}</div>
  }
}

export default reduxForm({
  form:'surveyForm'  //  With this when we navigate away from the form as a whole then all the data of the form is disappeared
})(SurveyNew)
