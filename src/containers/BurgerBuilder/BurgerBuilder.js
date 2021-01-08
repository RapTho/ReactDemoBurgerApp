import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import Aux from "../../hoc/Auxiliary/Auxiliary";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Burger from "../../components/Burger/Burger";
import Controls from "../../components/Burger/Controls/Controls";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-burger";
import * as actions from "../../store/actions/index";

export const burgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);

  const dispatch = useDispatch();
  const addIngredientHandler = (ingredientType) =>
    dispatch(actions.addIngredient(ingredientType));
  const removeIngredientHandler = (ingredientType) =>
    dispatch(actions.removeIngredient(ingredientType));
  const initIngredients = useCallback(
    () => dispatch(actions.initIngredients()),
    []
  );
  const onPurchaseBurgerInit = () => dispatch(actions.purchaseBurgerInit());
  const onSetAuthRedirectPath = (path) =>
    dispatch(actions.setAuthRedirectPath(path));

  const ingredients = useSelector((state) => state.burgerBuilder.ingredients);
  const totalPrice = useSelector((state) => state.burgerBuilder.totalPrice);
  const error = useSelector((state) => state.burgerBuilder.error);
  const isAuth = useSelector((state) => state.auth.token !== null);

  useEffect(() => {
    initIngredients();
  }, [initIngredients]);

  const updatePurchasableHandler = () => {
    const sum = Object.keys(ingredients)
      .map((igKey) => ingredients[igKey])
      .reduce((sum, el) => sum + el, 0);

    return sum > 0;
  };

  const updatePurchasingHandler = () => {
    if (isAuth) {
      setPurchasing(true);
    } else {
      onSetAuthRedirectPath("/checkout");
      props.history.push("/auth");
    }
  };

  const cancelPurchasingHandler = () => {
    setPurchasing(false);
  };

  const continuePurchasingHandler = () => {
    onPurchaseBurgerInit();
    props.history.push("/checkout");
  };

  const disabledInfo = { ...ingredients };

  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let burger = error ? <p>Failed to load ingredients</p> : <Spinner />;
  let orderSummary = <Spinner />;
  if (ingredients) {
    burger = (
      <Aux>
        <Burger ingredients={ingredients} />
        <Controls
          price={totalPrice}
          addIngredient={addIngredientHandler}
          removeIngredient={removeIngredientHandler}
          disabledInfo={disabledInfo}
          purchasing={updatePurchasingHandler}
          purchasable={updatePurchasableHandler()}
          isAuth={isAuth}
        />
      </Aux>
    );
    orderSummary = (
      <OrderSummary
        ingredients={ingredients}
        cancelPurchasing={cancelPurchasingHandler}
        price={totalPrice}
        continuePurchasing={continuePurchasingHandler}
      />
    );
  }

  return (
    <Aux>
      <Modal show={purchasing} cancelPurchasing={cancelPurchasingHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );
};

export default withErrorHandler(burgerBuilder, axios);
