import React, { Component } from "react";

import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import axios from "../../axios-orders";

const INGREDIENT_PRICES = {
  salad: 0.5,
  tempehBacon: 1.0,
  nutCheese: 1.5,
  beyondMeat: 2.5
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4.0,
    purchasable: false,
    purchasing: false,
    loading: false
  };

  componentDidMount() {
    axios
      .get("/ingredients.json")
      .then(response => {
        this.setState({ ingredients: response.data });
      })
      .catch(error => console.log(error));
  }

  updatePurchasableState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    this.setState({ purchasable: sum > 0 });
  };

  addIngredientHandler = type => {
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = this.state.ingredients[type] + 1;
    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });
    this.updatePurchasableState(updatedIngredients);
  };

  removeIngredientHandler = type => {
    if (this.state.ingredients[type] <= 0) return;

    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = this.state.ingredients[type] - 1;
    const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });
    this.updatePurchasableState(updatedIngredients);
  };

  calculateDisabledInfo = () => {
    const disabledInfo = {
      ...this.state.ingredients
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return disabledInfo;
  };

  buildOrderSummary = () => {
    if (this.state.loading || !this.state.ingredients) return <Spinner />;
    return (
      <OrderSummary
        ingredients={this.state.ingredients}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        price={this.state.totalPrice}
      />
    );
  };

  buildBurger = () => {
    if (!this.state.ingredients) return <Spinner />;
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={this.calculateDisabledInfo()}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}
        />
      </Aux>
    );
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    queryParams.push("price=" + this.state.totalPrice);
    const queryString = queryParams.join("&");

    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString
    });
  };

  render() {
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {this.buildOrderSummary()}
        </Modal>
        {this.buildBurger()}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
