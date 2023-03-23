import { createNewThread, createNewPost } from "../../lib/db/database";

export default async function createThread(req, res) {
  const { threadData, postData } = req.body;
  if (threadData && postData) {
    const resultThreadData = await createNewThread(threadData);
    const resultPostData = await createNewPost(
      postData,
      resultThreadData[0].insertId
    );
    res.status(200).json({ resultThreadData, resultPostData });
  } else {
    res.status(400).json({ error: "Invalid Input, No Thread Created" });
  }
}
