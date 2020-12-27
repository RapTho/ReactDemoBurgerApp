import React from 'react';

import classes from './Sidedrawer.css';
import Logo from '../../Logo/Logo';
import NavicationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const sidedrawer = ( props ) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.show) {
        attachedClasses = [classes.SideDrawer, classes.Open]
    }; 

    return(
        <Aux>
            <Backdrop 
                show={props.show}
                click={props.click}
                />
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavicationItems />
                </nav>
            </div>
        </Aux>
    )
};

export default sidedrawer;