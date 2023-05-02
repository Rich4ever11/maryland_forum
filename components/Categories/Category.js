import Image from "next/image";
import Link from "next/link";
import styles from "./Categories.module.css";
import { useEffect, useState } from "react";
import { formatSignUpDate } from "../../lib/helperFunctions";

export default function Category(props) {
  const {
    categoryId,
    title,
    description,
    sections = [],
    threadCount,
    messageCount,
    userProfilePic,
    imgUrl,
  } = props;
  const [latestPost, setLatestPost] = useState("");

  useEffect(() => {
    async function getLatestPost() {
      let forumIDList = [];
      sections.map((section) => {
        forumIDList.push(section.forumId);
      });
      const response = await fetch(`/api/latestPost`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sections: forumIDList,
        }),
      });
      const data = await response.json();
      setLatestPost(data["latestUsers"]);
    }
    getLatestPost();
  }, []);

  return (
    <div className="grid sm:grid-cols-12 max-[500]:grid-cols-4 backdrop-blur-sm bg-red-50 rounded-xl background: rgba(255, 255, 255, 0.22); border-radius: 16px; box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); backdrop-filter: blur(4.1px); -webkit-backdrop-filter: blur(4.1px); border: 1px solid rgba(255, 255, 255, 0.15);">
      <div className="max-[500]:col-span-2">
        <Image className="p-4" src={imgUrl} height={100} width={100} />
      </div>

      <div className="sm:col-span-6 max-[500]:col-span-1 pl-2">
        <strong>
          <div className="text-1xl font-normal tracking-tight text-red-500 dark:text-red-400 pt-1">
            <Link href={`/category/${categoryId}`}>{title}</Link>
          </div>
        </strong>
        <div className="py-1">{description}</div>
        <div
          className="flex max-w-[400]:invisible py-1 text-sm font-bold tracking-tight text-gray-900"
          id={styles.sectionLinks}
        >
          {sections.map((section, index) => (
            <div key={index} className="inline-block">
              <Image
                className="p-1 inline-block"
                src="/static/comment.png"
                height={25}
                width={25}
              />
              <div className="p-1 inline-block">
                <Link href={`/category/${categoryId}/forum/${section.forumId}`}>
                  {section.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="flex invisible p-3 lg:visible col-span-2"
        id={styles.metric}
      >
        <div className="p-2 text-center">
          Threads{" "}
          <div className="flex text-red-700 dark:text-red-800">
            {threadCount}
          </div>
        </div>{" "}
        <div className="p-2 text-center">
          Messages{" "}
          <div className="flex text-red-700 dark:text-red-800">
            {messageCount}
          </div>
        </div>
      </div>

      <div className="flex p-3 col-span-3 md:content-right">
        <div className="rounded-full">
          <img
            className="rounded-full shadow align-middle border-none p-2"
            src={userProfilePic}
            width={100}
            height={10}
          />
        </div>
        <div className="p-3">
          <div className="text-xs py-1">
            {latestPost?.text?.split(" ").slice(0, 4).join(" ") + "..." ||
              "N/A"}
          </div>
          <div className="text-xs py-1">
            {formatSignUpDate(latestPost?.publishedAt) || "N/A"} :{" "}
            {latestPost?.username || "N/A"}
          </div>
        </div>
      </div>
    </div>
  );
}
