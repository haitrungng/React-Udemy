import { useSelector } from "react-redux";
import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cart = useSelector((state) => state.cart);
  const isOpenCart = useSelector((state) => state.userProgress.isOpenCart);
  console.log(isOpenCart);

  if (!isOpenCart) return <></>;

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cart.items.map((item) => {
          const total = item.price * item.quantity;
          console.log(item);

          return (
            <CartItem
              key={item.title}
              item={{
                title: item.title,
                quantity: item.quantity,
                total: total,
                price: item.price,
              }}
            />
          );
        })}
      </ul>
    </Card>
  );
};

export default Cart;
