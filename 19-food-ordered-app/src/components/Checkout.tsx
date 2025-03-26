import React, { useActionState, useCallback, useContext } from "react";
import { CartContext } from "../store/CartContext";
import { UserProgressContext } from "../store/UserProgressContext";

type FormState = {
  fullName?: string;
  email?: string;
  street?: string;
  postalCode?: string;
  city?: string;
};

const Checkout = () => {
  const { orderedMeals: orders, clearCart } = useContext(CartContext);
  const { showDialog, hideDialog } = useContext(UserProgressContext);

  const totalPrice = useCallback(() => {
    return orders
      .reduce((acc, order) => acc + +order.price * order.quantity, 0)
      .toFixed(2);
  }, [orders]);

  async function userDetailAction(
    prevState: { errors: string[]; currInput: FormState },
    formData: FormData
  ) {
    const data = Object.fromEntries(formData.entries());
    const errors: string[] = [];
    if (!data.fullName) errors.push("Full Name is required");
    if (!data.email) errors.push("Email is required");
    if (!data.street) errors.push("Street is required");
    if (!data.postalCode) errors.push("Postal Code is required");
    if (!data.city) errors.push("City is required");

    if (errors.length > 0) {
      return { errors, currInput: data };
    }

    try {
      const res = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order: {
            items: orders,
            customer: data,
          },
        }),
      });
      if (!res.ok) throw new Error("Error submitting order");
      showDialog("confirm");
      clearCart();
    } catch (e) {
      errors.push(e.message);
    }

    return { errors, currInput: {} };
  }

  const [formState, formAction, pending] = useActionState<{
    errors: string[];
    currInput: FormState;
    // @ts-ignore
  }>(userDetailAction, {
    errors: [],
    currInput: {},
  });

  return (
    <>
      <h2>Checkout</h2>
      <p>Total Amount: ${totalPrice()}</p>
      <form action={formAction}>
        <div className="control">
          <label htmlFor="">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            defaultValue={formState.currInput?.fullName}
          />
        </div>
        <div className="control">
          <label htmlFor="">E-Mail Address</label>
          <input
            type="email"
            id="email"
            name="email"
            defaultValue={formState.currInput?.email}
          />
        </div>
        <div className="control">
          <label htmlFor="">Street</label>
          <input
            type="text"
            id="street"
            name="street"
            defaultValue={formState.currInput?.street}
          />
        </div>
        <div className="control-row">
          <div className="control">
            <label htmlFor="">Postal Code</label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              defaultValue={formState.currInput?.postalCode}
            />
          </div>
          <div className="control">
            <label htmlFor="">City</label>
            <input
              type="text"
              id="city"
              name="city"
              defaultValue={formState.currInput?.city}
            />
          </div>
        </div>
        <div>
          {formState.errors.map((error) => (
            <p key={error} className="error-text">
              {error}
            </p>
          ))}
        </div>
        <div className="modal-actions">
          <button
            className="text-button"
            type="reset"
            onClick={() => hideDialog()}
          >
            Close
          </button>
          <button className="button">Submit Order</button>
        </div>
      </form>
    </>
  );
};

export default Checkout;
