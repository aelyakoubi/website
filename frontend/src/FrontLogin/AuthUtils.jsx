// AuthUtils.js

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
        onClose(); // Close the modal after successful login
      } else {
        throw new Error("Invalid username or password");
      }
    } else {
      throw new Error("Invalid username or password");
    }
  } catch (error) {
    console.error("Login failed:", error);
    // Handle login failure, such as displaying error messages
  }
};

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token; // Return true if a token exists, false otherwise
};

