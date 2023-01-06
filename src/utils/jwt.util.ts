import jwt from 'jsonwebtoken';

export const signJWT = (payload: object, secret: string, options: object) => {
  return jwt.sign(payload, secret, options);
};

export const verifyJWT = (token: string, secret: string) => {
  return jwt.verify(token, secret);
};
