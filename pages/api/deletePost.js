import { deletePost } from "../../lib/db/database";

export default async function createPost(req, res) {
  const { postId } = req.body;
  if (postId) {
    const resultPostData = await deletePost(postId);
    res.status(200).json({ resultPostData });
  } else {
    res.status(400).json({ error: "Invalid Input, No Post Deleted" });
  }
}
