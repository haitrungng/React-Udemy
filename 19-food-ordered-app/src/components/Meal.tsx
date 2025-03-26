import React, { useContext } from "react";

import MealProps from "../interfaces/meal";
import { CartContext } from "../store/CartContext";

const Meal = (props: MealProps) => {
  const { addOrderedMeal } = useContext(CartContext);
  return (
    <div className="meal-item">
      <article>
        <img src={`http://localhost:3000/` + props.image} alt="meal" />

        <h3>{props.name}</h3>
        <p className="meal-item-price">${props.price}</p>
        <p className="meal-item-description">{props.description}</p>
        <button
          className="meal-item-actions"
          onClick={() => addOrderedMeal(props.id)}
        >
          Add to Cart
        </button>
      </article>
    </div>
  );
};

export default Meal;
