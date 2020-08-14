import { NowRequest, NowResponse } from '@vercel/node';
import { connect } from 'mongoose';

const {
  MONGO_USER,
  MONGO_PASSWORD,
} = process.env;

connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.oj6kf.mongodb.net/proactive?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default async function (req: NowRequest, res: NowResponse) {
  return res.status(200).send('Hello');
}