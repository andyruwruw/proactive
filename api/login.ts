import { NowRequest, NowResponse } from '@vercel/node';
import { connect, connection } from 'mongoose';

import * as models from '../models/index.js';
import { login } from '../utils/auth.js';

const User = models.default.User.default;

const {
  MONGO_USER,
  MONGO_PASSWORD,
} = process.env;

connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.oj6kf.mongodb.net/proactive?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default async function (req: NowRequest, res: NowResponse) {
  try {
    const existingUser = await User.findOne({
      username: req.body.username
    });

    if (!existingUser || !await existingUser.comparePassword(req.body.password)) {
      return res.status(400).send('Incorrect username or password...');
    }

    return await login(existingUser, res, connection);
  } catch (error) {
    connection.close();
    return res.status(502).send(error);
  }
}