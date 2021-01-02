import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Burger from '../../components/Burger/Burger';
import Controls from '../../components/Burger/Controls/Controls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-burger';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {
    state = {
        purchasing: false
    }

    componentDidMount () {
        this.props.initIngredients();
    }

    updatePurchasableHandler = () => {
        const sum = Object.keys(this.props.ingredients)
            .map(igKey => this.props.ingredients[igKey] )
            .reduce(((sum, el) =>  sum + el ),0);
        
        return sum > 0
    }

    updatePurchasingHandler = () => {
        this.setState({ purchasing: true })
    }

    cancelPurchasingHandler = () => {
        this.setState({ purchasing: false })
    }

    continuePurchasingHandler = () => {
        this.props.history.push('/checkout')
    }

    render() {
        const disabledInfo = { ...this.props.ingredients }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        };

        let burger = this.props.error ? <p>Failed to load ingredients</p> : <Spinner />
        let orderSummary = <Spinner />
        if (this.props.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients}/>
                    <Controls
                        price={this.props.totalPrice}
                        addIngredient={this.props.addIngredientHandler}
                        removeIngredient={this.props.removeIngredientHandler}
                        disabledInfo={disabledInfo}
                        purchasing={this.updatePurchasingHandler}
                        purchasable={this.updatePurchasableHandler()}
                    />
                </Aux>
            );
            orderSummary = (
            <OrderSummary
                ingredients={this.props.ingredients}
                cancelPurchasing={this.cancelPurchasingHandler}
                price={this.props.totalPrice}
                continuePurchasing={this.continuePurchasingHandler}/>
            );
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} cancelPurchasing={this.cancelPurchasingHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const MapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        error: state.error
    }
};

const MapDispatchToProps = dispatch => {
    return {
        addIngredientHandler: (ingredientType) => dispatch(actions.addIngredient(ingredientType)),
        removeIngredientHandler: (ingredientType) => dispatch(actions.removeIngredient(ingredientType)),
        initIngredients: () => dispatch(actions.initIngredients())
    }
};

export default connect(MapStateToProps, MapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))