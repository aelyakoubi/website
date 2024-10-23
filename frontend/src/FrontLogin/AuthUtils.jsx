// frontend/src/FrontLogin/AuthUtils.js

export const handleLogin = async (identifier, password, onClose, navigate) => {
  try {
    console.log("Logging in with identifier:", identifier);
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
        onClose(); // Close the modal on successful login
        navigate('/'); // Navigate to the homepage or another desired page
      } else {
        throw new Error("Invalid identifier or password");
      }
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Invalid identifier or password");
    }
  } catch (error) {
    console.error("Login failed:", error.message);
    alert(error.message); // Replace with better UI feedback mechanism in the future
  }
};

// handleSignUp function
export const handleSignUp = async (name, email, username, password, imageFile) => {
  try {
    // Create a FormData object to send both file and text data
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('username', username);
    formData.append('password', password);  // Ensure password is appended
    if (imageFile) {
      formData.append('image', imageFile);  // Append the image file if present
    }

    const response = await fetch(`${import.meta.env.VITE_API_URL}/users/signup`, {
      method: "POST",
      // Removed the 'Authorization' header because signup generally doesn't require auth
      body: formData,  // Send formData, not JSON
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Sign-up successful", data);
      return data.token;  // Return token or any other data if needed
    } else {
      const errorData = await response.json();
      console.error("Sign-up failed:", errorData);
      throw new Error(errorData.message || "Sign-up failed. Please try again.");
    }
  } catch (error) {
    console.error("Sign-up error:", error);
    throw error;  // Re-throw the error to be handled in the calling function
  }
};


// isAuthenticated function remains the same
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

// Function to fetch user data with Bearer token
export const fetchUserData = async () => {
  const token = localStorage.getItem('token'); // Retrieve the token

  const response = await fetch(`${import.meta.env.VITE_API_URL}/protected-route`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Correctly include the Bearer prefix
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch user data');
  }

  return await response.json();
};
