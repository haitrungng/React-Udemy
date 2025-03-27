import { cartActions } from "./cart";
import { userProgressActions } from "./userProgress";

export const sendCartData = (cartData) => {
  return async (dispatch) => {
    dispatch(
      userProgressActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );

    const sendRequest = async () => {
      const res = await fetch(
        "https://dummy-backend-e31e4-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cartData.items,
          }),
        }
      );
      if (!res.ok) {
        throw new Error("Sending cart data failed!");
      }
    };

    try {
      await sendRequest();
      dispatch(
        userProgressActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sending cart data successful!",
        })
      );
    } catch (error) {
      dispatch(
        userProgressActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const res = await fetch(
        "https://dummy-backend-e31e4-default-rtdb.firebaseio.com/cart.json",
        {
          method: "GET",
        }
      );
      if (!res.ok) {
        throw new Error("Fetching cart data failed!");
      }
      const data = await res.json();
      return data;
    };
    try {
      const cartData = await fetchData();
      console.log("cartData", cartData);
      dispatch(cartActions.replaceCart(cartData));
    } catch {
      dispatch(
        userProgressActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetching cart data failed!",
        })
      );
    }
  };
};

function addTime(...numbers) {
  return numbers.reduce((prev, current) => {
    const main = Math.floor(current);
    const fraction = current - main;
    console.log("prev", prev);
    console.log("fraction", fraction);
    console.log(prev + fraction - Math.floor(prev + fraction));
    if (prev + fraction - Math.floor(prev + fraction) >= 0.6) {
      prev = prev + fraction - 0.6;
      prev += 1;
      console.log("prev after change", prev);
    } else prev += fraction;

    return prev + main;
  }, 0);
}
