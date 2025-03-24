import React from "react";
import Input from "./Input";

export default function Signup() {
  const [passwordsMatch, setPasswordsMatch] = React.useState(true);
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

    if (data["password"] !== data["confirm-password"]) {
      setPasswordsMatch(false);
      return;
    }

    setPasswordsMatch(true);

    console.log(data);

    // console.log(fd.entries());
    // for (const [key, value] of fd.entries()) {
    //   console.log(key, value);
    // }

    // const enteredEmail = fd.get("email");
  }

  return (
    <form onSubmit={onSubmit}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className="control">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" required />
      </div>

      <div className="control-row">
        <Input
          label="Password"
          id="password"
          type="password"
          name="password"
          required
          minLength={6}
          error={""}
        />
        {/* <div className="control">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            required
            minLength={6}
          />
        </div> */}

        <Input
          label={"Confirm Password"}
          id={"confirm-password"}
          type="password"
          name="confirm-password"
          required
          error={!passwordsMatch && "Passwords must match"}
        />

        {/* <div className="control">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
            required
          />
          <div className="control-error">
            {!passwordsMatch && <p>Passwords must match</p>}
          </div>
        </div> */}
      </div>

      <hr />

      <div className="control-row">
        {/* <div className="control">
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" name="first-name" required />
        </div> */}
        <Input label="First Name" id="first-name" name="first-name" required />

        {/* <div className="control">
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" name="last-name" required />
        </div> */}
        <Input label="Last Name" id="last-name" name="last-name" required />
      </div>

      <div className="control">
        <label htmlFor="phone">What best describes your role?</label>
        <select id="role" name="role" required>
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
          />
          <label htmlFor="google">Google</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            value="friend"
          />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className="control">
          <input type="checkbox" id="other" name="acquisition" value="other" />
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>

      {/* <div className="control">
        <label htmlFor="terms-and-conditions">
          <input
            type="checkbox"
            id="terms-and-conditions"
            name="terms"
            required
          />
          I agree to the terms and conditions
        </label>
      </div> */}
      <Input
        label="I agree to the terms and conditions"
        id="terms-and-conditions"
        type="checkbox"
        name="terms"
        required
      />

      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button type="submit" className="button">
          Sign up
        </button>
      </p>
    </form>
  );
}
