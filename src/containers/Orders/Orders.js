import React, { Component } from "react";
import axios from "../../axios-orders";
import { connect } from "react-redux";

import Order from "../../components/Order/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions";

class Orders extends Component {
  componentDidMount = () => {
    this.props.onFetchOrders(this.props.token, this.props.userId);
  };

  buildOrders = () => {
    if (this.props.loading) return <Spinner />;
    if (this.props.orders.length === 0)
      return (
        <h3 style={{ textAlign: "center" }}>
          You have not ordered any burgers yet!
        </h3>
      );

    return this.props.orders.map(order => (
      <Order
        key={order.id}
        ingredients={order.ingredients}
        price={order.price}
      />
    ));
  };

  render() {
    return <div>{this.buildOrders()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) =>
      dispatch(actions.fetchOrders(token, userId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
