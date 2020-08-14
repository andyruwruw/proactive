import { NowRequest, NowResponse } from '@vercel/node';

export default async function (req: NowRequest, res: NowResponse) {
  try {
    res.setHeader('Set-Cookie', [`proactive-token=; SameSite=Strict`]);
    return res.status(200).send(true);
  } catch (error) {
    return res.status(502).send(error);
  }
};
