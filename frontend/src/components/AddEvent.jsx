import { Box, Heading, Input, Stack, Button, Flex } from "@chakra-ui/react";
import React from "react";

export const AddEvent = ({ setFilteredEvents, events }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const newEvent = {
      title: form.title.value,
      description: form.description.value,
      image: form.image.value,
      startTime: form.startTime.value,
      endTime: form.endTime.value,
      category: form.category.value,
      createdBy: form.createdBy.value,
    };

    // Get token from localStorage
    const token = localStorage.getItem('token');

    // Add event logic
    fetch("http://localhost:3000/events", {
      method: "POST",
      headers: {
        'Authorization': token, // Include the token directly in the Authorization header
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEvent),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add event");
        }
        return response.json();
      })
      .then((data) => {
        // Update events array with the new event
        setFilteredEvents([...events, data]);
        form.reset();
        alert("Event added successfully!");
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to add event!");
      });
  };

  return (
    <Flex>
      <Box
        bg={"white"}
        boxShadow="dark-lg"
        borderWidth="5px"
        p={4}
        ml={5}
        mt={70}
      >
        <Heading mb={2} ml={5}>
          Add Event
        </Heading>

        <form onSubmit={handleSubmit}>
          <Stack spacing={4} mt={50}>
            <Input name="title" placeholder="Title" />
            <Input name="description" placeholder="Description" />
            <Input name="image" placeholder="Image URL" />
            <Input type="datetime-local" name="startTime" />
            <Input type="datetime-local" name="endTime" />
            <Input name="category" placeholder="Category" />
            <Input name="createdBy" placeholder="Created By" />
            <Button
              type="submit"
              borderRadius="15px"
              border="3px solid"
              padding="0.6em 1.2em"
              fontSize="1em"
              fontWeight="500"
              fontFamily="inherit"
              backgroundColor="grey.500"
              cursor="pointer"
              transition="border-color 0.25s"
              _hover={{ borderColor: "purple" }}
              _focus={{ outline: "4px auto -webkit-focus-ring-color" }}
            >
              Click to Add an Event
            </Button>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
};
