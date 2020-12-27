import React from 'react';

import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import HamburgerSymbol from '../Toolbar/HamburgerSymbol/HamburgerSymbol';
import NavicationItems from '../NavigationItems/NavigationItems';

const toolbar = ( props ) => {
    return(
        <header className={classes.Toolbar}>
            <HamburgerSymbol click={props.showSideDrawer} />
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav className={classes.DesktopOnly}>
                <NavicationItems />
            </nav>
        </header>
    )
};

export default toolbar;