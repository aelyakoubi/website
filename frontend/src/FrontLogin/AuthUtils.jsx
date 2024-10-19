// frontend/src/FrontLogin/AuthUtils.js

// Login function modified to accept either email or username as 'identifier'
export const handleLogin = async (identifier, password, onClose, navigate) => {
  try {
    console.log("Logging in with identifier:", identifier);
    console.log("Logging in with password:", password);

    const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier, password }),
    });

    if (response.ok) {
      const { token } = await response.json();

      if (token) {
        localStorage.setItem('token', token);
        onClose(); // Close the modal after successful login
        navigate('/'); // Navigate to the desired route after login
      } else {
        throw new Error("Invalid identifier or password"); // This line may not be reached if response.ok is true
      }
    } else {
      const errorData = await response.json(); // Get the error response body
      throw new Error(errorData.message || "Invalid identifier or password"); // Provide a clearer error message
    }
  } catch (error) {
    console.error("Login failed:", error.message);
    // Handle login failure by displaying error messages
    alert(error.message); // Consider replacing this with a better UI feedback mechanism
  }
};

// Sign-up function remains unchanged
export const handleSignUp = async (name, email, username, password, imageFile, navigate) => {
  try {
    console.log("Signing up with name:", name);
    console.log("Signing up with email:", email);
    console.log("Signing up with username:", username);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('username', username);
    formData.append('password', password);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    const response = await fetch(`${import.meta.env.VITE_API_URL}/users/signup`, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Sign-up successful", data);
      navigate('/'); // Redirect after successful signup
    } else {
      const errorData = await response.json();
      console.error("Sign-up failed:", errorData.errors || errorData);
      alert(errorData.errors || "Sign-up failed. Please try again."); // Provide feedback for sign-up errors
    }
  } catch (error) {
    console.error("Sign-up error:", error);
    alert("An error occurred during sign-up. Please try again."); // Provide generic feedback for network errors
  }
};

// isAuthenticated function remains the same
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};
