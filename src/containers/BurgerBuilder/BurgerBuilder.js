import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Burger from '../../components/Burger/Burger';
import Controls from '../../components/Burger/Controls/Controls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-burger';

const INGREDIENT_PRICES = {
    salad: 0.5,
    meat: 1.6,
    cheese: 0.7,
    bacon: 0.9
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount () {
        axios.get('https://react-burger-builder-4a2cc-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json')
            .then(response => this.setState({ingredients: response.data}))
            .catch((error) => {this.setState({error})});
    }

    addIngredientHandler = (type) => {
        const newIngredients = {...this.state.ingredients};
        newIngredients[type] = this.state.ingredients[type] + 1;

        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

        this.setState({
            ingredients: newIngredients,
            totalPrice: newPrice
        });
        this.updatePurchasableHandler(newIngredients);
    }

    removeIngredientHandler = (type) => {
        const newIngredients = {...this.state.ingredients};

        let newPrice = this.state.totalPrice;
        if (this.state.ingredients[type] !== 0) {
            newIngredients[type] = this.state.ingredients[type] - 1;
            newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        }

        this.setState({
            ingredients: newIngredients,
            totalPrice: newPrice
        });
        this.updatePurchasableHandler(newIngredients);
    }

    updatePurchasableHandler = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => ingredients[igKey] )
            .reduce(((sum, el) =>  sum + el ),0);

        this.setState({
            purchasable: sum > 0
        });
    }

    updatePurchasingHandler = () => {
        this.setState({ purchasing: true })
    }

    cancelPurchasingHandler = () => {
        this.setState({ purchasing: false })
    }

    continuePurchasingHandler = () => {
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(new URLSearchParams(
                encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i])
            ))
        }
        this.props.history.push("/checkout?" + queryParams.join('&') + "&price=" + this.state.totalPrice)
    }

    render() {
        const disabledInfo = { ...this.state.ingredients }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        };

        let burger = this.state.error ? <p>Failed to load ingredients</p> : <Spinner />
        let orderSummary = <Spinner />
        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <Controls
                        price={this.state.totalPrice}
                        addIngredient={this.addIngredientHandler}
                        removeIngredient={this.removeIngredientHandler}
                        disabledInfo={disabledInfo}
                        purchasing={this.updatePurchasingHandler}
                        purchasable={this.state.purchasable}
                    />
                </Aux>
            );
            orderSummary = (
            <OrderSummary
                ingredients={this.state.ingredients}
                cancelPurchasing={this.cancelPurchasingHandler}
                price={this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder, axios)