import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

export default function validateMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // Set up validation rules
  const rules = [
    check('email', 'Invalid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
  ];

  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
}
