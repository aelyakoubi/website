import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, Text, Table, Thead, Tbody, Tr, Th, Td, Flex, Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

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
        const response = await fetch(`${import.meta.env.VITE_API_URL}/users`); // Update endpoint here
        if (!response.ok) throw new Error('Failed to fetch user data');
        const data = await response.json();
        setUserData(data);
        setUpdatedUser({
          username: data.username,
          email: data.email,
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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, { // Update endpoint here
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) throw new Error('Failed to update user details');
      setSuccessMessage('User details updated successfully.');
      setUserData({ ...userData, ...updatedUser });
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  // Handle deleting the account
  const handleDeleteAccount = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, { // Update endpoint here
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete account');
      setSuccessMessage('Account deleted. Redirecting to homepage...');
      setTimeout(() => {
        navigate('/'); // Redirect to homepage after deleting account
      }, 2000);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  // Handle deleting an event
  const handleDeleteEvent = async (eventId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/events/${eventId}`, { // Update endpoint here
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete event');
      setUserData({
        ...userData,
        events: userData.events.filter((event) => event.id !== eventId),
      });
      setSuccessMessage('Event deleted successfully.');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <Flex direction="column" align="center" p={2} flexGrow={1}>
      <Box maxW="400px" w="100%">
        <Heading as="h1" fontSize="1.8em" mb={2}>
          <Text fontSize="2xl" mb={5}>Account Details</Text> 
        </Heading>
        {errorMessage && <Text color="red.500">{errorMessage}</Text>}
        {successMessage && <Text color="green.500">{successMessage}</Text>}
      </Box>

      {/* User Account Details */}  
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
    </Flex>
  );
}

export default UserAccount;
