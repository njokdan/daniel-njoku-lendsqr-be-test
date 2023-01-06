import express from 'express';
import { check, validationResult } from 'express-validator';
import { signJWT } from '../utils/jwt.util';
import { pool } from '../utils/db.util';
import { JWT_SECRET, JWT_OPTIONS } from '../utils/constants';
import validateMiddleware from '../middlewares/validate.middleware';
import authController from '../controllers/auth.controller';
import { hash, compare } from 'bcrypt';

const router = express.Router();

const SALT_ROUNDS = 10;

// Validation middleware
const validate = (method) => {
  switch (method) {
    case 'register': {
      return [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Please enter a valid password').isLength({ min: 6 })
      ]
    }
    case 'login': {
      return [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Please enter a valid password').isLength({ min: 6 })
      ]
    }
  }
}
// validate('register')
// POST /api/auth/register
router.post('/register', validate('register'), async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Extract email and password from request body
  const { email, password } = req.body;

  // Check if user already exists
  let [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  if (rows.length > 0) {
    return res.status(400).json({ msg: 'User already exists' });
  }

  // Hash password
  const hashedPassword = await hash(password, SALT_ROUNDS);

  // Insert new user into database
  await pool.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);

  // Sign and return JWT
  const token = signJWT({ email }, JWT_SECRET, JWT_OPTIONS);
  res.json({ token });
});

// POST /api/auth/login
router.post('/login', validateMiddleware, async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Extract email and password from request body
  const { email, password } = req.body;

  // Check if user exists and password is correct
  let [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  if (rows.length === 0 || !(await compare(password, rows[0].password))) {
    return res.status(400).json({ msg: 'Invalid email or password' });
  }

    // Sign and return JWT
    const token = signJWT({ email }, JWT_SECRET, JWT_OPTIONS);
    res.json({ token });
  });
  
  export default router;

///////////////////////////////////////////////////////
// import express from 'express';
// import validateMiddleware from '../middlewares/validate.middleware';
// import AuthController from '../controllers/auth.controller';

// const router = express.Router();
// const authController = new AuthController();

// // POST /api/auth/register
// router.post(
//   '/register',
//   validateMiddleware,
//   async (req, res) => {
//     // Extract email and password from request body
//     const { email, password } = req.body;

//     // Create user
//     authController.
//     const user = await authController.register(email, password);
//     res.json({ user });
//   }
// );

// // POST /api/auth/login
// router.post(
//   '/login',
//   validateMiddleware,
//   async (req, res) => {
//     // Extract email and password from request body
//     const { email, password } = req.body;

//     // Authenticate user
//     const token = await authController.login(email, password);
//     res.json({ token });
//   }
// );

// export default router;

  