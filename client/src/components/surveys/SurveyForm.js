// shows a form for a user to add input
import _ from 'lodash'
import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form' // similar to connect function. It takes care of all the action creater and reducers
import SurveyField from './SurveyField'
import { Link } from 'react-router-dom'
import validateEmails from '../utils/validateEmails'
import formFields from './formFields' 

class SurveyForm extends Component {
  renderFields() {
    return _.map(formFields, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={SurveyField}
          type="text"
          label={label}
          name={name}
        />
      )
    })
  }

  render() {
    return (
      <div>
        <form
          onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)} // onsubmit the funciton passed will automatically invoked
        >
          {this.renderFields()}

          <Link className="btn-flat white-text left red" to="/surveys">
            Cancel
            <i class="material-icons right">close</i>
          </Link>

          <button
            class="btn-flat teal white-text right"
            type="submit"
            name="action"
          >
            Next
            <i class="material-icons right">send</i>
          </button>
        </form>
      </div>
    )
  }
}

function validate(values) {
  const error = {}
  // we have used or statement to avoid error when values.emails is not defined when form is first rendered on the screen, so .split() would throw an error
  error.emails = validateEmails(values.recipients|| '') //  if it returns nothing than error.emails will be undefined and values with undefined are not considered
// above line is intenstionally put above here

  _.each(formFields, ({ name }) => {
    if (!values[name]) {
      error[name] = "This field can't be empty"
    }
  })
  //  if this error object is empty than redux-form assumes that it doesn't have any error
  return error
} 

export default reduxForm({
  form: 'surveyForm',
  validate,
  destroyOnUnmount:false
})(SurveyForm)
