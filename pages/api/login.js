import { authUser } from "../../lib/db/database";
import jwt from "jsonwebtoken";

/* JWT secret key */
const KEY = process.env.NEXT_PUBLIC_JWT_KEY;

export default async function Login(req, res) {
  const { email, password } = req.body;
  if (req.method === "POST") {
    return new Promise(async (resolve, reject) => {
      const result = await authUser(email, password);
      if (result.length) {
        const jwtPayload = {
          id: result[0].userId,
          username: result[0].username,
          createdAt: result[0].registeredAt,
        };
        //Sign token
        jwt.sign(
          jwtPayload,
          KEY,
          {
            expiresIn: 86400,
          },
          (err, token) => {
            //Send succes with token
            res
              .status(200)
              .json({
                data: {
                  loginStatus: true,
                  jwtStatus: true,
                  token: "Bearer " + token,
                  fullReturnVal: result,
                },
              })
              .end();
            resolve();
          }
        );
      } else {
        res
          .status(200)
          .json({
            data: {
              loginStatus: false,
              fullReturnVal: result,
              error: "Password incorrect",
            },
          })
          .end();
        resolve();
      }
    });
  } else {
    res.status(400).json({ error: "Invalid Input, Login Failed" }).end();
    resolve();
  }
}
