import classes from "./CartButton.module.css";
import { useDispatch, useSelector } from "react-redux";

import { userProgressActions } from "../../store/userProgress";

const CartButton = (props) => {
  const dispatch = useDispatch();
  const handleToggle = () => {
    dispatch(userProgressActions.toggleOpenCart());
  };

  const items = useSelector((state) => state.cart.items);

  return (
    <button className={classes.button} onClick={handleToggle}>
      <span>My Cart</span>
      <span className={classes.badge}>{items.length}</span>
    </button>
  );
};

export default CartButton;
