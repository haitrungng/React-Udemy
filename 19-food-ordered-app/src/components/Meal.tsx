import React from "react";

import MealProps from "../interfaces/meal";

const Meal = (props: MealProps) => {
  return (
    <div className="meal-item">
      <article>
        <img src={`http://localhost:3000/` + props.image} alt="meal" />

        <h3>{props.name}</h3>
        <p className="meal-item-price">{props.price}</p>
        <p className="meal-item-description">{props.description}</p>
        <button className="meal-item-actions">Add to Cart</button>
      </article>
    </div>
  );
};

export default Meal;
