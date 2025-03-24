import React, { useEffect } from "react";

import MealInterface from "../interfaces/meal";
import Meal from "./Meal";

const Meals = () => {
  const [meals, setMeals] = React.useState<MealInterface[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<{ message: string | null }>({
    message: null,
  });

  useEffect(() => {
    async function fetchMeals() {
      setIsLoading(true);
      try {
        const res = await fetch("http://localhost:3000/meals");
        const data = await res.json();

        if (!res.ok) {
          throw new Error("Error fetching meals");
        }

        setMeals(data);
      } catch (err) {
        setError({ message: "Error fetching meals" });
      }
      setIsLoading(false);
    }
    fetchMeals();
  }, []);

  return (
    <div id="meals">
      {isLoading && <h1>Loading...</h1>}
      {error.message && <h1>{error.message}</h1>}
      {meals.map((meal) => {
        console.log(meal, meal.id);
        return (
          <Meal
            key={meal.id}
            price={meal.price}
            description={meal.description}
            image={meal.image}
            name={meal.name}
            id=""
          />
        );
      })}
    </div>
  );
};

export default Meals;
