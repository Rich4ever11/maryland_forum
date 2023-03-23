import NavBar from "@/components/NavBar/NavBar";
import ThreadList from "@/components/Thread/ThreadList";
import { useRouter } from "next/router";

import { getAppCookies, verifyToken, setLogout } from "../../utils/middleware";
import { useEffect, useState } from "react";

export async function getServerSideProps(context) {
  const { req } = context;
  const { token } = getAppCookies(req);
  const tokenStatus = token ? verifyToken(token.split(" ")[1]) : "";
  const { threadId } = context?.query;
  const res = await fetch(
    `http://localhost:3000/api/posts?threadId=${threadId}`
  );
  const threadPost = await res.json();
  if (threadPost.error) {
    return {
      notFound: true,
    };
  }
  const threadPostData = threadPost.data;
  return {
    props: {
      tokenStatus,
      threadPostData,
    },
  };
}

export default function Thread({ tokenStatus, threadPostData }) {
  const router = useRouter();
  const { threadId } = router?.query;

  return (
    <>
      <NavBar loginStatus={tokenStatus.id} />
      <ThreadList
        threadData={threadPostData.threadData}
        postData={threadPostData.postData}
        loginStatus={tokenStatus}
      />
    </>
  );
}
