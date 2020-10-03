import { NowRequest, NowResponse } from '@vercel/node';
import { connection } from 'mongoose';

import { connectDB } from '../utils/db';
connectDB();

import { verifyToken } from '../utils/auth';

export default async function (req: NowRequest, res: NowResponse) {
  try {
    let user = await verifyToken(req);

    connection.close();
    return res.send(user);
  } catch (error) {
    connection.close();
    return res.status(502).send(error);
  }
};
