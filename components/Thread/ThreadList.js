import {
  CalendarDaysIcon,
  UserCircleIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/outline";
import PostList from "../Post/PostList";
import Post from "../Post/Post";
import { formatDate, formatSignUpDate } from "../../lib/helperFunctions";

export default function ThreadList({ threadData, postData, loginStatus }) {
  async function deleteThread() {
    alert("Thread Deleted");
  }

  async function editThread() {
    alert("Thread Edited");
  }

  return (
    <div className="mx-auto max-w-7xl py-8 px-4 sm:px-6 lg:px-4">
      <div className="grid grid-cols-12">
        <h1 className="font-extrabold col-span-12 outline outline-offset-2 outline-1 leading-tight py-8 px-2 md:text-6xl text-4xl mt-0 mb-2 pb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-red-500 text-center">
          {threadData?.title || "Unknown"}
        </h1>
        <div className="col-span-12">
          <div>
            <p className="flex text-1xl font-bold tracking-tight text-red-500 dark:text-red-400 pt-1">
              <UserCircleIcon className="h-6 w-6 text-red-600" />
              {"   "}&nbsp;&nbsp;{threadData?.creatorUsername || "Unknown"}
            </p>
          </div>
          <div>
            <p className="flex text-1xl font-bold tracking-tight text-red-500 dark:text-red-800 pt-1">
              <CalendarDaysIcon className="h-6 w-6 text-red-600" />
              {"   "}&nbsp;&nbsp;
              {formatDate(threadData?.publishedAt) || "Unknown"}
            </p>
          </div>
          {loginStatus.id === threadData.creatorId ? (
            <div>
              <button
                className="my-2 bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded"
                onClick={editThread}
              >
                Edit Thread
              </button>
              <button
                className="m-2 bg-rose-700 hover:bg-rose-900 text-white font-bold py-2 px-4 rounded"
                onClick={deleteThread}
              >
                Delete Thread
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="col-span-12">
          <div className="pb-4">
            <p className="flex justify-end text-1xl font-bold tracking-tight text-red-500 dark:text-stone-800 pt-1">
              <ChatBubbleBottomCenterTextIcon className="h-6 w-6 text-stone-400" />
              {"   "}&nbsp;&nbsp;{postData?.length || 0} replies by{" "}
              {threadData?.contributors.length} contributors
            </p>
          </div>
          <PostList postData={postData} currentLoggedInUser={loginStatus.id} />
          {loginStatus ? (
            <>
              <Post
                creatorId={loginStatus.id}
                editStatus={true}
                postCreation={true}
                threadId={threadData.threadId}
              />
            </>
          ) : (
            <div className="col-span-12 text-center place-items-center flex justify-center">
              {" "}
              <a
                href="/login"
                className="whitespace-nowrap text-base font-medium text-red-800 hover:text-red-900"
              >
                Sign in&nbsp;
              </a>
              to Post
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
