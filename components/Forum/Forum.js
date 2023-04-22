import Image from "next/image";
import styles from "./Forum.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { formatDate } from "../../lib/helperFunctions";

export default function Thread(props) {
  const [threadInfo, setThreadInfo] = useState({});
  const [latestPostText, setLatestPostText] = useState("");
  const {
    categoryId,
    forumId,
    threadId,
    id,
    title,
    replies,
    latestPosterUsername,
    latestPostDate,
    authorUsername,
    createDate,
  } = props;

  useEffect(() => {
    async function getForumCardData() {
      const response = await fetch(`/api/getForumData`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          threadId,
        }),
      });
      const data = await response.json();
      setThreadInfo(data["resultData"]);
    }
    getForumCardData();
  }, []);

  return (
    <>
      <div className="grid sm:grid-cols-12 max-[500]:grid-cols-4 backdrop-blur-sm bg-red-50 rounded-xl background: rgba(255, 255, 255, 0.22); border-radius: 16px; box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); backdrop-filter: blur(4.1px); -webkit-backdrop-filter: blur(4.1px); border: 1px solid rgba(255, 255, 255, 0.15);">
        <div className="max-[500]:col-span-6 col-span-6 grid grid-cols-12">
          <div className="col-span-2">
            <Image
              className="p-3"
              src="/static/comment.png"
              height={100}
              width={100}
            />
          </div>
          <div className="col-span-10 p-4">
            <div>
              <Link href={`/thread/${threadId}`} className=" text-red-700">
                {title}
              </Link>
            </div>
            <div>
              By {threadInfo["creatorUsername"]}
              <Link href="/" className=" text-red-700">
                {authorUsername}
              </Link>
              , {formatDate(createDate)}
            </div>
          </div>
        </div>

        <div
          className="sm:col-span-2 max-[500]:col-span-2 pl-2 text-center"
          id={styles.repliesSection}
        >
          <strong>
            <div className="text-1xl font-bold tracking-tight text-red-500 dark:text-red-800 pt-4">
              {threadInfo["replies"]} Replies
            </div>
          </strong>
        </div>

        <div className="flex justify-end p-3 col-span-4 right-0 content-right max-w-sm:col-span-6">
          <div className="rounded-full">
            <img
              className="rounded-full shadow align-middle border-none p-2"
              src="\static\marylandPerson.png"
              width={100}
              height={10}
            />
          </div>
          {threadInfo["latestPostData"] ? (
            <div className="p-3">
              <div className="text-medium py-1">
                {threadInfo["latestPostData"]?.postInfo["text"].slice(0, 25) +
                  "..."}
              </div>
              <div className="text-xs py-1">
                By {threadInfo["latestPostData"]?.creatorInfo["username"]},{" "}
                {formatDate(
                  threadInfo["latestPostData"]?.postInfo["publishedAt"]
                )}
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}
