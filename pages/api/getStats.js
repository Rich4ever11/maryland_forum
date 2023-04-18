import { getForumStats } from "../../lib/db/database";

export default async function forums(req, res) {
  try {
    const forumStats = await getForumStats();
    res.status(200).json({ forumStats });
  } catch {
    res.status(400).json({ error: "Failed To Obtain Data" });
  }
}
