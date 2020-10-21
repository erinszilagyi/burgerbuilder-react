import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions";
import { checkInputValidity } from "../../shared/utility";

import classes from "./Auth.css";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Email Address"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    formIsValid: false,
    isSignup: true
  };

  inputChangedHandler = (event, inputId) => {
    const updatedControls = {
      ...this.state.controls
    };
    const updatedFormElement = {
      ...updatedControls[inputId]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkInputValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedControls[inputId] = updatedFormElement;

    let formIsValid = true;
    for (let inputId in updatedControls) {
      formIsValid = updatedControls[inputId].valid && formIsValid;
    }

    this.setState({ controls: updatedControls, formIsValid: formIsValid });
  };

  submitHandler = event => {
    event.preventDefault();

    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  };

  buildFormElementsArray = () => {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }
    return formElementsArray;
  };

  buildForm = () => {
    if (this.props.loading) return <Spinner />;
    return (
      <form onSubmit={this.submitHandler}>
        {this.buildFormElementsArray().map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={event => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        <Button
          btnType='Success'
          clicked={this.submitHandler}
          disabled={!this.state.formIsValid}
        >
          {!this.state.isSignup ? "SIGN IN" : "SIGN UP"}
        </Button>
      </form>
    );
  };

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return { isSignup: !prevState.isSignup };
    });
  };

  render() {
    return (
      <div className={classes.Auth}>
        {this.props.isAuthenticated ? (
          this.props.buildingBurger ? (
            <Redirect to='/checkout' />
          ) : (
            <Redirect to='/' />
          )
        ) : null}
        {this.props.error ? (
          <p style={{ color: "red" }}>{this.props.error.message}</p>
        ) : null}
        {this.buildForm()}
        <Button btnType='Danger' clicked={this.switchAuthModeHandler}>
          SWITCH TO {this.state.isSignup ? "SIGN IN" : "SIGN UP"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
