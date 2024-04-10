import { fetchPost } from "@/app/lib/data";
import { CreateComment } from "@/app/ui/Comments/CreateComment";
import { DisplayReplies } from "@/app/ui/Comments/DisplayReplies";
import PostCard from "@/app/ui/Post/PostCard";

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
              <CreateComment postID={postID} forumName={forumName} />
            </div>
          );
        }
      )}
      {commentData.map(
        (c: {
          id: any;
          comment?: string;
          replies?: any[];
          username?: string;
          created_at?: any;
        }) => {
          return (
            <div key={c.id}>
              <DisplayReplies
                forumName={forumName}
                postID={postID}
                id={c.id}
                comment={c.comment}
                replies={c.replies || undefined}
                username={c.username}
                created_at={c.created_at}
              />
            </div>
          );
        }
      )}
    </div>
  );
}
