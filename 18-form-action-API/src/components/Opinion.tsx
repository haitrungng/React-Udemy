import React, { useOptimistic } from "react";

import { useContext, useActionState } from "react";
import { OpinionsContext } from "../store/opinions-context";

export function Opinion({ opinion: { id, title, body, userName, votes } }) {
  const ctx = useContext(OpinionsContext);
  const [optimisticVotes, setVotesOptimistically] = useOptimistic(
    votes,
    (prevMode, mode) => (mode === "up" ? prevMode + 1 : prevMode - 1)
  );

  async function upVoteAction() {
    setVotesOptimistically("up");
    await ctx.upvoteOpinion(id);
  }

  async function downVoteAction() {
    setVotesOptimistically("down");
    await ctx.downvoteOpinion(id);
  }

  const [, upVoteFormAction, upVotePending] = useActionState(
    upVoteAction,
    null
  );
  const [, downVoteFormAction, downVotePending] = useActionState(
    downVoteAction,
    null
  );

  return (
    <article>
      <header>
        <h3>{title}</h3>
        <p>Shared by {userName}</p>
      </header>
      <p>{body}</p>
      <form className="votes">
        {/* up btn */}
        <button
          formAction={upVoteFormAction}
          disabled={downVotePending || upVotePending}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="m16 12-4-4-4 4" />
            <path d="M12 16V8" />
          </svg>
        </button>

        <span>{optimisticVotes}</span>

        {/* down btn */}
        <button
          formAction={downVoteFormAction}
          disabled={downVotePending || upVotePending}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M12 8v8" />
            <path d="m8 12 4 4 4-4" />
          </svg>
        </button>
      </form>
    </article>
  );
}
