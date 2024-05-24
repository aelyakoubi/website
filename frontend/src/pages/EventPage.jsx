import React, { useState, useEffect } from "react";
import { Box, Heading, Input, Flex, Button, Text, Image } from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { DeleteButton } from "../components/DeleteButton";

export const EventPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [editedEvent, setEditedEvent] = useState({});
  const [eventUser, setEventUser] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/events/${eventId}`)
      .then((response) => response.json())
      .then((data) => {
        setEvent(data);
        setEditedEvent(data);

        fetch(`http://localhost:3000/users/${data.createdBy}`)
          .then((response) => response.json())
          .then((userData) => {
            setEventUser(userData);
          })
          .catch((error) => console.log("Error fetching user data:", error));
      })
      .catch((error) => console.log("Error fetching event data:", error));
  }, [eventId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleUpdateEvent = () => {
    fetch(`http://localhost:3000/events/${eventId}`, {
      method: "PUT",
      headers: {
        'Authorization': token, // Include the token directly in the Authorization header
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedEvent),
    })
      .then((response) => response.json())
      .then((data) => {
        setEvent(data);
        setEditedEvent(data);
        alert("Event updated successfully!");
      })
      .catch((error) => {
        console.log("Error updating event:", error);
        alert("Failed to update event!");
      });
  };

  const handleDeleteEvent = () => {
    fetch(`http://localhost:3000/events/${eventId}`, {
      method: "DELETE",
      headers: {
        'Authorization': token, // Include the token directly in the Authorization header
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        console.log("Delete response status:", response.status); // Add log
        if (response.ok) {
          navigate("/");
          alert("Event deleted successfully!");
        } else {
          throw new Error("Failed to delete event");
        }
      })
      .catch((error) => {
        console.error("Error deleting event:", error);
        alert("Failed to delete event!");
      });
  };
  

  const onDeleteConfirm = () => {
    console.log("Delete button clicked"); // Add log
    handleDeleteEvent();
  };

  if (!event) {
    return <Box>Loading...</Box>;
  }

  return (
    <Flex direction="column" gap="1" maxW="350px" mx="auto" lineHeight="base" align={"center"}>
      <Box>
        <Heading as="h1" mb={4}>
          {event.title}
          {event.image && <Image src={event.image} alt={event.title} mb={4} maxH="300px" />}
        </Heading>
        {eventUser && (
          <Box>
            <img src={eventUser.image} alt={eventUser.name} />
            <Text>Created by: {eventUser.name}</Text>
          </Box>
        )}
        <Box>
          <form>
            <label>
              Description:
              <Input
                type="text"
                name="description"
                value={editedEvent.description || ""}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Start Time:
              <Input
                type="text"
                name="startTime"
                value={editedEvent.startTime || ""}
                onChange={handleInputChange}
              />
            </label>
            <label>
              End Time:
              <Input
                type="text"
                name="endTime"
                value={editedEvent.endTime || ""}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Category:
              <Input
                type="text"
                name="category"
                value={editedEvent.category || ""}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Created by:
              <Input
                type="text"
                name="createdBy"
                value={editedEvent.createdBy || ""}
                onChange={handleInputChange}
              />
            </label>
          </form>
        </Box>
        <Box
          mt={4}
          borderRadius="15px"
          border="3px solid"
          padding="0.6em 1.2em"
          fontSize="1em"
          fontWeight="extrabold"
          fontFamily="inherit"
          color={"black"}
          cursor="pointer"
          transition="border-color 0.25s, box-shadow 0.25s"
          _hover={{
            borderColor: "purple",
            boxShadow: "0 0 8px 2px rgba(128, 78, 254, 0.5)",
          }}
          _focus={{ outline: "4px auto -webkit-focus-ring-color" }}
        >
          <Button onClick={handleUpdateEvent} type="submit">
            Edit Event
          </Button>
          <DeleteButton onDelete={onDeleteConfirm} />
        </Box>
      </Box>
    </Flex>
  );
};
