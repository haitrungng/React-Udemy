import React, { useCallback, useContext } from "react";
import { CartContext } from "../store/CartContext";
import { UserProgressContext } from "../store/UserProgressContext";

const Cart = () => {
  const {
    orderedMeals: orders,
    addOrderedMeal,
    removeOrderedMeal,
  } = useContext(CartContext);

  const { showDialog, hideDialog } = useContext(UserProgressContext);

  const totalPrice = useCallback(() => {
    return orders
      .reduce((acc, order) => acc + +order.price * order.quantity, 0)
      .toFixed(2);
  }, [orders]);
  return (
    <div className="cart">
      <h2>Cart</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <div>
              <span>{order.name}</span>
              <span> - {order.quantity}</span>
              <span> x {order.price}</span>
            </div>
            <div className="container-quantities">
              <button
                className="rounded-button"
                onClick={() => removeOrderedMeal(order.id)}
              >
                -
              </button>
              <span>{order.quantity}</span>
              <button
                className="rounded-button"
                onClick={() => addOrderedMeal(order.id)}
              >
                +
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="cart-total">${totalPrice()}</div>
      <div className="modal-actions">
        <button className="text-button" onClick={() => hideDialog()}>
          Close
        </button>
        {orders.length > 0 && (
          <button className="button" onClick={() => showDialog("checkout")}>
            Go to Checkout
          </button>
        )}
      </div>
    </div>
  );
};

export default Cart;
