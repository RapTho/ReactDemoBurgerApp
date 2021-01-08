import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import classes from "./Auth.css";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";
import { updateObject, checkValidity } from "../../shared/utility";

const auth = (props) => {
  const [authForm, setAuthForm] = useState({
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Your Mail",
      },
      value: "",
      valid: false,
      touched: false,
      validation: {
        required: true,
      },
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Your Password",
      },
      value: "",
      valid: false,
      touched: false,
      validation: {
        required: true,
        minLength: 6,
      },
    },
  });
  const [formIsValid, setFormIsValid] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);

  const { builtBurger, onSetAuthRedirectPath } = props;
  useEffect(() => {
    if (!builtBurger) {
      onSetAuthRedirectPath();
    }
  }, [builtBurger, onSetAuthRedirectPath]);

  const checkFormValidity = () => {
    let formIsValidUpdated = true;

    for (let key in authForm) {
      formIsValidUpdated = authForm[key].valid && formIsValidUpdated;
    }

    return formIsValidUpdated;
  };

  const changeHandler = (id, event) => {
    const updatedElement = updateObject(authForm[id], {
      value: event.target.value,
      valid: checkValidity(event.target.value, authForm[id].validation),
      touched: true,
    });
    const updatedControls = updateObject(authForm, {
      [id]: updatedElement,
    });
    let formIsValidUpdated = checkFormValidity();

    setAuthForm(updatedControls);
    setFormIsValid(formIsValidUpdated);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    props.onAuth(authForm.email.value, authForm.password.value, isSignedUp);
  };

  const switchAuthModeHandler = () => {
    setIsSignedUp(!isSignedUp);
  };

  let formElementArray = [];
  for (let key in authForm) {
    formElementArray.push({
      id: key,
      config: authForm[key],
    });
  }

  let form = (
    <form onSubmit={onSubmitHandler}>
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
        Sign {isSignedUp ? "in" : "up"}
      </Button>
    </form>
  );

  let spinner = null;
  if (props.loading) spinner = <Spinner />;

  let errorMsg = null;
  if (props.error) errorMsg = <p>{props.error.message}</p>;

  let authRedirect = null;
  if (props.isAuth) {
    authRedirect = <Redirect to={props.authRedirectPath} />;
  }

  return (
    <div className={classes.Auth}>
      {authRedirect}
      {spinner}
      {errorMsg}
      {form}
      <Button btnType="Danger" clicked={switchAuthModeHandler}>
        Switch to {isSignedUp ? "Sign up" : "Sign in"}
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath,
    builtBurger: state.burgerBuilder.builtBurger,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignedUp) =>
      dispatch(actions.auth(email, password, isSignedUp)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(auth);
