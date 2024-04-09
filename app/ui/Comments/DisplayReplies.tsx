import Link from "next/link";
import Toggleable from "../Toggleable";
const dayjs = require("dayjs");

export const DisplayReplies = (arr: {
  id: any;
  comment?: string;
  replies?: string[];
  username?: string;
  created_at?: any;
}) => {
  return (
    <div
      key={arr.id}
      className="flex flex-col rounded-lg border-2 p-4 gap-4 my-4"
    >
      <p>
        <Link
          className={"text-blue-500 hover:text-blue-800"}
          href={`/user/${arr.username}`}
        >
          {arr.username}
        </Link>{" "}
        posted at {dayjs(arr.created_at).format("MMM DD, YYYY h:m:ss A")}
      </p>
      <p>{arr.comment}</p>
      <>
        <Toggleable buttonLabel={"Reply"}>
          <form>
            <textarea
              className="peer block w-[500px] rounded-md border border-gray-200 py-[9px] pl-8 text-sm outline-2 placeholder:text-gray-500 text-sky-800 mb-4"
              id="content"
              required
              name="content"
              rows={6}
              placeholder="Enter reply"
              minLength={1}
            />
          </form>
        </Toggleable>
      </>
      <div className="pl-3 pt-3 my-0">
        {arr.replies &&
          arr.replies.map((arr2: any) => {
            return DisplayReplies(arr2);
          })}
      </div>
    </div>
  );
};
