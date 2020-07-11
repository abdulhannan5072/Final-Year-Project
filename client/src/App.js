import React, { Component } from 'react';
import { HashRouter, Route, Switch, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {authCheckState} from './store/actions';
import Auth from './hoc/auth';

import 'antd/dist/antd.css';
import './scss/style.scss';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./auth/login/Login'));
const Register = React.lazy(() => import('./auth/register/Register'));
const Page403 = React.lazy(() => import('./shared/static/Error403'));

const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

const fileupload = React.lazy(() => import('./shared/utils/Fileupload'));

class App extends Component {
  componentDidMount (){
    this.props.tryAutoSignin();
  }
  render() {
    return (
      <HashRouter>
          <React.Suspense fallback={loading}>
            <Switch>
            <Route exact path="/upload" name="Login Page" component={ fileupload } />

              <Route exact path="/login" name="Login Page" component={ Auth(Login , false)} />
              <Route exact path="/register" name="Register Page" component={ Auth(Register, false)} />
              <Route exact path="/403" name="Page 403" render={props => <Page403 {...props}/>} />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
              <Route path="/" name="Home" render={props => <TheLayout {...props}/>} />
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
      isAuth: state.auth.token !== null
  }
};
const mapDispatchToProps = dispatch => {
  return {
      tryAutoSignin: () => dispatch(authCheckState())
  }
};
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
