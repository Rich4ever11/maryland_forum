import { getLatestRegisteredUsers } from "../../lib/db/database";

export default async function forums(req, res) {
  try {
    const latestUsers = await getLatestRegisteredUsers();
    res.status(200).json({ latestUsers });
  } catch {
    res.status(400).json({ error: "Failed To Obtain Data" });
  }
}
