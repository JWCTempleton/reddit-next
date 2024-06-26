"use client";
import { Button } from "@/app/ui/Button";
import SubmitPostForm from "@/app/ui/SubmitPostForm";
import SubmitSelfPostForm from "@/app/ui/SubmitSelfPostForm";
import { useState } from "react";

export default function Page({ params }: { params: { forum_name: string } }) {
  const forumName = params.forum_name;
  const [isSelfPost, setIsSelfPost] = useState(false);

  return (
    <div className="px-4">
      <h1 className="pb-4 text-xl font-bold">Submit {forumName}</h1>
      <div className="flex gap-3 pb-4">
        <Button onClick={() => setIsSelfPost(false)}>Link Post</Button>
        <Button onClick={() => setIsSelfPost(true)}>Self Post</Button>
      </div>

      <div className="">
        {!isSelfPost ? (
          <SubmitPostForm params={params} />
        ) : (
          <SubmitSelfPostForm params={params} />
        )}
      </div>
    </div>
  );
}
