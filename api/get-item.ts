import { NowRequest, NowResponse } from '@vercel/node';
import { connect } from 'mongoose';

import * as models from '../models/index.js';
import { verifyToken } from '../utils/auth.js';

const User = models.default.User.default;
const Item = models.default.Item.default;

const {
  MONGO_USER,
  MONGO_PASSWORD,
} = process.env;

connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.oj6kf.mongodb.net/proactive?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default async function (req: NowRequest, res: NowResponse) {
  const user = await verifyToken(req);

  const exampleItem = await Item.findById(req.query.id);
  console.log(exampleItem);

  const item = await Item.findOne({
    _id: req.query.id,
    user: user,
  });
  return res.status(200).send(item);
}