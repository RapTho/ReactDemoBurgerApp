import React from 'react';

import classes from './Controls.css';
import Control from './Control/Control';

const ctrl = [
    { label: 'Salad', type: 'salad'},
    { label: 'Meat', type: 'meat'},
    { label: 'Bacon', type: 'bacon'},
    { label: 'Cheese', type: 'cheese'},
]

const controls = (props) => {
    return (
        <div className={classes.Controls}>
            <p>Current price: <b>{props.price.toFixed(2)}</b></p>
            {ctrl.map(ctrl => {
                return <Control 
                        key={ctrl.label} 
                        label={ctrl.label}
                        add={() => props.addIngredient(ctrl.type)}
                        remove={() => props.removeIngredient(ctrl.type)}
                        disabled={props.disabledInfo[ctrl.type]}
                        />
            })}
            <button 
                className={classes.OrderButton}
                onClick={props.purchasing} 
                disabled={!props.purchasable}>{props.isAuth ? 'Order now' : 'Sign in to order'}</button>
        </div>
    );
}

export default controls;