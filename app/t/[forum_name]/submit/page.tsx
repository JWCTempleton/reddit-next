export default function Page({ params }: { params: { forum_name: string } }) {
  const forumName = params.forum_name;
  return (
    <div>
      <h1>Submit {forumName}</h1>
    </div>
  );
}
