# memo

- React.memo là một Higher Order Component (HOC) giúp tối ưu hiệu suất bằng cách ghi nhớ (memoize) kết quả render của một component. Dùng để nâng cao hiệu suất, giảm số lần render

- Dont overuse memo, sử dụng với các component càng gần root của DOM tree càng tốt
- Dont use it on components where props will change frequently

- check dependencies của component con, lần đầu mount sẽ render, lần sau check nếu dependencies thay đổi (===) thì sẽ re-render, còn k thì k re-render

```js
import React from "react";

const MyComponent = ({ count }) => {
  console.log("Rendered!");
  return <div>Count: {count}</div>;
};

export default React.memo(MyComponent);
```

- Lần đầu tiên mount: Component luôn render.
- Những lần sau:
  - Nếu props không thay đổi → Không re-render.
  - Nếu props thay đổi (so sánh nông(so sánh tham chiếu) - shallow comparison) → Re-render.

1. cách handle khi props chứa func

- sử dụng useCallback cho function ở component cha truyền vào con

2. cách handle khi props chứa object

- sử dụng useMemo cho object ở component cha truyền vào con

```js
const data = useMemo(() => [{ name: "Alice" }], []);
```

# Đối với những hàm tính toán phức tạp 1 input -> 1 output

- Sử dụng `useMemo` để optimize code, đỡ thời gian tính đi tính lại

```js
const initialCountIsPrime = useMemo(
  () => isPrime(initialCount),
  [initialCount]
);
```

# using million.js

[Check it here](https://million.dev/)

- Cách million optimize the speed:
  - replacing REACT Virtual DOM with more efficent mechanism, helping to derive the DOM faster
  - tăng cường hiệu suất diffing và rendering bằng cách sử dụng các chiến thuật tối ưu mạnh mẽ hơn, giúp giảm độ trễ khi cập nhật những phần phức tạp trong giao diện. Million.js được thiết kế để giảm thiểu số lần re-render không cần thiết và tối ưu hóa hiệu suất render, đặc biệt trong các tình huống có nhiều cập nhật DOM.
