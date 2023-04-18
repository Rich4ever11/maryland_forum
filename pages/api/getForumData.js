import { getThreadForumPostData } from "../../lib/db/database";

export default async function forums(req, res) {
  const { threadId } = req.body;
  try {
    const resultData = await getThreadForumPostData(threadId);
    res.status(200).json({ resultData });
  } catch {
    res.status(400).json({ error: "Failed To Obtain Data" });
  }
}
