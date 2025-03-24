import React from "react";

import {
  isEmail,
  isNotEmpty,
  hasMinLength,
  isEqualToOtherValue,
} from "../util/validation";

type FormState = {
  errors: string[];
};

type FormInput = {
  email: string;
  password: string;
  "confirm-password": string;
  "first-name": string;
  "last-name": string;
  role: string;
  terms: boolean;
  acquisition: string[];
};

import { useActionState } from "react";
function signUpAction(prevFormState: FormState, formData: FormData) {
  console.log("Form data", formData);
  const data = Object.fromEntries(formData);
  const terms = data.terms;
  const acquisitionChannel = data.acquisition;
  console.log(data);
  console.log(terms);
  console.log(acquisitionChannel);

  let errors: string[] = [];

  if (!isEmail(data.email)) {
    errors.push("Please enter a valid email address");
  }

  if (!hasMinLength(data.password, 8) || !isNotEmpty(data.password)) {
    errors.push("Password must be at least 8 characters long");
  }

  if (!isEqualToOtherValue(data.password, data["confirm-password"])) {
    errors.push("Passwords do not match");
  }

  if (!isNotEmpty(data["first-name"]) || !isNotEmpty(data["last-name"])) {
    errors.push("Please enter your first name and last name");
  }

  if (!isNotEmpty(data.role)) {
    errors.push("Please select a role");
  }

  if (!data.terms) {
    errors.push("Please accept the terms and conditions");
  }

  if (!data.acquisition) {
    errors.push("Please select at least an acquisition channel");
  }

  if (errors.length > 0) {
    return { errors, enteredValues: data };
  }
  return { errors: null, enteredValues: null };
}

export default function Signup() {
  const [formState, formAction] = useActionState<{
    errors: string[] | null;
    enteredValues: FormInput | null;
  }>(signUpAction, {
    errors: null,
    enteredValues: null,
  });
  return (
    <form action={formAction}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className="control">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          defaultValue={formState.enteredValues?.email}
        />
      </div>

      <div className="control-row">
        <div className="control">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            defaultValue={formState.enteredValues?.password}
          />
        </div>

        <div className="control">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
            defaultValue={formState.enteredValues?.["confirm-password"]}
          />
        </div>
      </div>

      <hr />

      <div className="control-row">
        <div className="control">
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            name="first-name"
            defaultValue={formState.enteredValues?.[`first-name`]}
          />
        </div>

        <div className="control">
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            name="last-name"
            defaultValue={formState.enteredValues?.[`last-name`]}
          />
        </div>
      </div>

      <div className="control">
        <label htmlFor="phone">What best describes your role?</label>
        <select
          id="role"
          name="role"
          defaultValue={formState.enteredValues?.role}
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="employee">Employee</option>
          <option value="founder">Founder</option>
          <option value="other">Other</option>
        </select>
      </div>

      <fieldset>
        <legend>How did you find us?</legend>
        <div className="control">
          <input
            type="checkbox"
            id="google"
            name="acquisition"
            value="google"
            checked={formState.enteredValues?.acquisition?.includes("google")}
          />
          <label htmlFor="google">Google</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            value="friend"
            checked={formState.enteredValues?.acquisition?.includes("friend")}
          />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className="control">
          <input type="checkbox" id="other" name="acquisition" value="other" />
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>

      <div className="control">
        <label htmlFor="terms-and-conditions">
          <input
            type="checkbox"
            id="terms-and-conditions"
            name="terms"
            defaultChecked={formState.enteredValues?.terms}
          />
          I agree to the terms and conditions
        </label>
      </div>

      {formState.errors && (
        <ul className="error">
          {formState.errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}

      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button className="button">Sign up</button>
      </p>
    </form>
  );
}
