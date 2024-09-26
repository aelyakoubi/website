import createUser from './createUser.js'; // Adjust path as necessary
import sendWelcomeEmail from '../email/sendWelcomeEmail.js'; // Adjust path as necessary

const signUpUser = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const newUser = await createUser(email, username, password);
    await sendWelcomeEmail(newUser.email); // Send welcome email

    res.status(201).json(newUser);
  } catch (error) {
    // Handle errors (e.g., user already exists)
    res.status(400).json({ message: error.message });
  }
};

export default signUpUser;
