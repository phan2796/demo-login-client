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
          <h1><span className="fa fa-sign-in" /> Sign In</h1>
          {this.props.SIerrorMessage &&
            <div className="alert alert-danger">{this.props.SIerrorMessage}</div>
          }
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <fieldset>
              <Field
                name="email"
                type="text"
                id="email"
                label="Your email"
                placeholder="example@example.com"
                component={CustomInput} />
            </fieldset>
            <fieldset>
              <Field
                name="password"
                type="password"
                id="password"
                label="Password"
                placeholder=""
                component={CustomInput} />
            </fieldset>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
          <div className="cert-line">
            <span className="cert-line-text">
              Or coutinue with
                          </span>
          </div>
          <FacebookLogin
            appId="374745003307529"
            textButton="Facebook"
            fields="name,email,picture"
            callback={this.responseFacebook}
            cssClass="btn btn-primary"
          />
          &nbsp; &nbsp; &nbsp;
            <GoogleLogin
            clientId="91674211488-58dfdofts394fq998i9091s9dgg142ut.apps.googleusercontent.com"
            buttonText="Google"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            className="btn btn-danger"
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