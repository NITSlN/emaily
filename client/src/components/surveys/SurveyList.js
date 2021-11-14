import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSurveys } from '../../actions'

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys()
  }
  renderSurveys() {
    if (this.props.surveys) {
      return this.props.surveys.reverse().map((survey) => {
        return (
          <div className="card darken-1" style={{backgroundColor:'#f8bbd0',borderRadius:'10px'}} key={survey._id}>
            <div className="card-content">
              <span className="card-title">{survey.title}</span>
              <p>{survey.body}</p>
              <p className="right">
                Sent On: {new Date(survey.dateSent).toLocaleDateString()}
              </p>
            </div>
            <div className="card-action" >
              <a style={{color:'black'}}>Yes: {survey.yes}</a>
              <a style={{color:'black'}}>No: {survey.no}</a>
            </div>
          </div>
        )
      })
    }
    return null
  }

  render() {
    return <div>{this.renderSurveys()}</div>
  }
}

const mapStateToProps = ({ surveys }) => {
  console.log(surveys)
  return { surveys }
}
export default connect(mapStateToProps, { fetchSurveys })(SurveyList)
