import React, { Component } from "react";
import axios from "../../../axios-orders";

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";

import classes from "./ContactData.css";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    },
    loading: false
  };

  orderHandler = event => {
    event.preventDefault(); // stop form from submitting

    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: this.state.name,
        address: {
          street: "123 Fake St.",
          zipCode: "123456",
          country: "USA"
        },
        email: "homer@simpsons.com"
      },
      deliveryMethod: "fastest"
    };
    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push("/");
        console.log(response);
      })
      .catch(error => {
        this.setState({ loading: false });
        console.log(error);
      });
  };

  buildForm = () => {
    if (this.state.loading) return <Spinner />;
    return (
      <form>
        <input
          type='text'
          className={classes.Input}
          name='name'
          placeholder='Your Name'
        />
        <input
          type='text'
          className={classes.Input}
          name='email'
          placeholder='Your Email'
        />
        <input
          type='text'
          className={classes.Input}
          name='street'
          placeholder='Street'
        />
        <input
          type='text'
          className={classes.Input}
          name='postal'
          placeholder='Postal Code'
        />
        <Button
          btnType='Success'
          className={classes.Input}
          clicked={this.orderHandler}
        >
          ORDER
        </Button>
      </form>
    );
  };

  render() {
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {this.buildForm()}
      </div>
    );
  }
}

export default ContactData;
