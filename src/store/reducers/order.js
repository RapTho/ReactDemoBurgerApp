import * as actionType from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

const purchaseBurgerInit = (state) => {
    return updateObject(state, {purchased: false});
};

const purchaseBurgerStarted = (state) => {
    return updateObject(state, {loading: true});
};

const purchaseBurgerSucceeded = (state, action) => {
    const newOrder = updateObject(action.orderData, { orderId: action.orderId })
    return updateObject(state, {
        orders: state.orders.concat(newOrder),
        loading: false,
        purchased: true
    });
};

const purchaseBurgerFailed = (state) => {
    return updateObject(state, {loading: true});
};

const fetchOrdersStarted = (state) => {
    return updateObject(state, {loading: true});
};

const fetchOrdersSucceeded = (state, action) => {
    return updateObject(state, {
        loading: false,
        orders: action.orders
    });
};

const fetchOrdersFailed = (state) => {
    return updateObject(state, {loading: false});
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.PURCHASE_BURGER_INIT: return purchaseBurgerInit(state);
        case actionType.PURCHASE_BURGER_STARTED: return purchaseBurgerStarted(state);
        case actionType.PURCHASE_BURGER_SUCCEEDED: return purchaseBurgerSucceeded(state, action);
        case actionType.PURCHASE_BURGER_FAILED: return purchaseBurgerFailed(state);
        case actionType.FETCH_ORDERS_STARTED: return fetchOrdersStarted(state);
        case actionType.FETCH_ORDERS_SUCCEEDED: return fetchOrdersSucceeded(state, action);
        case actionType.FETCH_ORDERS_FAILED: return fetchOrdersFailed(state);
        default: return state;
    }
};

export default orderReducer;