import { NextApiRequest, NextApiResponse } from "next";

const handle = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { userid, password }: any = req.body;

    if (userid === "admin" && password === "password") {
      res.status(200).json({ token: "AUTHENTICATEDTOKEN"});
    } else {
      res.status(401).json({ message: "Unauthorized"});
    }
  } else {
    res.end("With great power comes great responsibility.");
  }
};

export default handle;
