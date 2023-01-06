import express from 'express';
import { check, validationResult } from 'express-validator';
import { verifyJWT } from '../utils/jwt.util';
import { pool } from '../utils/db.util';
import { JWT_SECRET } from '../utils/constants';
import validateMiddleware from '../middlewares/validate.middleware';
import transferController from '../controllers/transfer.controller';

const router = express.Router();

// Validation middleware
const validate = (method) => {
  switch (method) {
    case 'transfer': {
      return [
        check('recipient', 'Please enter a valid recipient').isEmail(),
        check('amount', 'Please enter a valid amount').isNumeric()
      ]
    }
  }
}
// validate('transfer')
// POST /api/transfer
router.post('/', validateMiddleware, async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Extract recipient, amount, and token from request body
  const { recipient, amount, token } = req.body;

  // Verify JWT
  try {
    verifyJWT(token, JWT_SECRET);
  } catch (err) {
    return res.status(401).json({ msg: 'Unauthorized' });
  }

  // Check if recipient exists
  let [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [recipient]);
  if (rows.length === 0) {
    return res.status(400).json({ msg: 'Recipient does not exist' });
  }

  // Transfer funds
  await transferController.transferFunds(recipient, amount);
  res.json({ msg: 'Funds transferred successfully' });
});

export default router;
