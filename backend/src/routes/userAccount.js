import { Router } from "express";
import { body, validationResult } from "express-validator";
import User from "../routes/users.js";  // Assuming you have a User model
import Event from "../routes/events.js"; // Assuming you have an Event model
import auth from "../middleware/auth.js"; // Ensure user is authenticated

const router = Router();

// Get user account details including events
router.get('/useraccount', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // req.user.id is available from the auth middleware
    const events = await Event.find({ createdBy: req.user.id });
    
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    res.json({ name: user.name, email: user.email, events });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user account details (username and email)
router.put('/useraccount', [
  body('username').notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Invalid email format')
], auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email } = req.body;
  
  try {
    const user = await User.findByIdAndUpdate(req.user.id, { username, email }, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'Account updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete user account
router.delete('/useraccount', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Delete user's events first
    await Event.deleteMany({ createdBy: req.user.id });

    // Delete user account
    await user.remove();
    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete specific event created by the user
router.delete('/useraccount/events/:eventId', auth, async (req, res) => {
  try {
    const event = await Event.findOne({ _id: req.params.eventId, createdBy: req.user.id });
    if (!event) return res.status(404).json({ message: 'Event not found or you are not authorized' });

    await event.remove();
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
