"use client";
import {
  ExclamationCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { useFormState, useFormStatus } from "react-dom";
import { createLinkPost } from "@/app/lib/actions";
import { Button } from "./Button";
import { useState } from "react";

export default function SubmitPostForm({
  params,
}: {
  params: { forum_name: string };
}) {
  const forumName = params.forum_name;

  //   const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <form action={createLinkPost} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className="mb-3 text-2xl text-blue-500 font-bold">
          Submit a new Link Post
        </h1>
        <div className="text-slate-600 font-bold">
          <p>Please ensure you intend to submit a Link Post.</p>
          <p>Link posts must include a URL.</p>
          <p>
            If you want to submit a Self Post please click the Self Post button
            above.
          </p>
        </div>
        <div className="w-full">
          <div>
            <input id="forum" name="forum" value={forumName} readOnly hidden />
          </div>
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
              <textarea
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 text-sky-800"
                id="content"
                required
                name="content"
                rows={6}
                placeholder="Enter content for post"
                minLength={6}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-around">
          {/* <SignUpButton /> */}
          {/* <LoginButton /> */}
          <Button>Submit</Button>
        </div>

        {/* <div
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
        </div> */}
      </div>
    </form>
  );
}
