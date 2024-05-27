import { Input } from "@chakra-ui/react";
import React, { useState } from "react";

export const EventSearch = ({ events, setFilteredEvents }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    const filteredEvents = events.filter((event) => {
      const titleMatch = event.title.toLowerCase().includes(searchTerm);
      const categoryMatch = event.category.toLowerCase().includes(searchTerm);

      return titleMatch || categoryMatch;
    });

    setFilteredEvents(filteredEvents);
  };

  return (
    <Input
      type="text"
      placeholder="Search events"
      value={searchTerm}
      onChange={handleSearch}
      width={["30%", "30%"]}
      pl = {50}
      ml={0}

      mt={10}
      
    />
  );
};
