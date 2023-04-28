import { checkUsername } from "../../lib/db/database";

export default async function forums(req, res) {
  const { username } = req.body;
  try {
    const usernameFound = await checkUsername(username);
    res.status(200).json({ usernameFound });
  } catch {
    res.status(400).json({ error: "Failed To Obtain Data" });
  }
}
