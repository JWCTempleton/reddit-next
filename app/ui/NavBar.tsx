import Link from "next/link";
import { fetchDefaultForums } from "../lib/data";
import { auth, getUser, signOut } from "@/auth";

export default async function NavBar() {
  const loggedInUser = await auth();
  console.log("basic", loggedInUser);

  const userEmail = loggedInUser?.user?.email?.toString();
  const user = await getUser(userEmail);
  console.log("USER", user);

  const forums = await fetchDefaultForums();
  return (
    <nav className="flex justify-between w-[100vw] px-4">
      <div>
        <ul className="flex space-x-4">
          <li>
            <Link className={"text-blue-500 hover:text-blue-800"} href="/">
              Home
            </Link>
          </li>
          {forums.map((t) => (
            <li key={t.id}>
              <Link
                className={"text-blue-500 hover:text-blue-800"}
                href={`${t.forum_name}`}
              >
                {t.forum_name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {loggedInUser && (
        <div className="flex">
          <span className="px-3">Welcome, {user.username}</span>

          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button>Sign Out</button>
          </form>
        </div>
      )}
    </nav>
  );
}
