import { Router } from "express";
import { body, validationResult } from 'express-validator'; // Import express-validator
import createUser from "../services/users/createUser.js";
import sendWelcomeEmail from "../services/email/sendWelcomeEmail.js";
import upload from "../middleware/upload.js";

// Initialize router
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

// Signup route with validation and enhanced error handling
router.post('/signup', upload.single('image'), userValidationRules(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, username, password } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  console.log('Sign up attempt with:', { name, email, username, password });

  try {
    // Create user will throw an error if the email or username already exists
    const newUser = await createUser(name, email, username, password, image);
    
    // Send welcome email to user
    await sendWelcomeEmail(newUser.email, newUser.name); // Use name instead of username for the welcome email

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error during signup:', error.message);

    // Customize the response message based on the error
    if (error.message.includes('Email already exists')) {
      res.status(409).json({ message: 'This email is already registered. Please use a different email.' });
    } else if (error.message.includes('Username already exists')) {
      res.status(409).json({ message: 'This username is already taken. Please choose a different username.' });
    } else {
      res.status(400).json({ message: 'An error occurred during signup. Please try again.' });
    }
  }
});

export default router;
