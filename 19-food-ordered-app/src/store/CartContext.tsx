import React, { useReducer } from "react";

import MealType, { OrderType } from "../interfaces/meal";

import fetchData from "../hooks/useFetch";

type CtxInterface = {
  meals: MealType[];
  mealsError: { message: string };
  mealsLoading: boolean;
  addOrderedMeal: (mealId: string) => void;
  removeOrderedMeal: (mealId: string) => void;
  clearCart: () => void;
  orderedMeals: OrderType[];
};

export const CartContext = React.createContext<CtxInterface>({
  meals: [],
  mealsError: { message: "" },
  mealsLoading: false,
  addOrderedMeal: (mealId: string) => {},
  removeOrderedMeal: (mealId: string) => {},
  clearCart: () => {},
  orderedMeals: [],
});

function cartReducer(
  state: { orderedMeals: OrderType[] },
  action: { type: string; payload: OrderType | null }
) {
  switch (action.type) {
    case "ADD":
      if (!action.payload) return state;

      if (state.orderedMeals.find((item) => item.id === action.payload?.id)) {
        return {
          orderedMeals: state.orderedMeals.map((item) =>
            item.id === action.payload?.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        console.log("ADD", action.payload);
        console.log([...state.orderedMeals, action.payload]);
        return { orderedMeals: [...state.orderedMeals, action.payload] };
      }
    case "REMOVE":
      if (action.payload?.quantity === 1)
        return {
          orderedMeals: state.orderedMeals.filter(
            (item) => item.id !== action.payload?.id
          ),
        };
      else {
        return {
          orderedMeals: state.orderedMeals.map((item) =>
            item.id === action.payload?.id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        };
      }
    case "CLEAR":
      return { orderedMeals: [] };
    default:
      return state;
  }
}

export const CartProvider = ({ children }) => {
  const [cart, dispatchCartAction] = useReducer(cartReducer, {
    orderedMeals: [],
  });

  const {
    data: meals,
    error: mealsError,
    isLoading: mealsLoading,
  } = fetchData([], "http://localhost:3000/meals", "Error fetching meals");

  function addOrderedMeal(mealId: string) {
    console.log("ADD ORDERED MEAL", mealId);
    const meal: MealType = meals.find((m: MealType) => m.id === mealId);
    dispatchCartAction({ type: "ADD", payload: { ...meal, quantity: 1 } });
  }

  function removeOrderedMeal(mealId: string) {
    let orderedMeal: OrderType | undefined = cart.orderedMeals.find(
      (m: MealType) => m.id === mealId
    );
    if (!orderedMeal) return;
    dispatchCartAction({ type: "REMOVE", payload: orderedMeal });
  }

  function clearCart() {
    dispatchCartAction({ type: "CLEAR", payload: null });
  }

  const cartContext = {
    meals,
    mealsError,
    mealsLoading,
    addOrderedMeal,
    removeOrderedMeal,
    clearCart,
    orderedMeals: cart.orderedMeals,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};
