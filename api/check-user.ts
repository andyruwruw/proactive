import { NowRequest, NowResponse } from '@vercel/node';
import { connect, connection } from 'mongoose';

import { verifyToken } from '../utils/auth';

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
    let user = await verifyToken(req);
    connection.close();
    return res.send(user);
  } catch (error) {
    connection.close();
    return res.status(502).send(error);
  }
};
