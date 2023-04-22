import { deleteThread } from "../../lib/db/database";

export default async function createPost(req, res) {
  const { threadId } = req.body;
  if (threadId) {
    const resultThreadDelete = await deleteThread(threadId);
    res.status(200).json({ resultThreadDelete });
  } else {
    res.status(400).json({ error: "Invalid Input, No Post Deleted" });
  }
}
