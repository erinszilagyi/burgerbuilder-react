import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = ( props ) => {
  const transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
      return [...Array(props.ingredients[igKey])].map((_, index) => {
        return <BurgerIngredient key={igKey+index} type={igKey} />
      });
  });

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="breadTop"/>
      {transformedIngredients}
      <BurgerIngredient type="breadBottom"/>
    </div>
  );
}

export default burger;