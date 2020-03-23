import { NextApiRequest, NextApiResponse } from "next";

const handle = (_req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ message: "logout"});
};

export default handle;
