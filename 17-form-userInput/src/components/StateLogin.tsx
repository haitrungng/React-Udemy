import React from "react";
import { useState } from "react";

export default function Login() {
  const [enteredValue, setEnteredValue] = useState({
    email: "",
    password: "",
  });

  const [doneEditing, setDoneEditing] = useState({
    email: true,
    password: true,
  });

  const emailIsInvalid =
    !enteredValue.email.includes("@") &&
    doneEditing.email &&
    enteredValue.email !== "";

  function handleChange(identidier: string, value: string) {
    setEnteredValue((prevValue) => {
      return {
        ...prevValue,
        [identidier]: value,
      };
    });
    setDoneEditing((prevValue) => {
      return {
        ...prevValue,
        [identidier]: false,
      };
    });
  }
  function handleOnBlur(identidier: string) {
    setDoneEditing((prevValue) => {
      return {
        ...prevValue,
        [identidier]: true,
      };
    });
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    console.log(enteredValue);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            onChange={(event) => handleChange("email", event.target.value)}
            onBlur={() => handleOnBlur("email")}
            value={enteredValue.email}
          />
          <div className="control-error">
            {emailIsInvalid && <p>Please enter a valid email address</p>}
          </div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            onBlur={() => handleOnBlur("password")}
            onChange={(event) => handleChange("password", event.target.value)}
            value={enteredValue.password}
          />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
