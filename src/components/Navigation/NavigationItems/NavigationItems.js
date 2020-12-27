import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = ( props ) => {
    const activeStyle = {
        color: "white",
        borderBottom: "4px solid #40a4c8",
        backgroundColor: "#8f5c2c",
        textDecoration: "none",
        width: "100%",
        boxSizing: "border-box",
        display: "block"
    }

    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem>
                    <NavLink 
                        to="/" 
                        activeStyle={activeStyle}
                        exact>Burger Builder</NavLink>
            </NavigationItem>
            <NavigationItem>
                <NavLink 
                    to="/orders" 
                    activeStyle={activeStyle}
                    >Orders</NavLink>
            </NavigationItem>
        </ul>
    )
};

export default navigationItems;