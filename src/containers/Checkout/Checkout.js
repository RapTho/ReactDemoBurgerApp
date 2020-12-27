import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from '../ContactData/ContactData'

class Checkout extends Component {
    state={
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        price:  0
    }

    componentDidMount() {
        if (this.props.location.search !== "") {
            const queryParams = new URLSearchParams(this.props.location.search)
            let ingredients = {}
            let price = 0;
            for (let param of queryParams.entries()) {
                if (param[0] === "price") {
                    price = +param[1]
                } else {
                ingredients[param[0]] = +param[1]
                }
            }

            this.setState({ingredients, price})
        }
    }

    render() {
        return(
            <div>
                <CheckoutSummary ingredients={this.state.ingredients} />
                <Route 
                    path={this.props.match.path + "/contactData"} 
                    render={() => <ContactData {...this.props} ingredients={this.state.ingredients} price={this.state.price}/>} />
            </div>
        );
    }
};

export default Checkout;