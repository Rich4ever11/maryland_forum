import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Forum from "./Forum";
import styles from "./ForumList.module.css";

export default function ForumList(props) {
  const { disabled, title, categoryId, forumId, enableThreadCreation } = props;
  const [threadData, setThreadData] = useState([]);
  useEffect(() => {
    async function getThreadData() {
      const response = await fetch(`/api/threads?forumId=${forumId}`);
      const data = await response.json();
      setThreadData(data.threadData);
    }
    getThreadData();
  }, []);

  return (
    <div>
      <div className="mx-auto max-w-7xl py-8 px-4 sm:px-6 lg:px-4 grid grid-cols-10">
        <div className="col-span-10">
          <div className={styles.heroImage}>
            <Image
              src="/static/girlTexting.png"
              width={520}
              height={500}
              alt={""}
            />
          </div>
          <h1 className="font-black leading-tight text-6xl mt-0 mb-2 text-transparent bg-clip-text bg-gradient-to-r from-stone-300 to-red-600 text-center">
            {disabled ? (
              <div>{title}</div>
            ) : (
              <Link href={`/category/${categoryId}/forum/${forumId}`}>
                {title}
              </Link>
            )}
            <div>
              {enableThreadCreation ? (
                <a
                  href={`/category/${categoryId}/forum/${forumId}/createthread`}
                  className="items-center justify-center rounded-md border border-transparent bg-red-400 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-600"
                >
                  Create Thread
                </a>
              ) : (
                <></>
              )}
            </div>
          </h1>
          {threadData.map((thread, index) => (
            <div className="p-2" key={index}>
              <Forum
                forumId={title}
                categoryId={categoryId}
                threadId={thread.threadId}
                title={thread.title}
                replies={11}
                latestPosterUsername={thread.username}
                latestPostDate={thread.publishedAt}
                authorUsername={thread.username}
                createDate={thread.publishedAt}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
