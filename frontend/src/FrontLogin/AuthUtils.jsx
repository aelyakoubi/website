// frontend/src/FrontLogin/AuthUtils.js

import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();


// Login function modified to accept either email or username as 'identifier'
export const handleLogin = async (identifier, password, onClose) => {
  try {
    console.log("Logging in with identifier:", identifier); // identifier can be either email or username
    console.log("Logging in with password:", password);

    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier, password }), // Passing either email or username as identifier
    });

    if (response.ok) {
      const { token } = await response.json(); // Assuming your server returns the token in the response

      if (token) {
        localStorage.setItem('token', token); // Store token in localStorage
        onClose(); // Close the modal after successful login
      } else {
        throw new Error("Invalid identifier or password");
      }
    } else {
      throw new Error("Invalid identifier or password");
    }
  } catch (error) {
    console.error("Login failed:", error);
    // Handle login failure, such as displaying error messages
  }
};

// Sign-up function now includes name, email, username, and password
// Sign-up function now includes name, email, username, and password
export const handleSignUp = async (name, email, username, password, imageFile, navigate) => {
  try {
    console.log("Signing up with name:", name);
    console.log("Signing up with email:", email);
    console.log("Signing up with username:", username);

    const formData = new FormData();
    formData.append('name', name); // Include the name field
    formData.append('email', email);
    formData.append('username', username);
    formData.append('password', password);
    if (imageFile) {
      formData.append('image', imageFile); // Attach the image file to the form data
    }

    const response = await fetch("http://localhost:3000/users/signup", {
      method: "POST",
      body: formData, // Use FormData for file uploads
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Sign-up successful", data);
      // Redirect to the homepage after successful signup
      navigate('/'); // Change this path if your homepage route is different
    } else {
      const errorData = await response.json(); // Get error message from response
      console.error("Sign-up failed:", errorData.errors || errorData);
    }
  } catch (error) {
    console.error("Sign-up error:", error);
  }
};


// isAuthenticated function remains the same
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};
