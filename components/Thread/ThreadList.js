import {
  CalendarDaysIcon,
  UserCircleIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/outline";
import PostList from "../Post/PostList";
import Post from "../Post/Post";

export default function ThreadList({ threadData, postData, loginStatus }) {
  return (
    <div className="mx-auto max-w-7xl py-8 px-4 sm:px-6 lg:px-4">
      <div className="grid grid-cols-12">
        <h1 className="font-extrabold col-span-12 outline outline-offset-2 outline-1 leading-tight py-8 px-2 md:text-6xl text-4xl mt-0 mb-2 pb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-red-500 text-center">
          {threadData.title}
        </h1>
        <div className="col-span-12">
          <div>
            <p className="flex text-1xl font-bold tracking-tight text-red-500 dark:text-red-400 pt-1">
              <UserCircleIcon className="h-6 w-6 text-red-600" />
              {"   "}&nbsp;&nbsp;Double Burger With Cheese
            </p>
          </div>
          <div>
            <p className="flex text-1xl font-bold tracking-tight text-red-500 dark:text-red-800 pt-1">
              <CalendarDaysIcon className="h-6 w-6 text-red-600" />
              {"   "}&nbsp;&nbsp;{threadData.publishedAt}
            </p>
          </div>
        </div>
        <div className="col-span-12">
          <div className="pb-4">
            <p className="flex justify-end text-1xl font-bold tracking-tight text-red-500 dark:text-stone-800 pt-1">
              <ChatBubbleBottomCenterTextIcon className="h-6 w-6 text-stone-400" />
              {"   "}&nbsp;&nbsp;{postData.length} replies by 2 contributors
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
