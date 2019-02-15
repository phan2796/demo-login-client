import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { Link } from 'react-router-dom'
import * as actions from '../actions';
import CustomInput from './CustomInput';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
    this.responseFacebook = this.responseFacebook.bind(this);
  }
  componentWillMount() {
    const tokenData = localStorage.getItem("JWT_TOKEN");
    if (tokenData) {
      console.log("show go to home page");
      this.props.history.push('/Dashboard');
    }
  }
  async onSubmit(formData) {
    console.log('onSubmit() got called');
    console.log('formData', formData);
    // We need to call some actioncreator
    await this.props.signIn(formData);
    console.log("this.props.SIerrorMessage: ", this.props.SIerrorMessage)
    if (!this.props.SIerrorMessage) {
      this.props.history.push('/dashboard');
    }
  }

  async responseGoogle(res) {
    console.log('responseGoogle', res);
    console.log('typeof res', typeof res);
    await this.props.oauthGoogle(res.accessToken);
    if (!this.props.errorMessage) {
      this.props.history.push('/dashboard');
    }
  }

  async responseFacebook(res) {
    console.log('responseFacebook', res);
    await this.props.oauthFacebook(res.accessToken);
    if (!this.props.errorMessage) {
      this.props.history.push('/dashboard');
    }
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="container">
        <div className="col-sm-6 col-sm-offset-3">
          <h1><span className="fa fa-sign-in" /> SignIn</h1>
          {this.props.SIerrorMessage &&
            <div className="alert alert-danger">{this.props.SIerrorMessage}</div>
          }
          {/* <div className="col">
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <fieldset>
              <Field
                name="email"
                type="text"
                id="email"
                label="Enter your email"
                placeholder="example@example.com"
                component={CustomInput} />
            </fieldset>
            <fieldset>
              <Field
                name="password"
                type="password"
                id="password"
                label="Enter your password"
                placeholder="yoursuperpassword"
                component={CustomInput} />
            </fieldset>

            {this.props.errorMessage ?
              <div className="alert alert-danger">
                {this.props.errorMessage}
              </div> : null}

            <button type="submit" className="btn btn-primary">Sign Up</button>
          </form>
        </div>
        <div className="col">
          <div className="text-center">
            <div className="alert alert-primary">
              Or sign up using third-party services
            </div>
            <FacebookLogin
              appId="374745003307529"
              textButton="Facebook"
              fields="name,email,picture"
              callback={this.responseFacebook}
              cssClass="btn btn-outline-primary"
            />
            <GoogleLogin
              clientId="91674211488-58dfdofts394fq998i9091s9dgg142ut.apps.googleusercontent.com"
              buttonText="Google"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              className="btn btn-outline-danger"
            />
          </div>
        </div> */}

          {/* <a href="/login" className="btn btn-default"><span className="fa fa-user" /> Local Login</a>
            <a href="/signup" className="btn btn-default"><span className="fa fa-user" /> Local Signup</a> */}
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <fieldset>
              <Field
                name="email"
                type="text"
                id="email"
                label="Enter your email"
                placeholder="example@example.com"
                component={CustomInput} />
            </fieldset>
            <fieldset>
              <Field
                name="password"
                type="password"
                id="password"
                label="Enter your password"
                placeholder="yoursuperpassword"
                component={CustomInput} />
            </fieldset>
            <button type="submit" className="btn btn-primary">Sign In</button>
          </form>
          <br />
          <FacebookLogin
            appId="374745003307529"
            textButton="Facebook"
            fields="name,email,picture"
            callback={this.responseFacebook}
            cssClass="btn btn-outline-primary"
          />
          &nbsp; &nbsp; &nbsp;
            <GoogleLogin
            clientId="91674211488-58dfdofts394fq998i9091s9dgg142ut.apps.googleusercontent.com"
            buttonText="Google"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            className="btn btn-outline-danger"
          />
          <br />
          <p>Need an account? <Link to="/signup">Sign Up</Link></p>
          <p>Or go <Link to="/">Home</Link>.</p>

        </div>
      </div>

    );
  }
}

function mapStateToProps(state) {
  return {
    SIerrorMessage: state.auth.SIerrorMessage
  }
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'SignIn' })
)(SignIn)