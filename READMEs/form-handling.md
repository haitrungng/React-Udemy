# Form

- handling form have 2 parts:
  - validation
  - submmition

## Submission

```tsx
// check out this form
<form>
  <h2>Login</h2>

  <div className="control-row">
    <div className="control no-margin">
      <label htmlFor="email">Email</label>
      <input id="email" type="email" name="email" />
    </div>

    <div className="control no-margin">
      <label htmlFor="password">Password</label>
      <input id="password" type="password" name="password" />
    </div>
  </div>

  <p className="form-actions">
    <button className="button button-flat">Reset</button>
    <button className="button" onClick={handleSubmit}>
      Login
    </button>
  </p>
</form>
```

1. Handle reloading

- whenever user click on Login btn, the page reload -> this is the default behavior of form
- 1st solution:

```tsx
// default type is submit
<button type="submit" className="button" onClick={handleSubmit}>
  Login
</button>
// change it to btn -> will not submit form and reload
<button type="button" className="button" onClick={handleSubmit}>
  Login
</button>

// another type is reset
<button type="reset" className="button" onClick={handleSubmit}>
  Login
</button>
```

- 2nd solution: using `event.preventDefault()`

2. Handle data change

- 1st solution: useState
- 2nd solution: useRef

  - these solutions only work with form having limited amount of input fields

- 3rd solution: using `FormData`
  - all input/radio field must have property `name`

```tsx
function onSubmit(event: React.FormEvent) {
  event.preventDefault();

  const fd = new FormData(event.target as HTMLFormElement);

  const data = Object.fromEntries(fd.entries()) as Record<
    string,
    FormDataEntryValue | FormDataEntryValue[]
  >;
  const acquisitionChannels = fd.getAll("acquisition");
  const role = fd.get("role");

  data.acquisitionChannels = acquisitionChannels as FormDataEntryValue[];
  data.role = role || ""; // Assign an empty string if role is null
  console.log(data);

  // console.log(fd.entries());
  // for (const [key, value] of fd.entries()) {
  //   console.log(key, value);
  // }

  // const enteredEmail = fd.get("email");
}
```

## Validation

- validate on keystroke
- validate on lostFocus

check [this file](../17-form-userInput/src/components/StateLogin.tsx)

- Another way for validation: using built-in form validation ([link](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation))

## Form Actions

- thay vì sử dụng `onSubmit` prop, nhận vào 1 event as param và gọi `event.preventDefault()`
- sử dụng props `action`

  - sẽ auto gọi `event.preventDefault()` behind the scene -> k làm page reload
  - nhận vào `FormData` là param thay vì event (các input field phải có name để nhận diện)
  - khi nhấn submit, form sẽ tự động bị reset (not reload)

- sử dụng hook: useActionState ([check this](../18-form-action-API/src/components/NewOpinion.tsx))
  - Nếu sử dụng `async func` cho `useActionState`, sử dụng `useFormStatus` hook để khiến submit btn disabled khi đang post data lên backend, tránh submit 2 lần ([check this](../18-form-action-API/src/components/SubmitBtn.tsx))
  - Hoặc sử dụng `pending` của `useActionState` để disabled btn
  - Tuy nhiên sẽ khiến UI bị lâu cập nhật
    -> SOLUTIONS: `useOptimistic()`
    - `useOptimistic` only gives you temp value, once the fetching done, it'll be back to the real value
    - ex: [check this](../18-form-action-API/src/components/Opinion.tsx) using `useOptimistic`
