import React, { useEffect } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions/index";

import classes from "./Orders.css";
import Order from "../../components/Order/Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-burger";

const orders = (props) => {
  const { onFetchOrders, token, userId } = props;
  useEffect(() => {
    onFetchOrders(token, userId);
  }, [onFetchOrders, token, userId]);

  let renderedOrders = <Spinner />;

  if (!props.loading) {
    renderedOrders = <p>No orders placed yet. Please make an order first!</p>;

    if (props.orders.length > 0) {
      renderedOrders = props.orders.map((ig) => {
        return (
          <Order key={ig.id} ingredients={ig.ingredients} price={ig.price} />
        );
      });
    }
  }
  return <div className={classes}>{renderedOrders}</div>;
};

const mapStateToPros = (state) => {
  return {
    loading: state.order.loading,
    orders: state.order.orders,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (token, userId) =>
      dispatch(actions.fetchOrders(token, userId)),
  };
};

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(withErrorHandler(orders, axios));
