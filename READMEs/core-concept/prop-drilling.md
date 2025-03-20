# V. Prop Drilling (shopping-project)

Prop Drilling là một vấn đề trong React xảy ra khi một prop cần được truyền qua nhiều cấp của component tree, ngay cả khi một số component trung gian không sử dụng nó. Điều này làm cho code trở nên khó bảo trì và gây rối trong việc quản lý dữ liệu.

-> Solution: Context API / Redux

1. Context API
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

hooks dont allow to be in a block like if, for,... but use can!!!

```js
import { useContext } from "react";
import { CartContext } from "../store/shopping-cart-context.jsx";

export default function Header() {
  const cartCtx = useContext(CartContext);
  // ...
}
```
