import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import Header from './Header';
import { Route, Switch, Redirect } from 'react-router-dom';
import get from 'lodash/get'
import jwt from 'jsonwebtoken'
import Home from './Home';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Dashboard from './Dashboard';

export const PrivateRoute = ({ component: Comp, token, path, tokenData, ...rest }) => (
  <Route
    {...rest}
    tokenData={tokenData}
    path={path}
    render={(props) => {
      const sub = get(token, 'sub', null)
      // console.log("sub", sub);
      if (sub !== null) {
        // any role can access
          return <Comp {...props} userID={sub} />
        
      }
      return <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    }}
  />

)
class App extends Component {
  updateToken = () => {
    this.setState({
      reload: 'reload'
    })
  }

  render() {
    // const cookies = new Cookies()
    const tokenData = localStorage.getItem("JWT_TOKEN");
    // console.log(tokenData)

    let token = null
    try {
      token = jwt.verify(tokenData, "test")
    } catch (ex) {
      token = null
    }
    // console.log(token)
    this.state = {
      token
    }
    return (
      // <div>
      //   <Header />
      //   <div className="container">
      //     {this.props.children}
      //   </div>
      // </div>
      <div className="wrapper-body">
        <div className="wrapper">
          <Header updateToken={this.updateToken} tokenData={tokenData} pathname={this.props.location.pathname} />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/signout" component={Home} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/signin" component={SignIn} />
              {/* <Route exact path="/dashboard" component={Dashboard} /> */}
              <PrivateRoute path="/dashboard" component={Dashboard} token={token} />
            </Switch>
          </div>
        </div>
      </div >
    )
  }
}
export default withRouter(App)