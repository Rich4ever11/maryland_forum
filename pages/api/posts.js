import { getPostsAndCurrThread } from "../../lib/db/database";

export default async function threads(req, res) {
  const { threadId } = req.query;
  if (threadId) {
    const data = await getPostsAndCurrThread(threadId);
    if (data === []) {
      res.status(400).json({ error: "Thread and Posts Not Found" });
    }
    res.status(200).json({ data });
  } else {
    res
      .status(400)
      .json({
        error: "Invalid Input, No Posts or Thread Identified and Returned",
      });
  }
}
