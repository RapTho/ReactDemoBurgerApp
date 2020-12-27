import React, { Component } from 'react';

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
        axios.get('https://react-burger-builder-4a2cc-default-rtdb.europe-west1.firebasedatabase.app/orders.json')
            .then( res => {
                let fetchedOrders = []
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    })
                }
                this.setState({loading: false, orders: fetchedOrders})
            })
            .catch( err => {
                this.setState({loading: false})
            })
    }

    render () {
        let orders = <Spinner />;

        if (!this.state.loading) {
            orders = this.state.orders.map( ig => {
                return <Order key={ig.id} ingredients={ig.ingredients} price={ig.price} />
            })
        }
        return(
            <div className={classes}>
                {orders}
            </div>
        )
    }
};

export default withErrorHandler(Orders, axios);