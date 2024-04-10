"use client";

import { createComment } from "@/app/lib/actions";
import { Button } from "../Button";
import { useRef, useState } from "react";

export const CreateComment = (props: { postID: string; forumName: string }) => {
  const myRef = useRef<HTMLFormElement>(null);
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };
  return (
    <div className="flex">
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>Comment</Button>
      </div>
      <div style={showWhenVisible}>
        <form
          ref={myRef}
          action={async (formData) => {
            await createComment(formData);
            myRef.current?.reset();
            toggleVisibility();
          }}
        >
          <div>
            <input
              id="postID"
              name="postID"
              value={props.postID}
              readOnly
              hidden
            />
          </div>
          <div>
            <input
              id="forum"
              name="forum"
              value={props.forumName}
              readOnly
              hidden
            />
          </div>
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
  );
};
