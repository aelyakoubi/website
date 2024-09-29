import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react';
import { handleSignUp } from '../FrontLogin/AuthUtils'; // Ensure the path to AuthUtils is correct

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: '', // Add name field
    username: '',
    email: '',
    password: '',
    imageFile: null, // Store the image file
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      imageFile: e.target.files[0], // Store selected image file
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, username,  password, imageFile } = formData;
    await handleSignUp(name, email, username,  password, imageFile); // Pass the name to sign-up handler
  };

  return (
    <> 
    <Box maxW="md" mx="auto" mt={10}>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </FormControl>
          <FormControl id="username" isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </FormControl>
          <FormControl id="image">
            <FormLabel>Upload Image</FormLabel>
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange} // Handle file change
            />
          </FormControl>
          <Button type="submit" colorScheme="blue" width="full">
            Sign Up
          </Button>
        </VStack>
      </form>
    </Box>
    </>
  );
};

export default SignUpPage;
