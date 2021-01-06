import * as actionTypes from './actionTypes';
import axios from '../../axios-burger';

const purchaseBurgerSucceeded = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCEEDED,
        orderId: id,
        orderData
    }
};

const purchaseBurgerFailed = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILED,
        error
    }
};

const purchaseBurgerStarted = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_STARTED
    }
};

export const purchaseBurgerInit = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_INIT
    }
};

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStarted());
        axios.post('/orders.json?auth=' + token, orderData)
            .then(response => {
                dispatch(purchaseBurgerSucceeded(response.data.name, orderData));
            })
            .catch(err => {
                dispatch(purchaseBurgerFailed(err))
            });
    }
};

const fetchOrdersSucceeded = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCEEDED,
        orders
    }
};

const fetchOrdersFailed = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED,
        error
    }
};

const fetchOrdersStarted = () => {
    return {
        type: actionTypes.FETCH_ORDERS_STARTED,
    }
};

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStarted());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('https://react-burger-builder-4a2cc-default-rtdb.europe-west1.firebasedatabase.app/orders.json' + queryParams)
            .then( res => {
                let fetchedOrders = []
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    })
                }
                dispatch(fetchOrdersSucceeded(fetchedOrders))
            })
            .catch( err => dispatch(fetchOrdersFailed(err)))
    }
};