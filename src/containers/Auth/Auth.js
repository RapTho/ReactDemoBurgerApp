import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import classes from './Auth.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Mail'
                },
                value: '',
                valid: false,
                touched: false,
                validation: {
                    required: true
                }
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password'
                },
                value: '',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        },
        formIsValid: false,
        isSignedUp: false
    }

    componentDidMount () {
        if (!this.props.builtBurger) {
            this.props.onSetAuthRedirectPath()
        }
    }

    checkFormValidity = () => {
        let formIsValid = true;

        for (let key in this.state.controls) {
            formIsValid = this.state.controls[key].valid && formIsValid
        }

        return formIsValid;
    }

    changeHandler = (id, event) => {
        const updatedElement = updateObject(this.state.controls[id], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.controls[id].validation),
            touched: true
        });
        const updatedControls = updateObject(this.state.controls, {
            [id]: updatedElement
        });
        let formIsValid = this.checkFormValidity();

        this.setState({ controls: updatedControls, formIsValid })
    }

    onSubmitHandler = event => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignedUp)
    };

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignedUp: !prevState.isSignedUp};
        })
    }

    render () {
        let formElementArray = [];
        for (let key in this.state.controls) {
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form = (
            <form onSubmit={this.onSubmitHandler}>
                {formElementArray.map(element => {
                    return <Input
                        key={element.id}
                        change={(event) => this.changeHandler(element.id, event)}
                        elementType={element.config.elementType}
                        elementConfig={element.config.elementConfig}
                        value={element.config.value}
                        invalid={!element.config.valid}
                        touched={element.config.touched}
                        shouldValidate={element.config.validation}
                        />
                })}
                <Button btnType="Success" disabled={!this.state.formIsValid}>Sign {this.state.isSignedUp ? "in" : "up"}</Button>
            </form>
        );

        let spinner = null;
        if (this.props.loading) spinner = <Spinner />

        let errorMsg = null;
        if (this.props.error) errorMsg = <p>{this.props.error.message}</p>
        
        let authRedirect = null
        if (this.props.isAuth) {
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {spinner}
                {errorMsg}
                {form}
                <Button btnType="Danger" clicked={this.switchAuthModeHandler}>Switch to {this.state.isSignedUp ? "Sign up" : "Sign in"}</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath,
        builtBurger: state.burgerBuilder.builtBurger
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignedUp) => dispatch(actions.auth(email, password, isSignedUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/"))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);