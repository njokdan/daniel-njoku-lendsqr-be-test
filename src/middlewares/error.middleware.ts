import { Request, Response, NextFunction } from 'express';

export default function errorMiddleware(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (err.name === 'ValidationError') {
    return res.status(400).json({ msg: err.message });
  }

  console.error(err.stack);
  res.status(500).json({ msg: 'Internal server error' });
}
