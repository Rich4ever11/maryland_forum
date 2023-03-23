import { createNewPost } from "../../lib/db/database";

export default async function createPost(req, res) {
  const { postData, threadId } = req.body;
  if (postData && threadId) {
    const resultPostData = await createNewPost(postData, threadId);
    res.status(200).json({ resultPostData });
  } else {
    res.status(400).json({ error: "Invalid Input, No Thread Created" });
  }
}
