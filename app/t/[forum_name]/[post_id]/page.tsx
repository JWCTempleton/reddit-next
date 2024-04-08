import { fetchPost } from "@/app/lib/data";
import PostCard from "@/app/ui/Post/PostCard";
import Toggleable from "@/app/ui/Toggleable";
import Link from "next/link";
const dayjs = require("dayjs");

export default async function Page({
  params,
}: {
  params: { forum_name: string; post_id: string };
}) {
  const postID = params.post_id;
  const forumName = params.forum_name;

  const post = await fetchPost(postID);
  const postData = post[0].rows;
  const commentData = post[1];

  return (
    <div className="px-4">
      <h1 className="text-xl bold pt-4">{forumName}</h1>

      {postData.map(
        (p: {
          id: string;
          forum_name: string;
          title: string;
          votes: number;
          url: string | undefined;
          username: string;
          created_at: string;
          comments: string | null;
        }) => {
          return (
            <div key={p.id}>
              <PostCard
                key={p.id}
                forum_name={p.forum_name}
                post_id={p.id}
                title={p.title}
                votes={p.votes}
                url={p.url}
                submitted_by={p.username}
                posted_at={p.created_at}
                comments={p.comments}
              />
              <Toggleable buttonLabel={"Comment"}>
                <div>
                  <textarea
                    className="peer block w-[500px] rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 text-sky-800 mb-4"
                    id="content"
                    required
                    name="content"
                    rows={6}
                    placeholder="Enter comment"
                    minLength={1}
                  />
                </div>
              </Toggleable>
            </div>
          );
        }
      )}
      {commentData.map((c: { id: string }) => {
        return <div key={c.id}>{displayReplies(c)}</div>;
      })}
    </div>
  );
}

export const displayReplies = (arr: {
  id: any;
  comment?: string;
  replies?: string[];
  username?: string;
  created_at?: any;
}) => {
  return (
    <div
      key={arr.id}
      className="flex flex-col rounded-md border-2 p-4 gap-4 my-4"
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
      <p>
        <Toggleable buttonLabel={"Reply"}>
          <div>
            <textarea
              className="peer block w-[500px] rounded-md border border-gray-200 py-[9px] pl-8 text-sm outline-2 placeholder:text-gray-500 text-sky-800 mb-4"
              id="content"
              required
              name="content"
              rows={6}
              placeholder="Enter reply"
              minLength={1}
            />
          </div>
        </Toggleable>
      </p>
      <div className="pl-3 pt-3 my-0">
        {arr.replies &&
          arr.replies.map((arr2: any) => {
            return displayReplies(arr2);
          })}
      </div>
    </div>
  );
};
