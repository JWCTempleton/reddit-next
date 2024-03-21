export default async function Page({
  params,
}: {
  params: { post_id: string };
}) {
  const postID = params.post_id;
  return <div>{postID}</div>;
}
