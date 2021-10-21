import React, { Component } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { connect } from 'react-redux'
import {handleToken} from '../actions'
class Payments extends Component {
    render() {
        return (
            <div>
                <StripeCheckout
                    name="Emaily"
                    
                    description="5$ for 5 credits"
                    amount={500}  //default in us cents
                    token={token => this.props.handleToken(token)} //token takes a call back function, this callback function is called after we retrieved authorization from stripe api
                    stripeKey={process.env.REACT_APP_STRIPE_KEY}
                >
                    <button className="btn" style={{color:'white',backgroundColor:'black'}}>
                        Add Credits
                    </button>
                </StripeCheckout>
            </div>
        )
    }
}
export default connect(null,{handleToken})(Payments)