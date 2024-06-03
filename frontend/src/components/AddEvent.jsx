import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Input,
  Stack,
  Button,
  Flex,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import backgroundImage from "../components/backgroundImage.jpg"; // Adjust the import path if necessary

export const AddEvent = ({ setFilteredEvents, events }) => {
  const [categories, setCategories] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:3000/categories");
      const data = await response.json();
      console.log("Fetched categories data:", data);
      setCategories(data.categories || data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const selectedCategoryId = form.category.value; // Retrieve the selected category ID

     // Define startTime and endTime constants with the correct format
  const startTime = form.startTime.value + ":00";
  const endTime = form.endTime.value + ":00";
  
  const newEvent = {
    title: form.title.value,
    description: form.description.value,
    image: form.image.value,
    startTime: new Date(startTime).toISOString(), // Convert to ISO-8601 DateTime
    endTime: new Date(endTime).toISOString(), // Convert to ISO-8601 DateTime
    location: form.location.value, // Included
    category: form.category.value,
    categoryIds: [selectedCategoryId],
    createdBy: form.createdBy.value,
  };
  
    const token = localStorage.getItem("token");
  
    try {
      const response = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      });
  
      if (response.ok) {
        // Event created successfully, update state or any actions
        const data = await response.json();
        setFilteredEvents([...events, data]);
        form.reset();
        alert("Event added successfully!");
      } else {
        // Handle error response
        const errorData = await response.json();
        console.error("Failed to create event:", errorData);
        alert(`Failed to create event: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to add event!");
    }
  };
  

  return (
    <>
      <Button
        onClick={onOpen}
        bgSize="cover"
        bgImage={`url(${backgroundImage})`}
        bgPosition="center"
        borderRadius="15px"
        border="3px solid"
        padding="0.6em 1.2em"
        fontSize="1.0em"
        color={"black"}
        mt={5}
        w="150px"
        h="100px"
        fontWeight="650"
        fontFamily="inherit"
        cursor="pointer"
        transition="border-color 0.25s, box-shadow 0.50s"
        _hover={{
          borderColor: "purple",
          boxShadow: "0 0 8px 2px rgba(128, 78, 254, 0.8)",
        }}
        _focus={{ outline: "4px auto -webkit-focus-ring-color" }}
      >
        Click to Add Event
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>                                         
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
                    <Input name="location" placeholder="Location" /> {/* Include location field */}
                    <Select name="category" placeholder="Select Category" required>
                      {categories.map((category) => (
                        <option key={category.id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </Select>
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
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close Modal</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddEvent;
