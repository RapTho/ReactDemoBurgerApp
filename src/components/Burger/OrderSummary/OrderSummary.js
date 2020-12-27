import React from 'react';

import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
    const ingredientsSummary = Object.keys(props.ingredients).map(igKey => {
        return (
            <li key={igKey}>
                <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
            </li>
        )
    })

    return (
        <Aux>
            <h3>Your order summary</h3>
            <ul>
                {ingredientsSummary}
            </ul>
            <p><b>Total Price: {props.price.toFixed(2)}</b></p>
            <p>Continue with the checkout?</p>
            <Button btnType="Danger" clicked={props.cancelPurchasing}>CANCEL</Button>
            <Button btnType="Success" clicked={props.continuePurchasing}>CHECKOUT</Button>
        </Aux>
    )
};

export default OrderSummary;