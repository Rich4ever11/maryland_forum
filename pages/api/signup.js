import { signUpUser } from "../../lib/db/database";
const fs = require("fs");

export default async function signUp(req, res) {
  const { username, email, name, avatar, password } = req.body;
  console.log({ avatar });
  if (req.method === "POST") {
    //Used for avatar upload
    // fs.createWriteStream(`../../uploads/${avatar.fileName}`).write(
    //   avatar.buffer
    // );
    // fs.createWriteStream(`../../uploads/${avatar.fileName}`).write(
    //   avatar.byteArray
    // );
    const result = await signUpUser(username, email, name, avatar, password);

    if (result) {
      res.status(200).json({
        data: {
          result: "User Was Successfully Created",
          fullReturnVal: result,
        },
      });
    }
  } else {
    res.status(400).json({ error: "Invalid Input, Sign Up Failed" });
  }
}
