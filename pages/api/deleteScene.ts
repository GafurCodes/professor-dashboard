import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sceneId = req.body.sceneId;
  await prisma.scene.delete({
    where: {
      id: sceneId,
    },
  });
}
