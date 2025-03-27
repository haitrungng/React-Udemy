import { useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";

import { useDispatch, useSelector } from "react-redux";

import { sendCartData, fetchCartData } from "./store/cart-actions";

function App() {
  const dispatch = useDispatch();
  const isOpenCart = useSelector((state) => state.userProgress.isOpenCart);
  const notification = useSelector((state) => state.userProgress.notification);
  const cart = useSelector((state) => state.cart);
  const cartChanged = useSelector((state) => state.cart.changed);

  useEffect(() => {
    if (cartChanged) dispatch(sendCartData(cart));
  }, [cart, dispatch, cartChanged]);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {isOpenCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
