# State-Batching

1. Nhiều cập nhật state trong một lần render:

- Khi bạn gọi một hoặc nhiều hàm thay đổi state (ví dụ: setState hoặc useState trong React), React sẽ gộp các thay đổi lại và chỉ trigger một lần render duy nhất sau khi tất cả các cập nhật state đã được xử lý.

vd: Lần render sau sẽ chỉ xảy ra `một lần`, thay vì hai lần, mỗi lần cho một cập nhật.

```js
import React, { useState } from "react";

function MyComponent() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  const handleClick = () => {
    setCount1(count1 + 1); // Cập nhật count1
    setCount2(count2 + 1); // Cập nhật count2
    console.log(count1, count2); // Gọi trước khi render lại -> click lần đầu: 0, 0
  };

  return (
    <div>
      <p>Count 1: {count1}</p>
      <p>Count 2: {count2}</p>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
}
```
