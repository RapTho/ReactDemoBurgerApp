import React from 'react';

import classes from './Order.css';

const order = (props) => {
    const ingredientTags = [];
    
    for (let igName in props.ingredients) {
        ingredientTags.push(
            <span 
                style={{
                    margin: '0 8px',
                    padding: '5px',
                    border: '1px solid #ccc',
                    boxSizing: 'border-box',
                    display: 'inline-block',
                    textTransform: 'capitalize'
                }}
                key={igName}
                >{igName} ({props.ingredients[igName]})</span>
        )
    }
    
    

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientTags}</p>
            <p>Price: <strong>USD {props.price}</strong></p>
        </div>
    );
};

export default order;