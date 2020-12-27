import React from 'react';

import classes from './Logo.css'
import burgerImage from '../../assets/images/burger-logo.png'

const logo = ( props ) => (
    <div className={classes.Logo}>
        <img src={burgerImage} alt="Burger Logo" />
    </div>
)

export default logo;