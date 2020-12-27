import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';


import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import classes from './CheckoutSummary.css'

class CheckoutSummary extends Component {

    cancelCheckoutHandler = () => {
        this.props.history.goBack()
    }

    continueCheckoutHandler = () => {
        this.props.history.push(this.props.match.path + "/contactData")
    }

    render () {
        return(
            <div className={classes.CheckoutSummary}>
                <h1>We hope the burger tastes well!</h1>
                <div style={{ width: '100%', margin: "auto" }}>
                    <Burger ingredients={this.props.ingredients} />
                </div>
                <Button 
                    btnType="Danger"
                    clicked={this.cancelCheckoutHandler}>CANCEL</Button>
                <Button 
                    btnType="Success"
                    clicked={this.continueCheckoutHandler}>Continue</Button>
            </div>
        )
    }
};

export default withRouter(CheckoutSummary);