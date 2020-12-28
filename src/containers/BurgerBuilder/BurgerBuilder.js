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
import * as actionType from '../../store/actions';

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount () {
        axios.get('https://react-burger-builder-4a2cc-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json')
            .then(response => this.setState({ingredients: response.data}))
            .catch((error) => {this.setState({error})});
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

        let burger = this.state.error ? <p>Failed to load ingredients</p> : <Spinner />
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
        totalPrice: state.totalPrice
    }
};

const MapDispatchToProps = dispatch => {
    return {
        addIngredientHandler: (ingredientType) => dispatch({type: actionType.ADD_INGREDIENT, ingredientType}),
        removeIngredientHandler: (ingredientType) => dispatch({type: actionType.REMOVE_INGREDIENT, ingredientType})
    }
};

export default connect(MapStateToProps, MapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))