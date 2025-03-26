# Prop Drilling (shopping-project)

Prop Drilling là một vấn đề trong React xảy ra khi một prop cần được truyền qua nhiều cấp của component tree, ngay cả khi một số component trung gian không sử dụng nó. Điều này làm cho code trở nên khó bảo trì và gây rối trong việc quản lý dữ liệu.

-> Solution: Context API / Redux

## Context API (thường dùng với useReducer)

Thay vì truyền từng cấp, ta có thể sử dụng React Context API để cung cấp dữ liệu cho bất kỳ component nào trong cây component.
đặt tên folder: src/store

```js
import { createContext } from "react";

export const CartContext = createContext({
  // optinal, this will make our IDE easily figure out the element of object
  items: [],
  addItemToCart: (id) => {},
  updateItemQuantity: (id, amount) => {},
});
```

then wrap the whole app with <CartContext></CartContext> (work for react 19+, else using <CartContext.Provider></CartContext.Provider>)

```js
import { CartContext } from "./store/shopping-cart-context.jsx";

// default value must have
<CartContext.Provider value={{ items: [] }}>
  <Header
    cart={shoppingCart}
    onUpdateCartItemQuantity={handleUpdateCartItemQuantity}
  />
  <Shop onAddItemToCart={handleAddItemToCart} />
</CartContext.Provider>;
```

to consume the context, use hook useContext/use

hooks dont allow to be in a block like if, for,... but `use` can!!!

```js
import { useContext } from "react";
import { CartContext } from "../store/shopping-cart-context.jsx";

export default function Header() {
  const cartCtx = useContext(CartContext);
  // ...
}
```

- Dis-advantange
  - In complex apps, using React Context can leed to deeply nested "Context Provider" components
  - React Context is not optimized for high-frequency state changes (should be use for theme)

## Redux

- One Central Data (State) Store
- Using reducer function to manipulate data

1. package for react

- Redux có thể apply cho mọi nền tảng js, không riêng gì react
- tải dependency cho react:

  - npm i redux react-redux

- 1st step: create an store folder, containing our redux
  ex:
  - should return a new object and NOT mutate the oldState in reducer, cause object is reference so mutating state can easily cause bugs

```js
import { createStore } from "redux";

const counterReducer = (state = { counter: 0 }, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { counter: state.counter + 1 };
    case "DECREMENT":
      return { counter: state.counter - 1 };
    default:
      return state;
  }
};

const store = createStore(counterReducer);

export default store;
```

- 2nd step: wrap the root with <Provider>

```js
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App";
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

- 3rd step: calling redux in component

  - useSelector giúp lấy 1 phần nhỏ các state từ trong redux
  - useDispatch giúp tạo ra các dispatch func

```js
import { useSelector, useDispatch } from "react-redux";
import classes from "./Counter.module.css";

const Counter = () => {
  const toggleCounterHandler = () => {};

  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  const incrementHandler = () => dispatch({ type: "INCREMENT" });
  const decrementHandler = () => dispatch({ type: "DECREMENT" });
  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{counter}</div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          marginBottom: "1rem",
        }}
      >
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
```

- easier approach: using redux toolkit

  npm i @reduxjs/toolkit (already contain redux)
  npm i react-redux

check the implementation at [here](../../20-redux/src/)

!!! `REDUCER` must be a `pure, side-effect free, syncronous` function
