// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getCategoryData } from "../../lib/db/database";

export default async function categories(req, res) {
  const categories = await getCategoryData();
  if (categories) {
    res.status(200).json({ categories });
  } else {
    res.status(200).json({ error: "Failed to Obtain Categories Data" });
  }
}
