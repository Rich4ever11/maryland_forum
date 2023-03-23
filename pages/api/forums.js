import { getForumData } from "../../lib/db/database";

export default async function forums(req, res) {
  const { categoryId } = req.query;
  if (categoryId >= 1 && categoryId <= 7) {
    const forumData = await getForumData(categoryId);
    res.status(200).json({ forumData });
  } else if (categoryId === undefined) {
    const forumData = await getForumData();
    res.status(200).json({ forumData });
  } else {
    res.status(400).json({ error: "Invalid Category ID" });
  }
}
