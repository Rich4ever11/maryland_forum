import { getThreadData } from "../../lib/db/database";

export default async function threads(req, res) {
  const { forumId, threadId } = req.query;
  if (forumId || threadId) {
    const threadData = await getThreadData(forumId, threadId);
    // const author = await getThreadAuthor()
    // const latestPosterInfo = await getLatestPortThread()
    if (threadData === []) {
      res.status(400).json({ error: "Thread Not Found" });
    }
    res.status(200).json({ threadData });
  } else {
    res
      .status(400)
      .json({ error: "Invalid Input, No Thread Identified and Returned" });
  }
}
