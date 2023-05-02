import NavBar from "@/components/NavBar/NavBar";
import { useRouter } from "next/router";
import { getAppCookies, verifyToken } from "../../../../../utils/middleware";
import { useEffect, useState } from "react";

export async function getServerSideProps(context) {
  const { req } = context;
  const { token } = getAppCookies(req);
  const tokenStatus = token ? verifyToken(token.split(" ")[1]) : "";
  const { forumId, categoryId } = context?.query;
  const res = await fetch(
    `http://localhost:3000/api/forums?categoryId=${categoryId}`
  );
  const forums = await res.json();
  if (forums.error) {
    return {
      notFound: true,
    };
  }
  const forumData = forums.forumData.forumDataList.filter((forum) => {
    return forum.forumId == forumId;
  });
  return {
    props: {
      tokenStatus,
      categoryInfo: { name: forums.forumData.categoryName[0].name, categoryId },
      forumData: { name: forumData[0].name, forumId },
    },
  };
}

export default function CreateThread({ tokenStatus, categoryInfo, forumData }) {
  const [threadTitle, setThreadTitle] = useState("");
  const [postText, setPostText] = useState("");
  const router = useRouter();

  async function createNewThread(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/createThread", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        threadData: {
          lastPostId: tokenStatus.id,
          title: threadTitle,
          creatorId: tokenStatus.id,
          forumId: forumData.forumId,
        },
        postData: { text: postText, creatorId: tokenStatus.id },
      }),
    });
    const data = await response.json();
    const threadId = data.resultThreadData[0].insertId;
    router.push(`/thread/${threadId}`);
  }

  return (
    <>
      <NavBar loginStatus={tokenStatus} />
      <h1 className="font-black outline outline-offset-2 outline-1 leading-tight md:text-8xl text-7xl mt-0 mb-2 pb-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-red-600 text-center">
        Create Thread
      </h1>
      <h1 className="font-black leading-tight md:text-7xl text-6xl pb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-red-500 text-center">
        {categoryInfo.name}
      </h1>
      <h1 className="font-black leading-tight md:text-6xl text-5xl pb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-red-500 text-center">
        {forumData.name}
      </h1>
      <div>
        <div>
          <div className="mx-10">
            <div className="mt-5 md:col-span-2 md:mt-0 ">
              <form action="#" method="POST">
                <div className="shadow sm:overflow-hidden sm:rounded-md">
                  <div className="space-y-6 bg-rose-50 px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-3 gap-6">
                      <div className="col-span-3 sm:col-span-2">
                        <div className="mb-4">
                          <label className="font-thin outline outline-offset-2 outline-1 leading-tight md:text-5xl text-3xl mt-0 mb-2 pb-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-red-600 text-center">
                            Create Your Thread Here
                          </label>
                        </div>
                        <div className="mt-2 flex rounded-md shadow-sm">
                          <span className="font-light leading-tight inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-red-900 sm:text-xl">
                            Thread Title
                          </span>
                          <input
                            type="text"
                            name="company-website"
                            id="company-website"
                            className="block w-full flex-1 rounded-none rounded-r-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                            placeholder="Maryland Thread Title"
                            onChange={(e) => {
                              setThreadTitle(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <span className="font-light leading-tight border-gray-300 px-3 text-red-900  text-3xl">
                        Thread Post
                      </span>
                      <div className="mt-2">
                        <textarea
                          id="postText"
                          name="postText"
                          rows="3"
                          className="mt-1 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:p-1.5 sm:text-sm sm:leading-6"
                          onChange={(e) => {
                            setPostText(e.target.value);
                          }}
                        ></textarea>
                      </div>
                      <p className="mt-2 text-sm text-red-900">
                        Please place the initial post text here
                      </p>
                    </div>
                  </div>
                  <div className="bg-red-100 px-4 py-3 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md bg-red-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                      onClick={createNewThread}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
