import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../actions';
import CustomInput from './CustomInput';
import { Link } from 'react-router-dom'
import { passwordPolicy } from '../utils/common'
import { reset } from 'redux-form';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      ppFlag: false,
      errorMsg: '',
      scMsg: '',
    }
  }
  componentWillMount() {
    const tokenData = localStorage.getItem("JWT_TOKEN");
    if (tokenData) {
      console.log("show go to home page");
      this.props.history.push('/Dashboard');
    }
  }

  onSubmit = async (formData, dispatch) => {
    // const { reset } = this.props;
    console.log('onSubmit() got called');
    console.log('formData', formData);
    if (formData.password !== formData.cfPassword) {
      this.setState({
        errorMsg: "Password and confirm password does not match"
      })
    } else {
      await this.props.signUp(formData);
      this.setState({
        errorMsg: this.props.SUerrorMessage,
        scMsg: this.props.SUsuccessMessage
      })
      console.log("SUerrorMessage: ", this.props.SUerrorMessage)
      console.log("SUsuccessMessag: ", this.props.SUsuccessMessage)
      if (this.props.SUsuccessMessage) {
        // reset();
        dispatch(reset('signup'))
      }
    }
  }
  togglePolicy = () => {
    this.setState({
      ppFlag: !this.state.ppFlag,
    })
  }


  render() {
    const { ppFlag, errorMsg, scMsg } = this.state
    console.log(this.state)
    const { handleSubmit } = this.props;
    // const tokenData = localStorage.getItem("JWT_TOKEN");
    // if (tokenData) {
    //   console.log("show go to home page");
    //   <Redirect to='/Dashboard' />
    // }
    return (
      <div className="container">
        <div className="col-sm-6 col-sm-offset-3">
          <h1><span className="fa fa-sign-in" /> Sign Up</h1>
          {errorMsg &&
            <div className="alert alert-danger">{errorMsg}</div>
          }
          {scMsg &&
            <div className="alert alert-success">{scMsg}</div>
          }
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <fieldset>
              <Field
                name="email"
                type="email"
                id="email"
                label="Your email"
                placeholder="example@example.com"
                required={true}
                component={CustomInput} />
            </fieldset>
            <fieldset>
              <Field
                name="password"
                type="password"
                id="password"
                label="Enter Password"
                required={true}
                placeholder=""
                component={CustomInput} />
            </fieldset>
            <fieldset>
              <Field
                name="cfPassword"
                type="password"
                id="password"
                label="Confirm Password"
                required={true}
                placeholder=""
                component={CustomInput} />
            </fieldset>
            <div>
              <label className="hover-i" onClick={this.togglePolicy} style={{ fontSize: '14px' }}>Password policy
              </label>
              {ppFlag && <ul>
                <li>Be at least eight characters in length</li>
                <li>Contain uppercase characters (A through Z)</li>
                <li>Contain lowercase characters (a through z)</li>
                <li>Contain base 10 digits (0 through 9)</li>
              </ul>}

            </div>
            <button type="submit" className="btn btn-primary">Sign Up</button>
          </form>
          <hr />
          {/* <p>Already have an account? <a href="/signin">signin</a></p>
          <p>Or go <a href="/">home</a>.</p> */}
          <p>Already have an account? <Link to="/signin">Sign In</Link></p>
          <p>Or go <Link to="/">Home</Link>.</p>
        </div>
      </div>);
  }
}

function mapStateToProps(state) {
  return {
    SUerrorMessage: state.auth.SUerrorMessage,
    SUsuccessMessage: state.auth.SUsuccessMessage

  }
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'signup' })
)(SignUp)