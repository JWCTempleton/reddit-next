import { fetchForumPosts } from "@/app/lib/data";
import PostCard from "@/app/ui/Post/PostCard";

export default async function Page({
  params,
}: {
  params: { forum_name: string };
}) {
  const forumName = params.forum_name;
  const posts = await fetchForumPosts(forumName);

  return (
    <main className="flex flex-col px-4">
      <h1 className="text-xl bold pt-4">{forumName}</h1>
      <div>
        {posts.map((p) => {
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
    </main>
  );
}
