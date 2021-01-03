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
        this.props.onFetchOrders()
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
        orders: state.order.orders
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    }
};

export default connect(mapStateToPros, mapDispatchToProps)(withErrorHandler(Orders, axios));