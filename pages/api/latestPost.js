import { getLatestPost } from "../../lib/db/database";

export default async function forums(req, res) {
  const { sections } = req.body;
  try {
    const latestUsers = await getLatestPost(sections);
    res.status(200).json({ latestUsers });
  } catch {
    res.status(400).json({ error: "Failed To Obtain Data" });
  }
}
