import { Post } from "@/app/lib/definitions";
import Link from "next/link";
const dayjs = require("dayjs");

export default function PostCard({
  forum_name,
  title,
  url,
  submitted_by,
  posted_at,
  votes,
  comments,
  post_id,
}: Post) {
  function displayUpArrow(vote: boolean) {
    if (vote === true) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-7 h-7 text-green-400"
        >
          <path
            fillRule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.53 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v5.69a.75.75 0 0 0 1.5 0v-5.69l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z"
            clipRule="evenodd"
          />
        </svg>
      );
    }
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-7 h-7"
      >
        <path
          fillRule="evenodd"
          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.53 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v5.69a.75.75 0 0 0 1.5 0v-5.69l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z"
          clipRule="evenodd"
        />
      </svg>
    );
  }

  function displayDownArrow(vote: boolean) {
    if (vote === true) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-7 h-7 text-sky-600"
        >
          <path
            fillRule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-.53 14.03a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V8.25a.75.75 0 0 0-1.5 0v5.69l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3Z"
            clipRule="evenodd"
          />
        </svg>
      );
    } else {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-7 h-7"
        >
          <path
            fillRule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-.53 14.03a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V8.25a.75.75 0 0 0-1.5 0v5.69l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3Z"
            clipRule="evenodd"
          />
        </svg>
      );
    }
  }

  return (
    <div className="flex gap-4 my-6 items-center">
      <div className="flex justify-center text-center items-center">
        <div className="flex flex-col gap-2">
          {displayUpArrow(true)}
          <p>{votes}</p>
          {displayDownArrow(false)}
        </div>
      </div>
      <div className="">
        <div className="flex flex-col">
          {url ? (
            <h1>
              <Link className="underline text-sky-500" href={url && `${url}`}>
                {title}
              </Link>
            </h1>
          ) : (
            <h1>
              <Link
                className="underline text-sky-500"
                href={`/t/${forum_name}/${post_id}`}
              >
                {title}
              </Link>
            </h1>
          )}
        </div>
        <div className="">
          <p>
            Submitted at {dayjs(posted_at).format("MMM DD, YYYY h:m:ss A")} by{" "}
            <Link
              className={"text-blue-500 hover:text-blue-800"}
              href={`/user/${submitted_by}`}
            >
              {submitted_by}
            </Link>{" "}
            in{" "}
            <Link
              className={"text-blue-500 hover:text-blue-800"}
              href={`/t/${forum_name}`}
            >
              {forum_name}
            </Link>
          </p>
          <p>
            <Link
              className={"text-blue-500 hover:text-blue-800"}
              href={`/t/${forum_name}/${post_id}`}
            >
              {comments
                ? comments === "1"
                  ? `${comments} comment`
                  : `${comments} comments`
                : `0 comments`}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
