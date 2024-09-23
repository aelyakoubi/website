// ContactPage.jsx
import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Textarea, Heading } from '@chakra-ui/react';

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact Form Submitted:', { name, email, message });
    // Here you would usually send the data to your backend
  };

  return (
    <Box p={5}>
      <Heading mb={5}>Contact Us</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl mb={4} isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
          />
        </FormControl>
        <FormControl mb={4} isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
          />
        </FormControl>
        <FormControl mb={4} isRequired>
          <FormLabel>Message</FormLabel>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your Message"
            size="md"
          />
        </FormControl>
        <Button type="submit" colorScheme="blue">Send Message</Button>
      </form>
    </Box>
  );
};

export default ContactPage;
