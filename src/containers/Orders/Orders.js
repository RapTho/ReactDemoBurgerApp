import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

import classes from './Orders.css'
import Order from '../../components/Order/Order/Order'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-burger'

class Orders extends Component {
    state = {
        loading: true,
        orders: []
    }

    componentDidMount() {
        this.props.onFetchOrders(this.props.token, this.props.userId)
    }

    render () {
        let orders = <Spinner />;

        if (!this.props.loading) {
            orders = <p>No orders placed yet. Please make an order first!</p>

            if (this.props.orders.length > 0) {
               orders = this.props.orders.map( ig => {
                return <Order key={ig.id} ingredients={ig.ingredients} price={ig.price} />
            }) 
            }
            
        }
        return(
            <div className={classes}>
                {orders}
            </div>
        )
    }
};

const mapStateToPros = state => {
    return {
        loading: state.order.loading,
        orders: state.order.orders,
        token: state.auth.token,
        userId: state.auth.userId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    }
};

export default connect(mapStateToPros, mapDispatchToProps)(withErrorHandler(Orders, axios));