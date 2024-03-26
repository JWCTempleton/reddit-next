"use client";
import {
  ExclamationCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "@/app/lib/actions";
import { Button } from "./Button";
import { useState } from "react";

// import Link from "next/link";

export default function SubmitPostForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <form action={dispatch} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className="mb-3 text-2xl text-blue-500 font-bold">
          Submit a new Post
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="title"
            >
              Title
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 text-sky-800"
                id="title"
                type="title"
                required
                name="title"
                placeholder="Title for Post"
              />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="url"
            >
              URL
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 text-sky-800"
                id="url"
                required
                name="url"
                placeholder="Enter URL for post"
                minLength={6}
              />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="content"
            >
              Content
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 text-sky-800"
                id="content"
                required
                name="content"
                placeholder="Enter content for post"
                minLength={6}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-around">
          {/* <SignUpButton /> */}
          {/* <LoginButton /> */}
          <button>Submit</button>
        </div>

        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}

// function LoginButton() {
//   const { pending } = useFormStatus();
//   return (
//     <Button className="mt-4 p-6 flex" aria-disabled={pending}>
//       Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
//     </Button>
//   );
// }

// function SignUpButton() {
//   return (
//     <Link href={"/signup"}>
//       <Button className="mt-4 p-6 w-auto transition-colors bg-green-600 active:bg-green-500 hover:bg-green-500 focus-visible:outline-green-500 ">
//         Sign Up <CheckCircleIcon className="ml-auto h-5 w-5 text-gray-50" />
//       </Button>
//     </Link>
//   );
// }
