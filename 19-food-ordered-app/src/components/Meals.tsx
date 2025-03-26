import React, { useContext, useEffect } from "react";

import MealInterface from "../interfaces/meal";
import Meal from "./Meal";
import { CartContext } from "../store/CartContext";

const Meals = () => {
  const { meals, mealsError, mealsLoading } = useContext(CartContext);

  return (
    <div id="meals">
      {mealsLoading && <h1>Loading...</h1>}
      {mealsError.message && <h1>{mealsError.message}</h1>}
      {meals.map((meal: MealInterface) => {
        return (
          <Meal
            key={meal.id}
            price={meal.price}
            description={meal.description}
            image={meal.image}
            name={meal.name}
            id={meal.id}
          />
        );
      })}
    </div>
  );
};

export default Meals;
