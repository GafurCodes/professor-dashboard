// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Scene } from ".prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

type Data = {
  scenes: Scene[];
};

interface Body {
  email: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const body: Body = JSON.parse(JSON.stringify(req.body));

  const user = await prisma.user.findUnique({
    where: { email: body.email },
    include: { scenes: true },
  });

  try {
    res.status(200).json({ scenes: user!.scenes });
  } catch (error) {
    console.log(error);
  }
}
