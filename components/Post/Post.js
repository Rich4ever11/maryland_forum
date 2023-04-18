import {
  BarsArrowUpIcon,
  TrashIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { useState } from "react";
import { formatDate, formatSignUpDate } from "../../lib/helperFunctions";

export default function Post({
  id,
  postIndex,
  text,
  publishedAt,
  creatorId,
  editStatus,
  postCreation,
  threadId,
  loggedUserId,
  creatorUsername,
  creatorRegisteredAt,
  creatorMessageCount,
}) {
  const [toggleEdit, setToggleEdit] = useState(false);
  const [userPost, setUserPost] = useState("");
  const [userEdit, setUserEdit] = useState(text);
  const router = useRouter();

  function enableEdit() {
    setToggleEdit(!toggleEdit);
  }

  async function editPost() {
    await fetch("http://localhost:3000/api/editPost", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        postData: { postId: id, postEdit: userEdit },
      }),
    });
    await router.reload(window.location.pathname);
  }

  async function deletePost() {
    await fetch("http://localhost:3000/api/deletePost", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        postId: id,
      }),
    });
    await router.reload(window.location.pathname);
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
    await router.reload(window.location.pathname);
  }

  return (
    <div>
      <div className="lg:max-w-full lg:flex">
        <div className="my-4 grid grid-cols-12 backdrop-blur-sm bg-red-50 rounded-xl background: rgba(255, 255, 255, 0.22); border-radius: 16px; box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); backdrop-filter: blur(4.1px); -webkit-backdrop-filter: blur(4.1px); border: 1px solid rgba(255, 255, 255, 0.15);">
          <div className="flex flex-wrap justify-center sm:col-span-2 col-span-4">
            <div className="w-100 p-4">
              <img
                src="\static\marylandPerson.png"
                alt="..."
                className="shadow rounded-full max-w-full h-auto align-middle border-none"
              />
              <div className="text-red-400 font-bold text-xl mb-2 align-middle text-center">
                {creatorUsername}
              </div>
              <div className="text-xs text-center">
                <p>
                  Joined: {formatSignUpDate(creatorRegisteredAt) || "Unknown"}
                </p>{" "}
                <p>Messages: {creatorMessageCount}</p>
              </div>
            </div>
          </div>
          <div className="mb-8 sm:col-span-10 col-span-8 py-4">
            <div className="mb-8 divide-y-2 divide-red-200 divide-opacity-25">
              <div className=" text-gray-900 text-xs mb-2">
                {formatDate(publishedAt) || "Unknown"}{" "}
              </div>
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
              ) : toggleEdit ? (
                <div className="mt-2">
                  <textarea
                    id="edit"
                    name="editText"
                    rows="3"
                    className="mt-1 p-4 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                    onChange={(e) => setUserEdit(e.target.value)}
                    value={userEdit}
                  ></textarea>
                  <button
                    className="my-2 bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={editPost}
                  >
                    Submit Edit
                  </button>
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
                    className=" text-white bg-amber-700 hover:bg-amber-800 focus:outline-none focus:ring-4 focus:ring-amber-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-rose-800col-span-2"
                    onClick={createNewPost}
                  >
                    <BarsArrowUpIcon height={25} /> Post
                  </button>
                </div>
              </div>
            ) : (
              <></>
            )}
            {loggedUserId === creatorId ? (
              <div>
                {postIndex !== 0 ? (
                  <div className="grid grid-cols-12">
                    <div className="md:col-span-1 sm:col-span-2 col-span-4 align-middle">
                      <button
                        className=" text-white bg-red-600 hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-400 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-red-600 dark:hover:bg-red-600 dark:focus:ring-rose-800col-span-2"
                        onClick={deletePost}
                      >
                        <TrashIcon height={25} /> End
                      </button>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                <div className="grid grid-cols-12">
                  <div className="md:col-span-1 sm:col-span-2 col-span-4 align-middle">
                    <button
                      className=" text-white bg-indigo-400 hover:bg-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-200 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-indigo-400 dark:hover:bg-indigo-400 dark:focus:ring-rose-800col-span-2"
                      onClick={enableEdit}
                    >
                      <PencilSquareIcon height={25} /> Edit
                    </button>
                  </div>
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
