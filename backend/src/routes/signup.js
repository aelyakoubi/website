import { Router } from "express";
import { body, validationResult } from 'express-validator'; // Import express-validator
import createUser from "../services/users/createUser.js";
import sendWelcomeEmail from "../services/email/sendWelcomeEmail.js";
import getUserById from "../services/users/getUserById.js";
import updateUserById from "../services/users/updateUserById.js";
import auth from "../middleware/auth.js"; // Ensure you have auth middleware for user updates

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
router.post('/signup', userValidationRules(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, username, password } = req.body;

  console.log('Sign up attempt with:', { name, email, username, password });

  try {
    // Create user will throw an error if the email or username already exists
    const newUser = await createUser(name, email, username, password);
    
    // Send welcome email to user
    await sendWelcomeEmail(newUser.email, newUser.name); // Use name instead of username for the welcome email

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error during signup:', error.message);

    // Customize the response message based on the error
    if (error.message.includes('Email already exists')) {
      return res.status(409).json({ message: 'This email is already registered. Please use a different email.' });
    } else if (error.message.includes('Username already exists')) {
      return res.status(409).json({ message: 'This username is already taken. Please choose a different username.' });
    } else {
      return res.status(400).json({ message: 'An error occurred during signup. Please try again.' });
    }
  }
});

// Update user by ID with validation
router.put('/:id', auth, userValidationRules(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { name, email, username, password } = req.body;

  try {
    const updatedUser = await updateUserById(id, { name, email, username, password });

    if (updatedUser) {
      return res.status(200).json({
        message: `User with id ${id} successfully updated`,
        updatedUser,
      });
    } else {
      return res.status(404).json({ message: `User with id ${id} not found` });
    }
  } catch (error) {
    console.error('Error during user update:', error.message);
    return res.status(400).json({ message: 'An error occurred during update. Please try again.' });
  }
});

export default router;
