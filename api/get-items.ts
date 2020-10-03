import { NowRequest, NowResponse } from '@vercel/node';
import { connection } from 'mongoose';

import { connectDB } from '../utils/db';
connectDB();

import { Item } from '../models';
import { verifyToken } from '../utils/auth';

export default async function (req: NowRequest, res: NowResponse) {
  let user = await verifyToken(req);

  let items = await Item.find({
    user,
  });

  connection.close();
  return res.status(200).send(items);
}