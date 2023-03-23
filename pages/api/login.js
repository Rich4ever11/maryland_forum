import { authUser } from "../../lib/db/database";
import jwt from "jsonwebtoken";

/* JWT secret key */
const KEY = process.env.NEXT_PUBLIC_JWT_KEY;

export default async function Login(req, res) {
  const { email, password } = req.body;
  if (req.method === "POST") {
    const result = await authUser(email, password);
    if (result.length) {
      const payload = {
        id: result[0].userId,
        email: result[0].email,
        createdAt: result[0].registeredAt,
      };
      /* Sign token */
      jwt.sign(
        payload,
        KEY,
        {
          expiresIn: 86400, // 24 hours in a year seconds
        },
        (err, token) => {
          /* Send succes with token */
          res.status(200).json({
            data: {
              loginStatus: true,
              jwtStatus: true,
              token: "Bearer " + token,
              fullReturnVal: result,
            },
          });
        }
      );
    } else {
      res.status(200).json({
        data: {
          loginStatus: false,
          fullReturnVal: result,
          error: "Password incorrect",
        },
      });
    }
  } else {
    res.status(400).json({ error: "Invalid Input, Login Failed" });
  }
}
