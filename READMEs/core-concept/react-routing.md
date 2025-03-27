# React routing

npm i react-router-dom

1. Define routes

```js
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/products", element: <Products /> },
]);

function App() {
  return <RouterProvider router={router} />;
}
```

2. Navigate bewteen routes

- Vì sao KHÔNG nên dùng <a>

  - Tải lại toàn bộ trang (full page reload)

    - Thẻ <a> sẽ gửi yêu cầu HTTP đến server và tải lại toàn bộ trang web từ đầu.
    - Điều này làm mất state của ứng dụng, gây chậm và kém mượt cho trải nghiệm người dùng.

  - Không tận dụng được cơ chế SPA của React

    - React SPA hoạt động bằng cách thay đổi URL và render lại component tương ứng mà không reload trang. <a> phá vỡ logic này.

  - Mất session state và hiệu năng kém

    - Nếu app đang giữ data trong Redux, Context, hoặc state cục bộ → dùng <a> sẽ khiến mất hết, vì reload lại.

- Approach: use <Link to="/products">Products</Link> hoặc NavLink
- Trong trường hợp muốn tạo 1 navbar highlight active page, sử dụng NavLink

```js
// isActive tự động được truyền vào bởi react-router-dom
<NavLink to="/" className={(isActive) => (isActive ? classes.active : "")}>
  Home
</NavLink>
```

3. Layout & Nested Layout

- Giả sử bạn muốn thêm 1 navbar trong suốt web của bạn
- Cách xử lý: tạo 1 rootLayout

```js
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <MainNavigation />
      <Outlet />
    </>
  );
};

// APP.JS
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/products", element: <Products /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}
// NAVIGATION BAR
import { NavLink } from "react-router-dom";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Products
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
```

!!! end usage:

- `<NavLink to="/tasks" />` /tasks true
- `<NavLink to="/tasks" />` /tasks/123 true
- `<NavLink to="/tasks" end />` /tasks true
- `<NavLink to="/tasks" end />` /tasks/123 false
