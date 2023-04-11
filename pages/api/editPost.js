import { editPost } from "../../lib/db/database";

export default async function createPost(req, res) {
  const { postId, postEdit } = req.body.postData;
  if (postId && postEdit) {
    const resultPostData = await editPost(postId, postEdit);
    res.status(200).json({ resultPostData });
  } else {
    res.status(400).json({ error: "Invalid Input, No Post Deleted" });
  }
}
