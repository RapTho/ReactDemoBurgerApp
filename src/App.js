import React, { Component } from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

// Lazy loading components when needed
const authComponent = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});

const checkoutComponent = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});

const orderComponent = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});

class App extends Component {
  componentDidMount () {
    this.props.onTryAutoAuth();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={authComponent} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={checkoutComponent} />
          <Route path="/orders" component={orderComponent} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={authComponent} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <BrowserRouter>
        <Layout>
            {routes}
        </Layout>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
      onTryAutoAuth: () => dispatch(actions.authCheckState())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
