import React, { useState } from "react";
import { connect } from "react-redux";

import classes from "./ContactData.css";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import Input from "../../components/UI/Input/Input";
import axios from "../../axios-burger";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";
import { updateObject, checkValidity } from "../../shared/utility";

const contactData = (props) => {
  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Name",
      },
      value: "",
      valid: false,
      touched: false,
      validation: {
        required: true,
      },
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Your E-Mail",
      },
      value: "",
      valid: false,
      touched: false,
      validation: {
        required: true,
      },
    },
    address: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Address",
      },
      value: "",
      valid: false,
      touched: false,
      validation: {
        required: true,
      },
    },
    zipcode: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your ZIP Code",
      },
      value: "",
      valid: false,
      touched: false,
      validation: {
        required: true,
        minLength: 4,
        maxLength: 6,
      },
    },
    city: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your City",
      },
      value: "",
      valid: false,
      touched: false,
      validation: {
        required: true,
      },
    },
    country: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Country",
      },
      value: "",
      valid: false,
      touched: false,
      validation: {
        required: true,
      },
    },
    deliveryOption: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Delivery Option",
      },
      value: "",
    },
  });
  const [formIsValid, setIsFormValid] = useState(false);

  const checkFormValidity = () => {
    let formIsValidUpdated = true;

    for (let key in orderForm) {
      formIsValidUpdated = orderForm[key].valid && formIsValidUpdated;
    }

    return formIsValidUpdated;
  };

  const orderHandler = (event) => {
    event.preventDefault();

    let formData = {};
    for (let key in orderForm) {
      formData[key] = orderForm[key].value;
    }

    const order = {
      ingredients: props.ingredients,
      price: +props.price.toFixed(2),
      contact: formData,
      userId: props.userId,
    };

    props.onBurgerHandler(order, props.token);
  };

  const changeHandler = (id, event) => {
    const updatedElement = updateObject(orderForm[id], {
      value: event.target.value,
      valid: checkValidity(event.target.value, orderForm[id].validation),
      touched: true,
    });
    const updatedOrderForm = updateObject(orderForm, {
      [id]: updatedElement,
    });
    let formIsValidUpdated = checkFormValidity();
    setOrderForm(updatedOrderForm);
    setIsFormValid(formIsValidUpdated);
  };

  let formElementArray = [];
  for (let key in orderForm) {
    formElementArray.push({
      id: key,
      config: orderForm[key],
    });
  }
  let form = (
    <form onSubmit={orderHandler}>
      {formElementArray.map((element) => {
        return (
          <Input
            key={element.id}
            change={(event) => changeHandler(element.id, event)}
            elementType={element.config.elementType}
            elementConfig={element.config.elementConfig}
            value={element.config.value}
            invalid={!element.config.valid}
            touched={element.config.touched}
            shouldValidate={element.config.validation}
          />
        );
      })}
      <Button btnType="Success" disabled={!formIsValid}>
        ORDER
      </Button>
    </form>
  );
  if (props.loading) {
    form = <Spinner />;
  }
  return (
    <div className={classes.ContactData}>
      <h4>Please enter your contact data</h4>
      {form}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onBurgerHandler: (orderData, token) =>
      dispatch(actions.purchaseBurger(orderData, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(contactData, axios));
