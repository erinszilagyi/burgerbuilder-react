import React, { Component } from "react";
import axios from "../../axios-orders";

import Order from "../../components/Order/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  };

  componentDidMount = async () => {
    try {
      const response = await axios.get("/orders.json");

      console.log(response);

      const fetchedOrders = [];

      for (let key in response.data) {
        fetchedOrders.push({
          ...response.data[key],
          id: key
        });
      }

      this.setState({ loading: false, orders: fetchedOrders });
    } catch (error) {
      console.log(error);
    }
  };

  buildOrders = () => {
    if (this.state.loading) return <Spinner />;
    return this.state.orders.map(order => (
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

export default withErrorHandler(Orders, axios);
