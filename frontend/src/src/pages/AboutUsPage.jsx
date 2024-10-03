// AboutUsPage.jsx
import React from 'react';
import { Box, Heading, Text, VStack, Avatar, HStack } from '@chakra-ui/react';

const AboutUsPage = () => {
  const teamMembers = [
    { name: 'Jane Doe', role: 'CEO', image: 'https://via.placeholder.com/150' },
    { name: 'John Smith', role: 'CTO', image: 'https://via.placeholder.com/150' },
    { name: 'Emily Johnson', role: 'Designer', image: 'https://via.placeholder.com/150' },
  ];

  return (
    <Box p={5}>
      <Heading mb={5}>About Us</Heading>
      <Text mb={5}>
        Welcome to our company! We are dedicated to providing the best services to our customers. Our team is passionate, skilled, and ready to help you achieve your goals.
      </Text>
      <Heading size="md" mb={3}>Meet Our Team</Heading>
      <VStack spacing={4}>
        {teamMembers.map((member, index) => (
          <HStack key={index} spacing={4}>
            <Avatar name={member.name} src={member.image} />
            <VStack align="start">
              <Text fontWeight="bold">{member.name}</Text>
              <Text color="gray.500">{member.role}</Text>
            </VStack>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};

export default AboutUsPage;
