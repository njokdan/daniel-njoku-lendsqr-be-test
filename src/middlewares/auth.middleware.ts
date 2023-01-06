import { Request, Response, NextFunction } from 'express';
import { verifyJWT } from '../utils/jwt.util';

export default function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  // Extract token from request header
  const token = req.headers['x-auth-token'];

  // Verify JWT
  try {
    verifyJWT(token, JWT_SECRET);
  } catch (err) {
    return res.status(401).json({ msg: 'Unauthorized' });
  }

  next();
}
