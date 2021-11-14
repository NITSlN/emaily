import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Payments from './Payments'

class Header extends Component {
  
  renderLogin() {
    switch (this.props.auth) {
      case null:
        return
      case false:
        //returning an array cause returning div inside ul isn't good
        return (
          <li>
            <a href="/auth/google">Log in With Google</a>
          </li>)
        

      default:
        return [
          <li key="1">
            <Payments/>
          </li>,
          <li key="3" style={{padding:'0 10px'}}>
            Credits:{this.props.auth.credits}
          </li>,
          <li key="2">
            <a href="/api/logout">Log Out</a>
          </li>
        ]
    }
  }

  render() {
    return (
      <nav className="navbar purple" style={{marginBottom:'30px',borderRadius:"0 0 10px 10px"}} >
        <div class="nav-wrapper">
          <Link to={this.props.auth? '/surveys':'/'} style={{ padding: '0px 15px' }} className="left brand-logo">
            Emaily
          </Link>
          <ul className="right">
            {
              this.renderLogin()
            }
          </ul>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth }
}
export default connect(mapStateToProps)(Header)
