import React from 'react';

import classes from './HamburgerSymbol.css'
import burgerSymbol from '../../../../assets/images/hamburger-icon.png'

const hamburgerSymbol = ( props ) => (
    <div 
    className={classes.HamburgerSymbol}
    onClick={props.click}>
        <img src={burgerSymbol} alt="Hamburgersymbol" />
    </div>
)

export default hamburgerSymbol;