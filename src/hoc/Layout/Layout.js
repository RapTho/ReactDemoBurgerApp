import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Layout.css'
import Aux from '../Auxiliary/Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    hideSideDrawerHandler = () => {
        this.setState({
            showSideDrawer: false
        })
    }
    
    showSideDrawerHandler = () => {
        this.setState({
            showSideDrawer: true
        })
    }

    render() {
        return(
            <Aux>
                <Toolbar 
                    showSideDrawer={this.showSideDrawerHandler} 
                    isAuth={this.props.isAuthenticated}/>
                <SideDrawer 
                    show={this.state.showSideDrawer}
                    click={this.hideSideDrawerHandler}
                    isAuth={this.props.isAuthenticated}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
    
}

const mapStateToPros = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToPros)(Layout);