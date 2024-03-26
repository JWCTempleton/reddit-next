import { fetchPost } from "@/app/lib/data";
import PostCard from "@/app/ui/Post/PostCard";

export default async function Page({
  params,
}: {
  params: { forum_name: string; post_id: string };
}) {
  const postID = params.post_id;
  const forumName = params.forum_name;

  const post = await fetchPost(postID);

  return (
    <div className="px-4">
      <h1 className="text-xl bold pt-4">{forumName}</h1>

      {post.map((p) => {
        return (
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
        );
      })}
    </div>
  );
}
