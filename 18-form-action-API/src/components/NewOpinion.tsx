import React, { useContext } from "react";

import { useActionState } from "react";
import { OpinionsContext } from "../store/opinions-context";
import SubmitBtn from "./SubmitBtn";

type FormState = {
  userName?: string;
  title?: string;
  body?: string;
};

export function NewOpinion() {
  const { addOpinion } = useContext(OpinionsContext);

  async function opinionAction(
    prevState: { errors: string[]; currInput: FormState },
    formData: FormData
  ) {
    const data = Object.fromEntries(formData.entries());
    console.log(data);

    let errors: string[] = [];

    if (data.userName === "") {
      errors.push("Please enter your name");
    }
    // @ts-ignore
    if (data.title.trim().length < 5) {
      errors.push("Title must be at least 5 characters long");
    }
    // @ts-ignore
    const body = data.body.trim();
    if (body.length < 10 || body.length > 300) {
      errors.push("Opinion must be between 10 and 300 characters long");
    }

    if (errors.length > 0) {
      return { errors, currInput: data };
    }

    await addOpinion({
      userName: data.userName,
      title: data.title,
      body: data.body,
    });
    return { errors: [], currInput: {} };
  }

  const [formState, formAction] = useActionState<{
    errors: string[];
    currInput: FormState;
    // @ts-ignore
  }>(opinionAction, {
    errors: [],
    currInput: {},
  });
  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              defaultValue={formState.currInput?.userName}
            />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={formState.currInput?.title}
            />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea
            id="body"
            name="body"
            rows={5}
            defaultValue={formState.currInput?.body}
          ></textarea>
        </p>

        {formState.errors.length > 0 && (
          <ul className="errors">
            {formState.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}

        <SubmitBtn />
      </form>
    </div>
  );
}
