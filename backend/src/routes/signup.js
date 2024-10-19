import { Router } from "express";
import { body, validationResult } from 'express-validator';
import createUser from "../services/users/createUser.js";
import sendWelcomeEmail from "../services/email/sendWelcomeEmail.js";

const router = Router();

// Validation rules
const userValidationRules = () => {
  return [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('username').notEmpty().withMessage('Username is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  ];
};

// Signup route
router.post('/', userValidationRules(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, username, password } = req.body;

  try {
    const newUser = await createUser(name, email, username, password);
    await sendWelcomeEmail(newUser.email, newUser.name);

    res.status(201).json(newUser);
  } catch (error) {
    if (error.message.includes('Email already exists')) {
      return res.status(409).json({ message: 'This email is already registered.' });
    } else if (error.message.includes('Username already exists')) {
      return res.status(409).json({ message: 'This username is already taken.' });
    } else {
      return res.status(400).json({ message: 'An error occurred during signup.' });
    }
  }
});

export default router;
