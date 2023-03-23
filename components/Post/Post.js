import { BarsArrowUpIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Post({
  id,
  text,
  publishedAt,
  creatorId,
  editStatus,
  postCreation,
  threadId,
}) {
  const [toggleEdit, setToggleEdit] = useState(false);
  const [userPost, setUserPost] = useState("");
  const router = useRouter();

  function enableEdit() {
    setToggleEdit(!toggleEdit);
  }

  async function createNewPost() {
    await fetch("http://localhost:3000/api/createPost", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        postData: { text: userPost, creatorId },
        threadId,
      }),
    });
    setUserPost("");
    await router.push(`/thread/${threadId}`);
  }

  return (
    <div>
      <div className="lg:max-w-full lg:flex">
        <div className="my-4 grid grid-cols-12 backdrop-blur-sm bg-red-50 rounded-xl background: rgba(255, 255, 255, 0.22); border-radius: 16px; box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); backdrop-filter: blur(4.1px); -webkit-backdrop-filter: blur(4.1px); border: 1px solid rgba(255, 255, 255, 0.15);">
          <div className="flex flex-wrap justify-center sm:col-span-2 col-span-4">
            <div className="w-100 p-4">
              <img
                src="https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-2-800x800.jpg"
                alt="..."
                className="shadow rounded-full max-w-full h-auto align-middle border-none"
              />
              <div className="text-red-400 font-bold text-xl mb-2 align-middle text-center">
                {creatorId}
              </div>
              <div className="text-xs text-center">
                <p>Joined: Mar 11, 2022</p> <p>Messages: 609</p>
              </div>
            </div>
          </div>
          <div className="mb-8 sm:col-span-10 col-span-8 py-4">
            <div className="mb-8 divide-y-2 divide-red-200 divide-opacity-25">
              <div className=" text-gray-900 text-xs mb-2">{publishedAt} </div>
              {editStatus ? (
                <div className="mt-2">
                  <textarea
                    id="edit"
                    name="editText"
                    rows="3"
                    className="mt-1 p-4 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                    onChange={(e) => setUserPost(e.target.value)}
                    value={userPost}
                  ></textarea>
                </div>
              ) : (
                <div>
                  <p className="text-gray-700 text-base p-4">{text}</p>
                </div>
              )}
            </div>
            {postCreation ? (
              <div className="grid grid-cols-12">
                <div className="md:col-span-1 sm:col-span-2 col-span-4 align-middle">
                  <button
                    className=" text-white bg-rose-700 hover:bg-rose-800 focus:outline-none focus:ring-4 focus:ring-rose-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800col-span-2"
                    onClick={createNewPost}
                  >
                    <BarsArrowUpIcon height={25} /> Post
                  </button>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
