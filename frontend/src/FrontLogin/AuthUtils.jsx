// AuthUtils.js
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

export const handleLogin = async (username, password, onClose) => {
  try {
    console.log("Logging in with username:", username); // Check if username is passed correctly
    console.log("Logging in with password:", password); // Check if password is passed correctly

    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    console.log("Login response status:", response.status); // Check response status

    if (response.ok) {
      const { token } = await response.json(); // Assuming your server returns the token in the response

      if (token) {
        localStorage.setItem('token', token); // Store the token in localStorage
        console.log("Login successful, token stored."); // Log success
        onClose(); // Close the modal after successful login
      } else {
        console.error("No token received, invalid username or password."); // Log error
        throw new Error("Invalid username or password");
      }
    } else {
      console.error("Login failed with status:", response.status); // Log failed response status
      throw new Error("Invalid username or password");
    }
  } catch (error) {
    console.error("Login failed:", error); // Handle login failure, such as displaying error messages
  }
};

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  console.log("Checking authentication, token found:", !!token); // Log token existence
  return !!token; // Return true if a token exists, false otherwise
};

export const logoutUser = () => {
  localStorage.removeItem('token');
  console.log("User logged out, token removed."); // Log logout action
  window.location.href = '/'; // Redirect to login page after logout
};
