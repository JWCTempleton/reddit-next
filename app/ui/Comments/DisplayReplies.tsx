"use client";

import Link from "next/link";
import { createReply } from "@/app/lib/actions";
import { Button } from "../Button";
const dayjs = require("dayjs");
import { useRef, useState } from "react";

export const DisplayReplies = (arr: {
  postID: string;
  forumName: string;
  id: any;
  comment?: string;
  replies?: string[];
  username?: string;
  created_at?: any;
}) => {
  const globalId = arr.postID;
  const globalForum = arr.forumName;

  const myRef = useRef<HTMLFormElement>(null);
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div
      key={arr.id}
      className="flex flex-col rounded-lg border-2 p-4 gap-2 mt-4 mb-1"
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
        <div className="flex">
          <div style={hideWhenVisible}>
            <Button onClick={toggleVisibility}>Reply</Button>
          </div>
          <div style={showWhenVisible}>
            <form
              ref={myRef}
              action={async (formData) => {
                await createReply(formData);
                myRef.current?.reset();
                toggleVisibility();
              }}
            >
              <div>
                <input
                  id="postID"
                  name="postID"
                  value={arr.postID}
                  readOnly
                  hidden
                />
              </div>

              <input
                id="forum"
                name="forum"
                value={arr.forumName}
                readOnly
                hidden
              />

              <input
                id="commentID"
                name="commentID"
                value={arr.id}
                readOnly
                hidden
              />

              <textarea
                className="peer block w-[500px] rounded-md border border-gray-200 py-[9px] pl-8 text-sm outline-2 placeholder:text-gray-500 text-sky-800 mb-4"
                id="content"
                required
                name="content"
                rows={6}
                placeholder="Enter reply"
                minLength={1}
              />
              <Button className="mb-3">Submit</Button>
            </form>
            <div className="flex space-between w-[100%]">
              <Button
                onClick={toggleVisibility}
                className="bg-red-500 hover:bg-red-600 justify-items-end"
              >
                cancel
              </Button>
            </div>
          </div>
        </div>
      </>
      <div className="pl-3 pt-3 my-0">
        {arr.replies &&
          arr.replies.map((c: any) => {
            return (
              <div key={c.id}>
                <DisplayReplies
                  forumName={globalForum}
                  postID={globalId}
                  id={c.id}
                  comment={c.comment}
                  replies={c.replies || undefined}
                  username={c.username}
                  created_at={c.created_at}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};
