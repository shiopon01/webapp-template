import { NextApiRequest, NextApiResponse } from "next";

const handle = (req: NextApiRequest, res: NextApiResponse) => {
  const { authorization }: any = req.headers;

  if (authorization === "AUTHENTICATEDTOKEN") {
    res.status(200).json({ message: "Authorized" });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

export default handle;
