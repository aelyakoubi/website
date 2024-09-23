// AuthUtils.js

// Login function remains unchanged
export const handleLogin = async (identifier, password, onClose) => {
  try {
    console.log("Logging in with identifier:", identifier); // 'identifier' can be either username or email
    console.log("Logging in with password:", password); 

    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier, password }), // Now login can use either username or email
    });

    console.log("Login response status:", response.status); 

    if (response.ok) {
      const { token } = await response.json(); // Assuming your server returns the token in the response

      if (token) {
        localStorage.setItem('token', token); // Store token in localStorage
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

// Sign-up function added
export const handleSignUp = async (email, username, password) => {
  try {
    console.log("Signing up with email:", email);
    console.log("Signing up with username:", username);
    
    const response = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, username, password }), // Send email, username, and password to backend
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Sign-up successful", data); // Display success message or redirect the user
    } else {
      throw new Error("Sign-up failed");
    }
  } catch (error) {
    console.error("Sign-up error:", error);
  }
};

// isAuthenticated remains unchanged
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};
