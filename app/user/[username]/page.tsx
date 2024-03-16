import { fetchUserPostsAndComments } from "@/app/lib/data";
import Link from "next/link";
const dayjs = require("dayjs");

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  const username = params.username;

  const data = await fetchUserPostsAndComments(username);
  console.log("POSTS AND COMMENTS", data);
  if (data.length === 0) {
    return (
      <div className="m-5">
        <h1 className="text-xl bold">{username}</h1>

        <p>...crickets</p>
      </div>
    );
  }

  return (
    <div className="m-5">
      <h1 className="text-xl bold">{username}</h1>

      <div>
        {data.map((d) => {
          if (d.type === "posts") {
            return (
              <div key={d.either_id} className="p-4">
                <p>
                  <Link
                    href="#"
                    className={"text-blue-500 hover:text-blue-800"}
                  >
                    <span>{d.post_title}</span>
                  </Link>{" "}
                  | {dayjs(d.created_at).format("MMM DD, YYYY")} by{" "}
                  <Link
                    href={`/user/${username}`}
                    className={"text-blue-500 hover:text-blue-800"}
                  >
                    {d.username}
                  </Link>
                </p>
              </div>
            );
          }
          return (
            <div key={d.either_id} className="p-4">
              <p>
                <Link href="#" className={"text-blue-500 hover:text-blue-800"}>
                  <span>{d.post_title}</span>
                </Link>{" "}
                | {dayjs(d.created_at).format("MMM DD, YYYY")} by{" "}
                <Link
                  href={`/user/${username}`}
                  className={"text-blue-500 hover:text-blue-800"}
                >
                  {d.username}
                </Link>{" "}
                in{" "}
                <Link
                  href={`/t/${d.forum_name}`}
                  className={"text-blue-500 hover:text-blue-800"}
                >
                  {d.forum_name}
                </Link>
              </p>

              <p>{d.post_comment}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// function DisplayPost(data: any) {
//    return <div key={data.either_id}>
//     <p>{data.post_title}</p>
//    </div>
//     }
// }
