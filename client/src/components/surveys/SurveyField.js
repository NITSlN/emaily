import React from 'react'

const SurveyField = ({ input, label, meta: { error, touched } }) => {
  // nested destructuring
  
  return (
    <div>
      <label>{label}</label>
      <input {...input} />
      <div className="red-text">
        {touched && error}{' '}
        {/* if touched is true and error is defined that it will return the string inside the error otherwise nothing will be returned */}
      </div>
    </div>
  )
}
export default SurveyField
