import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from '../ContactData/ContactData'

class Checkout extends Component {

    render() {
        // If no ingredients were loaded, redirect to /
        let summary = <Redirect to="/" />

        if (this.props.ingredients) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null
            summary = (
                <div>
                {purchasedRedirect}    
                <CheckoutSummary ingredients={this.props.ingredients} />
                <Route 
                    path={this.props.match.path + "/contactData"} 
                    component={ContactData} />
                </div>
            )
        }
        return summary;
    }
};

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
};

export default connect(mapStateToProps)(Checkout);