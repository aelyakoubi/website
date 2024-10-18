import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, Text, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserAccount = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    username: '',
    events: [],
  });

  const [updatedUser, setUpdatedUser] = useState({
    username: '',
    email: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Fetch user account data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/useraccount');
        setUserData(response.data);
        setUpdatedUser({
          username: response.data.username,
          email: response.data.email,
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  // Handle input changes for updating username or email
  const handleInputChange = (e) => {
    setUpdatedUser({
      ...updatedUser,
      [e.target.name]: e.target.value,
    });
  };

  // Update user info (username and email)
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await axios.put('/api/useraccount', updatedUser);
      setSuccessMessage('User details updated successfully.');
      setUserData({ ...userData, ...updatedUser });
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Failed to update user details.');
    }
  };

  // Handle deleting the account
  const handleDeleteAccount = async () => {
    try {
      await axios.delete('/api/useraccount');
      setSuccessMessage('Account deleted. Redirecting to homepage...');
      setTimeout(() => {
        navigate('/'); // Redirect to homepage after deleting account
      }, 2000);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Failed to delete account.');
    }
  };

  // Handle deleting an event
  const handleDeleteEvent = async (eventId) => {
    try {
      await axios.delete(`/api/useraccount/events/${eventId}`);
      setUserData({
        ...userData,
        events: userData.events.filter((event) => event.id !== eventId),
      });
      setSuccessMessage('Event deleted successfully.');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Failed to delete event.');
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10}>
      {errorMessage && <Text color="red.500">{errorMessage}</Text>}
      {successMessage && <Text color="green.500">{successMessage}</Text>}

      {/* User Account Details */}
      <Text fontSize="2xl" mb={5}>Account Details</Text>
      <VStack spacing={4}>
        <FormControl id="username">
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            name="username"
            value={updatedUser.username}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            value={updatedUser.email}
            onChange={handleInputChange}
          />
        </FormControl>
        <Button colorScheme="blue" onClick={handleUpdateUser}>Update Account</Button>
      </VStack>

      {/* Events Table */}
      <Text fontSize="2xl" mt={10} mb={5}>Your Events</Text>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Event Name</Th>
            <Th>Date</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {userData.events.map((event) => (
            <Tr key={event.id}>
              <Td>{event.name}</Td>
              <Td>{event.date}</Td>
              <Td>
                <Button colorScheme="red" onClick={() => handleDeleteEvent(event.id)}>
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Delete Account Button */}
      <Button colorScheme="red" mt={10} onClick={handleDeleteAccount}>
        Delete Account
      </Button>
    </Box>
  );
};

export default UserAccount;
