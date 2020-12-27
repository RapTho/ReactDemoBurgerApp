import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';


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
                <BrowserRouter>
                    <Toolbar showSideDrawer={this.showSideDrawerHandler}/>
                    <SideDrawer 
                        show={this.state.showSideDrawer}
                        click={this.hideSideDrawerHandler}
                        />
                    <main className={classes.Content}>
                        {this.props.children}
                    </main>
                </BrowserRouter>
            </Aux>
        )
    }
    
}

export default Layout;