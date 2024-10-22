import React, { useState, useEffect } from "react";
import { Box, Heading, Input, Flex, Button, Text, Image, Select } from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { DeleteButton } from "../components/DeleteButton";
import LogoutButton from "../components/LogoutButton";

export const EventPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [editedEvent, setEditedEvent] = useState({});
  const [eventUser, setEventUser] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchEventData = async () => {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/events/${eventId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include Bearer token in the request
          },
        });
        const data = await response.json();
        setEvent(data);
        setEditedEvent(data);

        const userResponse = await fetch(`${import.meta.env.VITE_API_URL}/users/${data.createdBy}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include Bearer token in the request
          },
        });
        const userData = await userResponse.json();
        setEventUser(userData);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchEventData();
  }, [eventId]);

  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/categories`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include Bearer token in the request
          },
        });
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.log("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleUpdateEvent = () => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    fetch(`${import.meta.env.VITE_API_URL}/events/${eventId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include Bearer token in the request
      },
      body: JSON.stringify(editedEvent),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update event"); // Handle non-200 responses
        }
        return response.json();
      })
      .then((data) => {
        setEvent(data);
        setEditedEvent(data);
        alert("Event updated successfully!");

        // Navigate to the main events page or the updated event page
        navigate('/'); // Change this to the desired path after editing
      })
      .catch((error) => {
        console.log("Error updating event:", error);
        alert("Failed to update event!");
      });
  };

  const handleDeleteEvent = () => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    fetch(`${import.meta.env.VITE_API_URL}/events/${eventId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include Bearer token in the request
      },
    })
      .then((response) => {
        if (response.ok) {
          navigate("/");
          alert("Event deleted successfully!");
        } else {
          throw new Error("Failed to delete event!");
        }
      })
      .catch((error) => {
        console.error("Error deleting event:", error);
        alert("Failed to delete event!");
      });
  };

  if (!event) {
    return <Box>Loading...</Box>;
  }

  return (
    <Flex direction="column" align="center" p={2} flexGrow={1}>
      <Box maxW="400px" w="100%">
        <Heading as="h1" fontSize="1.8em" mb={2}>
          {event.title}
        </Heading>
        {event.image && (
          <Image
            src={event.image}
            alt={event.title}
            mb={2}
            maxH="200px"
            objectFit="cover"
          />
        )}

        <form>
          <label>
            Title:
            <Input
              type="text"
              name="title"
              fontWeight="bold"
              value={editedEvent.title || ""}
              onChange={handleInputChange}
              placeholder="Edit event title"
              size="sm"
              mb={1}
            />
          </label>

          <label>
            Image URL:
            <Input
              type="text"
              name="image"
              fontWeight="bold"
              value={editedEvent.image || ""}
              onChange={handleInputChange}
              placeholder="Paste image URL here"
              size="sm"
              mb={1}
            />
          </label>

          <label>
            Location:
            <Input
              type="text"
              name="location"
              fontWeight="bold"
              value={editedEvent.location || ""}
              onChange={handleInputChange}
              maxLength={30}
              placeholder="Edit event location"
              size="sm"
              mb={1}
            />
            <Text color={editedEvent.location.length > 30 ? "red.500" : "gray.500"} fontWeight="bold">
              {editedEvent.location.length}/30 characters
            </Text>
          </label>

          {eventUser && (
            <Box mb={2}>
              <img src={eventUser.image} alt={eventUser.name} style={{ maxHeight: '50px', borderRadius: '50%' }} fontWeight="bold" />
              <Text fontSize="sm">{eventUser.name}</Text>
            </Box>
          )}

          <label>
            Description:
            <Input
              type="text"
              name="description"
              fontWeight="bold"
              value={editedEvent.description || ""}
              onChange={handleInputChange}
              size="sm"
              mb={1}
            />
          </label>
          <label>
            Start Time:
            <Input
              type="text"
              name="startTime"
              fontWeight="bold"
              value={editedEvent.startTime || ""}
              onChange={handleInputChange}
              size="sm"
              mb={1}
            />
          </label>
          <label>
            End Time:
            <Input
              type="text"
              name="endTime"
              fontWeight="bold"
              value={editedEvent.endTime || ""}
              onChange={handleInputChange}
              size="sm"
              mb={1}
            />
          </label>
          <label>
            Category:
            <Select
              name="category"
              fontWeight="bold"
              value={editedEvent.category || ""}
              onChange={handleInputChange}
              size="sm"
              mb={2}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
          </label>
        </form>

        <Flex mt={2} justify="space-between">
          <Button size="sm" onClick={handleUpdateEvent}>Edit Event</Button>
          <DeleteButton onDelete={handleDeleteEvent} />
        </Flex>
      </Box>
      <LogoutButton />
    </Flex>
  );
};
