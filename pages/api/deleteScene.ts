import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sceneId = req.body.sceneId;
  try {
    await prisma.scene.delete({
      where: {
        id: sceneId,
      },
    });
    res.status(200).send("scene deleted");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
}
