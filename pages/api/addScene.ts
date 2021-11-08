import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

// type Data = {
//   name: string;
//   email: string;
// };

interface Body {
  email: string;
  sceneName: string;
  description: string;
  fireExtinguisher: boolean;
  interactivePeriodicTable: boolean;
  broom: boolean;
  eyeWashingStation: boolean;
  scales: boolean;
  fumeHood: boolean;
  flask: boolean;
  chemistrySet: boolean;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
  // <Data>
) {
  //   res.status(200).json({ name: "John Doe" });

  const body: Body = JSON.parse(JSON.stringify(req.body));

  const user = await prisma.user.findUnique({
    where: { email: body.email },
  });

  try {
    await prisma.scene.create({
      data: {
        userId: user!.id,
        name: body.sceneName,
        description: body.description,
        fireExtinguisher: body.fireExtinguisher,
        interactivePeriodicTable: body.interactivePeriodicTable,
        broom: body.broom,
        eyeWashingStation: body.eyeWashingStation,
        scales: body.scales,
        fumeHood: body.fumeHood,
        flask: body.flask,
        chemistrySet: body.chemistrySet,
      },
    });
    res.status(200).send("scene created");
  } catch (error) {
    res.send(error);
  }
}
