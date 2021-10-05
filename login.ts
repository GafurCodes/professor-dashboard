// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from "next";
// import prisma from "../../../lib/prisma";
// import bcrypt from "bcrypt";

// interface Body {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
// }

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const body: Body = JSON.parse(JSON.stringify(req.body));

//   const user = await prisma.user.findFirst({ where: { email: body.email } });
//   const hash = user?.password;
//   const match = await bcrypt.compare(body.password, hash!);
//   if (match) {
//     res.send("logged in");
//   } else {
//     res.status(401).send("Incorrect credentials");
//   }
// }
