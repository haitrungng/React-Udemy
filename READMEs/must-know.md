## JS hỗ trợ default prop value

## public/ vs assets/ for Image Storage

1. The public/ Folder

As shown in the previous lecture you can store images in the public/ folder and then directly reference them from inside your index.html or index.css files.

The reason for that is that images (or, in general: files) stored in public/ are made publicly available by the underlying project development server & build process. Just like index.html, those files can directly be visited from inside the browser and can therefore also be requested by other files.

If you try loading localhost:5173/some-image.jpg, you'll be able to see that image (if it exists in the public/ folder, of course).

2. The src/assets/ Folder

You can also store images in the src/assets/ folder (or, actually, anywhere in the src folder).

So what's the difference compared to public/?

Any files (of any format) stored in src (or subfolders like src/assets/) are not made available to the public. They can't be accessed by website visitors. If you try loading localhost:5173/src/assets/some-image.jpg, you'll get an error.

Instead, files stored in src/ (and subfolders) can be used in your code files. Images imported into code files are then picked up by the underlying build process, potentially optimized, and kind of "injected" into the public/ folder right before serving the website. Links to those images are automatically generated and used in the places where you referenced the imported images.

3. Which Folder Should You Use?

You should use the public/ folder for any images that should not be handled by the build process and that should be generally available. Good candidates are images used directly in the index.html file or favicons.

On the other hand, images that are used inside of components should typically be stored in the src/ folder (e.g., in src/assets/).

## shallow copy, deep copy

shallow copy tạo bảng copy ref tới các object thuộc array gốc

```js
// arr
const originalArray = [{ name: "Alice" }, { name: "Bob" }];

const shallowCopy = [...originalArray]; // Tạo bản sao mảng nhưng không sao chép các object bên trong

shallowCopy[0].name = "Charlie"; // Thay đổi object trong mảng con

console.log(originalArray[0].name); // "Charlie" ❌ Bị ảnh hưởng!
console.log(shallowCopy[0].name); // "Charlie"
```

deep copy - tạo 1 bản sao hoàn toàn cách biệt

    search more on chatGPT, rcm the best way
    const newGameBoard = structuredClone(prevGameBoard);
    Cách tốt nhất nếu trình duyệt/node.js của bạn hỗ trợ.

## Cách React và css hoạt động

```css
#log {
  max-width: 20rem;
  color: #3f3b00;
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  text-align: center;
}

#log li {
  border-radius: 4px;
  animation: slide-in-from-left 1s cubic-bezier(0.075, 0.82, 0.165, 1) forwards;
  margin: 0.75rem;
}
```

```js
    <ol id="log">
      {gameTurns.map((turn) => (
        <li
          //   key={${turn.square.row}-${turn.square.col}}
          //   key={count--}
          key={${count++}}
        >
          {${turn.player} selected (${turn.square.row}, ${turn.square.col})}
        </li>
      ))}
    </ol>
```

Câu hỏi: Tại sao animation: slide-in-from-left hoạt động khác nhau khi thay đổi key?

Lý do: React Render Optimization & Key Reconciliation

1. Khi sử dụng key={\${turn.square.row}-${turn.square.col}}

Cách hoạt động của React:

- Khi bạn thêm một nước đi mới, danh sách gameTurns được cập nhật với phần tử mới ở cuối danh sách.
- Các phần tử trước đó giữ nguyên key của chúng, nên React chỉ thêm phần tử mới vào mà không động vào các phần tử cũ.
- Kết quả: React chỉ thêm một phần tử vào cuối danh sách và không làm ảnh hưởng đến animation của các phần tử trước đó.

💡 Hiệu ứng animation:

Chỉ phần tử mới được thêm vào chạy animation slide-in-from-left, các phần tử trước đó không thay đổi.

2. Khi sử dụng key={count++} hoặc key={count--}

Cách hoạt động của React:

    Mỗi lần handleCellClick() được gọi, setGameBoard() làm thay đổi gameTurns, danh sách mới sẽ được re-render.

    Do count luôn thay đổi mỗi khi render, React nghĩ rằng toàn bộ danh sách là mới, ngay cả với những phần tử cũ.

    Kết quả: React unmount toàn bộ danh sách cũ và mount lại danh sách mới từ đầu.

💡 Hiệu ứng animation:

Vì toàn bộ danh sách bị re-mount lại, tất cả các phần tử đều bị reset animation, khiến hiệu ứng có thể giật hoặc không mượt.

## Set up tailwind 4.0

trong tailwind 4.0, npx tailwindcss init bị bỏ -> k thể tạo file tailwind.config.js -> extension tailwind k chạy -> k thể auto complete

=> SOLUTION

![](imagesForMD/2025-02-28-13-42-34.png)

## Key of list elements in React

- Key giúp react giữ lại giá trị cũ nếu key = nhau, apply css đúng như mong đợi

`SHOULD DO`

```js
return (
  <ol>
    {history.map((count) => (
      <HistoryItem key={count.id} count={count.value} />
    ))}
  </ol>
);
```

`SHOULD NOT DO`

```js
return (
  <ol>
    {history.map((count, id) => (
      <HistoryItem key={id} count={count.value} />
    ))}
  </ol>
);
```

## Using Key for resetting components
