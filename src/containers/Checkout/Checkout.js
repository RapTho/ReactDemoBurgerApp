import objectAssign from 'object-assign';
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from '../ContactData/ContactData'

class Checkout extends Component {

    render() {
        return(
            <div>
                <CheckoutSummary ingredients={this.props.ingredients} />
                <Route 
                    path={this.props.match.path + "/contactData"} 
                    component={ContactData} />
            </div>
        );
    }
};

const MapStateToProps = state => {
    return {
        ingredients: state.ingredients
    }
};

export default connect(MapStateToProps)(Checkout);