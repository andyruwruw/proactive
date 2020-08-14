import { NowRequest } from '@vercel/node';
import * as jwt from 'jsonwebtoken';

import * as models from '../models/index.js';

const User = models.default.User.default;

// Generate a token
export const generateToken = (data: object, expires: any) => {
  return jwt.sign(data, process.env.SERVER_SECRET, {
    expiresIn: expires
  });
};

export const verifyToken = async (req: NowRequest) => {
  const token = req.cookies['proactive-token'];
  if (!token) {
    return null;
  }
  try {
    const decoded = jwt.verify(token, process.env.SERVER_SECRET);
    if ('id' in decoded) {
      let existingUser = await User.findOne({
        _id: decoded.id,
      });
      return existingUser;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const removeOldTokens = (tokens: Array<String>) => {
  return tokens.filter(token => {
    try {
      jwt.verify(token, process.env.SERVER_SECRET);
      return true;
    } catch (error) {
      return false;
    }
  });
}

export const login = async (user, res, connection) => {
  let token = generateToken({
    id: user._id,
  }, "24h");

  user.removeOldTokens();
  user.addToken(token);
  await user.save();

  res.setHeader('Set-Cookie', [`proactive-token=${token}; SameSite=Strict`]);
  connection.close();
  return res.status(200).send(user);
}
