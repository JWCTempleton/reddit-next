import Link from "next/link";
import { fetchDefaultForums } from "../lib/data";
import { auth, getUser, signOut } from "@/auth";

export default async function NavBar() {
  const loggedInUser = await auth();

  const userEmail = loggedInUser?.user?.email?.toString();
  const user = await getUser(userEmail);

  const forums = await fetchDefaultForums();
  return (
    <nav className="flex flex-col w-[100vw] px-4">
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
                href={`/t/${t.forum_name}`}
              >
                {t.forum_name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        {loggedInUser ? (
          <div className="flex justify-between pt-4 items-end">
            <h1 className="text-3xl bold">Tronnit</h1>
            <div className="flex">
              <span className="pr-3">
                Welcome,{" "}
                <Link
                  className={
                    "text-blue-500 hover:text-blue-800 hover:underline"
                  }
                  href={`/user/${user.username}`}
                >
                  {user.username}
                </Link>
              </span>

              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <button
                  className={"text-red-400 hover:text-red-600 hover:underline"}
                >
                  Sign Out
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="flex justify-between pt-4">
            <h1 className="text-xl bold">Tronnit</h1>
            <div className="">
              <Link
                href={"/login"}
                className="text-blue-500 hover:text-blue-800 hover:underline"
              >
                Login
              </Link>
              <span className="px-3"> or </span>
              <Link
                href={"/signup"}
                className="text-blue-500 hover:text-blue-800 hover:underline"
              >
                Signup
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
