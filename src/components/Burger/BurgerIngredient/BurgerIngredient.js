import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './BurgerIngredient.css';

class BurgerIngredient extends Component {
  render() {
    let ingredient = null;

    switch (this.props.type){
      case('bread-bottom'):
        ingredient = <div className={classes.BreadBottom}></div>;
        break;
      case('bread-top'):
        ingredient = (
          <div className={classes.BreadTop}>
            <div className={classes.Seeds1}></div>
            <div className={classes.Seeds2}></div>
          </div>
        );
        break;
      case('beyond-meat'):
        ingredient = <div className={classes.BeyondMeat}></div>;
        break;
      case('nut-cheese'):
        ingredient = <div className={classes.NutCheese}></div>;
        break;
      case('salad'):
        ingredient = <div className={classes.Salad}></div>;
        break;
      case('tempeh-bacon'):
        ingredient = <div className={classes.TempehBacon}></div>;
        break;
      default:
        ingredient = null;
    }

    return ingredient;
  }

};

BurgerIngredient.propTypes = {
  type: PropTypes.string.isRequired
};

export default BurgerIngredient;