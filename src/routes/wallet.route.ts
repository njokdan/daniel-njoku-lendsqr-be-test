import express from 'express';
import { verifyJWT } from '../utils/jwt.util';
import { pool } from '../utils/db.util';
import { JWT_SECRET } from '../utils/constants';
// import authMiddleware from '../middleware/auth.middleware';
import walletController from '../controllers/wallet.controller';

const router = express.Router();
// authMiddleware,
// GET /api/wallet
router.get('/', async (req, res) => {
  // Extract token from request header
  const token = req.headers['x-auth-token'];

  // Verify JWT
  try {
    verifyJWT(token, JWT_SECRET);
  } catch (err) {
    return res.status(401).json({ msg: 'Unauthorized' });
  }

  // Get user's balance
  const balance = await walletController.getBalance(token);
  res.json({ balance });
});

// POST /api/wallet/deposit
router.post('/deposit', async (req, res) => {
  // Extract amount and token from request body
  const { amount, token } = req.body;

  // Verify JWT
  try {
    verifyJWT(token, JWT_SECRET);
  } catch (err) {
    return res.status(401).json({ msg: 'Unauthorized' });
  }

  // Deposit funds
  await walletController.depositFunds(amount, token);
  res.json({ msg: 'Funds deposited successfully' });
});

// POST /api/wallet/withdraw
router.post('/withdraw', async (req, res) => {
    // Extract amount and token from request body
    const { amount, token } = req.body;
  
    // Verify JWT
    try {
      verifyJWT(token, JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }
  
    // Withdraw funds
    const success = await walletController.withdrawFunds(amount, token);
    if (success) {
      res.json({ msg: 'Funds withdrawn successfully' });
    } else {
      res.status(400).json({ msg: 'Insufficient funds' });
    }
  });
  