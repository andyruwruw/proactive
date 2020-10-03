import { NowRequest, NowResponse } from '@vercel/node';
import { connection } from 'mongoose';

import { connectDB } from '../utils/db';
connectDB();

import { User } from '../models';
import { register } from '../utils/auth';

export default async function (req: NowRequest, res: NowResponse) {
  try {
    const existingUser = await User.findOne({
      username: req.body.username
    });

    if (existingUser) {
      return res.status(400).send('Username taken');
    }

    let user = new User({
      username: req.body.username,
      password: req.body.password,
    });

    await user.save();

    return await register(user, res, connection);
  } catch (error) {
    connection.close();
    return res.status(502).send(error);
  }
}