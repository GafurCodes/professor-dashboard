import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";

interface Body {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body: Body = JSON.parse(JSON.stringify(req.body));
  await bcrypt.hash(body.password, 10, async (err, hash) => {
    if (err) {
      res.status(500).send("password hashing error");
    }

    try {
      await prisma.user.create({
        data: {
          firstName: body.firstName,
          lastName: body.lastName,
          email: body.email,
          password: hash,
        },
      });
      res.send("success");
    } catch (err) {
      res.status(500).send("Prisma couldn't save user");
    }
  });
}
