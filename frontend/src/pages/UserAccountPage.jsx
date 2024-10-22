import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, Text, Table, Thead, Tbody, Tr, Th, Td, Flex, Heading, useToast } from '@chakra-ui/react';
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

  const navigate = useNavigate();
  const toast = useToast(); // Initialize toast

  // Fetch user account data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/users/useraccount`);
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

    const token = localStorage.getItem('token');
    console.log('Token being used for update:', token);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/useraccount`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`, // Use Bearer token
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) throw new Error('Failed to update user details');
      toast({
        title: 'Success',
        description: 'User details updated successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setUserData({ ...userData, ...updatedUser });
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Handle deleting the account
  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account? All your events will be deleted permanently!");

    if (confirmDelete) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/users/useraccount`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Use Bearer token
          },
        });

        if (!response.ok) throw new Error('Failed to delete account');
        toast({
          title: 'Account Deleted',
          description: 'Your account has been deleted. A confirmation email has been sent.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        setTimeout(() => {
          navigate('/'); // Redirect to homepage after deleting account
        }, 2000);
      } catch (error) {
        toast({
          title: 'Error',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  // Handle deleting an event
  const handleDeleteEvent = async (eventId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/events/${eventId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Use Bearer token
        },
      });

      if (!response.ok) throw new Error('Failed to delete event');
      setUserData({
        ...userData,
        events: userData.events.filter((event) => event.id !== eventId),
      });
      toast({
        title: 'Event Deleted',
        description: 'Event deleted successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex direction="column" align="center" p={2} flexGrow={1}>
      <Box maxW="400px" w="100%">
        <Heading as="h1" fontSize="1.8em" mb={2}>
          <Text fontSize="2xl" mb={5}>Account Details</Text>
        </Heading>
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
          {Array.isArray(userData.events) && userData.events.length > 0 ? (
            userData.events.map((event) => (
              <Tr key={event.id}>
                <Td>{event.name}</Td>
                <Td>{event.date}</Td>
                <Td>
                  <Button colorScheme="red" onClick={() => handleDeleteEvent(event.id)}>
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan="3" textAlign="center">No events found.</Td>
            </Tr>
          )}
        </Tbody>
      </Table>

      {/* Delete Account Button */}
      <Button colorScheme="red" mt={10} onClick={handleDeleteAccount}>
        Delete Account
      </Button>
    </Flex>
  );
};

export default UserAccount;
