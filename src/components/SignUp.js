import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../actions';
import CustomInput from './CustomInput';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
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
    await this.props.signUp(formData);
    // if (!this.props.errorMessage) {
    //   console.log("this.props.errorMessage", this.props.errorMessage)
    //   this.props.history.push('/dashboard');
    // }
    console.log(this.props)
  }

  render() {
    const { handleSubmit } = this.props;
    // const tokenData = localStorage.getItem("JWT_TOKEN");
    // if (tokenData) {
    //   console.log("show go to home page");
    //   <Redirect to='/Dashboard' />
    // }
    return (
      <div className="container">
        <div className="col-sm-6 col-sm-offset-3">
          <h1><span className="fa fa-sign-in" /> Signup</h1>
          {this.props.SUerrorMessage &&
            <div className="alert alert-danger">{this.props.SUerrorMessage}</div>
          }
          {this.props.successMessage &&
            <div className="alert alert-success">{this.props.successMessage}</div>
          }
          {/* show any messages that come back with authentication */}
          {/* &lt;% if (message.length &gt; 0) {'{'} %&gt;
        <div className="alert alert-danger">&lt;%= message %&gt;</div>
          &lt;% {'}'} %&gt; */}
          {/* LOGIN FORM */}
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
            <button type="submit" className="btn btn-primary">Sign Up</button>
          </form>
          <hr />
          <p>Already have an account? <a href="/signin">signin</a></p>
          <p>Or go <a href="/">home</a>.</p>
        </div>
      </div>);
  }
}

function mapStateToProps(state) {
  return {
    SUerrorMessage: state.auth.SUerrorMessage,
    successMessage: state.auth.successMessage

  }
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'signup' })
)(SignUp)